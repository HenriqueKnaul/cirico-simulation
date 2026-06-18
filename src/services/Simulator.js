import { MemberStatus } from '../models/Member.js';

export class Simulator {
    constructor(machines, members, options = { duration: 60 }) {
        this.machines = machines;
        this.members = members;
        this.duration = options.duration;
        this.machinesMap = new Map(machines.map(m => [m.id, m]));
        this.timelineData = [];
    }

    run() {
        for (let currentTick = 1; currentTick <= this.duration; currentTick++) {
            this._executeTick(currentTick);
        }
        return this._buildReport();
    }

    _executeTick(tick) {
        for (const member of this.members) {
            if (member.status === MemberStatus.NOT_ARRIVED && tick >= member.arrivalTick) {
                member.status = MemberStatus.AWAITING;
                member.consecutiveBlockedTicks = 0;
                member.gaveUp = false;
            }
        }

        this._updateActiveAgents();
        this._handlePatienceTimeout();
        this._arbitrateResourceAllocation();

        for (const machine of this.machines) {
            machine.recordTickUsage();
        }

        let training = 0;
        let queued = 0;
        for (const m of this.members) {
            if (m.status === MemberStatus.TRAINING) training++;
            if (m.status === MemberStatus.QUEUED || m.status === MemberStatus.AWAITING) queued++;
        }
        this.timelineData.push({ tick, training, queued });
    }

    _updateActiveAgents() {
        for (const member of this.members) {
            if (member.status === MemberStatus.TRAINING) {
                member.tickTraining();

                if (member.remainingTime === 0) {
                    const machine = this.machinesMap.get(member.currentMachineId);
                    if (machine) {
                        machine.releaseUser(member.name);
                        
                        const nextMember = machine.nextInQueue();
                        if (nextMember) {
                            machine.occupy(nextMember.name);
                            nextMember.startTraining(nextMember.currentExercise, machine.id);
                        }
                    }
                    member.finishExercise();
                }
            } else if (member.status === MemberStatus.QUEUED) {
                member.tickWaiting();
            }
        }
    }

    _arbitrateResourceAllocation() {
        const prioritizedAgents = [...this.members].sort((a, b) => {
            if (b.waitTime !== a.waitTime) return b.waitTime - a.waitTime; 
            return a.id - b.id;
        });

        for (const member of prioritizedAgents) {
            if (member.status !== MemberStatus.AWAITING) continue;

            if (member.hasFinishedWorkout()) {
                member.status = MemberStatus.COMPLETED;
                continue;
            }

            const candidates = [];

            for (const exercise of member.activeExercises) {
                for (const machineId of exercise.targetMachineIds) {
                    const machine = this.machinesMap.get(machineId);
                    
                    if (!machine || machine.id === member.lastMachineId) continue;

                    if (!machine.isFull()) {
                        candidates.push({ exercise, machine, type: 'TRAIN', score: 0 });
                    } else if (machine.hasQueueCapacity()) {
                        let remaining = 0;
                        for (const m of this.members) {
                            if (m.status === MemberStatus.TRAINING && m.currentMachineId === machine.id) {
                                remaining = m.remainingTime;
                                break;
                            }
                        }
                        candidates.push({ exercise, machine, type: 'QUEUE', score: remaining });
                    }
                }
            }

            if (candidates.length === 0) {
                member.tickWaiting();
                member.lastMachineId = null; 
                continue;
            }

            candidates.sort((a, b) => a.score - b.score);
            const bestCandidate = candidates[0];

            if (member.currentFloor !== bestCandidate.machine.floor) {
                member.currentFloor = bestCandidate.machine.floor;
            }

            if (bestCandidate.type === 'TRAIN') {
                bestCandidate.machine.occupy(member.name);
                member.startTraining(bestCandidate.exercise, bestCandidate.machine.id);
            } else {
                bestCandidate.machine.addToQueue(member);
                member.joinQueue(bestCandidate.exercise, bestCandidate.machine.id);
            }
        }
    }

    _handlePatienceTimeout() {
        for (const member of this.members) {
            if (member.status === MemberStatus.QUEUED || member.status === MemberStatus.AWAITING) {
                member.consecutiveBlockedTicks = (member.consecutiveBlockedTicks || 0) + 1;
                
                if (member.consecutiveBlockedTicks >= 30) {
                    if (member.status === MemberStatus.QUEUED && member.currentMachineId) {
                        const machine = this.machinesMap.get(member.currentMachineId);
                        if (machine) {
                            machine.queue = machine.queue.filter(m => m.id !== member.id);
                        }
                    }
                    member.status = MemberStatus.COMPLETED;
                    member.gaveUp = true;
                    member.currentExercise = null;
                    member.currentMachineId = null;
                }
            } else if (member.status === MemberStatus.TRAINING) {
                member.consecutiveBlockedTicks = 0;
            }
        }
    }

    _buildReport() {
        const completedMembers = this.members.filter(m => m.hasFinishedWorkout() && !m.gaveUp).length;
        const abandonedCount = this.members.filter(m => m.gaveUp).length;
        const productivityIndex = this.members.length > 0 ? Math.round((completedMembers / this.members.length) * 100) : 0;
        
        let totalWaitTime = 0;
        for (const m of this.members) {
            totalWaitTime += m.waitTime;
        }
        const averageWaitTime = this.members.length > 0 ? Math.round(totalWaitTime / this.members.length) : 0;

        let totalPotentialUsage = this.duration * this.machines.filter(m => !m.isUnlimited).length;
        let totalActualUsage = 0;
        const machineOccupancy = {};

        for (const machine of this.machines) {
            const rate = this.duration > 0 ? Math.round((machine.totalUsageTime / this.duration) * 100) : 0;
            machineOccupancy[machine.name] = Math.min(100, rate);
            if (!machine.isUnlimited) {
                totalActualUsage += Math.min(this.duration, machine.totalUsageTime);
            }
        }

        const overallOccupancy = totalPotentialUsage > 0 ? Math.round((totalActualUsage / totalPotentialUsage) * 100) : 0;

        return {
            averageWaitTime,
            productivityIndex,
            overallOccupancy: Math.min(100, overallOccupancy),
            abandonedCount,
            machineOccupancy,
            timeline: this.timelineData
        };
    }
}