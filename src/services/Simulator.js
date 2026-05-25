/**
 * Advanced Predictive Load Balancer Engine.
 * Engineered with dynamic Priority Scheduling based on accumulated wait times
 * to aggressively compress tail latency variance among agents.
 */
export class Simulator {
    constructor(machines, members, options = { duration: 60 }) {
        this.machines = machines;
        this.members = members;
        this.duration = options.duration;
    }

    run() {
        console.log(`[ENGINE] Running equity-driven predictive simulation for ${this.duration} cycles.`);
        for (let currentTick = 1; currentTick <= this.duration; currentTick++) {
            this._executeTick(currentTick);
        }
        console.log(`[ENGINE] Simulation execution finalized.`);
    }

    _executeTick(tick) {
        for (const member of this.members) {
            if (member.status === "NotArrived" && tick >= member.arrivalTick) {
                member.status = "Awaiting";
            }
        }

        this._updateActiveAgents();
        this._arbitrateResourceAllocation();
    }

    _updateActiveAgents() {
        for (const member of this.members) {
            if (member.status === "Training") {
                member.remainingTime--;
                member.incrementTrainingTime();

                if (member.remainingTime === 0) {
                    const machine = this.machines.find(m => m.occupiedBy === member.name);
                    if (machine) {
                        machine.release();
                        
                        const nextMember = machine.nextInQueue();
                        if (nextMember) {
                            machine.occupy(nextMember.name);
                            nextMember.status = "Training";
                            nextMember.remainingTime = nextMember.currentExercise.defaultDuration;
                        }
                    }

                    member.completeExercise(member.currentExercise);
                    member.currentExercise = null;
                    member.status = member.hasFinishedWorkout() ? "Completed" : "Awaiting";
                }
            } else if (member.status === "Queued") {
                member.incrementWaitTime();
            }
        }
    }

    _arbitrateResourceAllocation() {
        // EQUITY-BASED PRIORITY LAYER: Sort agents by accumulated wait time descending.
        // Agents suffering from high congestion get to claim resources first.
        // If wait times are identical, apply a stochastic tie-breaker to maintain system entropy.
        const prioritizedAgents = [...this.members].sort((a, b) => {
            if (b.waitTime !== a.waitTime) {
                return b.waitTime - a.waitTime; 
            }
            return Math.random() - 0.5; // Fair random tie-breaker
        });

        for (const member of prioritizedAgents) {
            if (member.status !== "Awaiting") continue;

            if (member.hasFinishedWorkout()) {
                member.status = "Completed";
                continue;
            }

            const candidates = [];

            // Pass 1: Gather all valid physical targets across remaining card routine
            for (const exercise of member.activeExercises) {
                for (const machineId of exercise.targetMachineIds) {
                    const machine = this.machines.find(m => m.id === machineId);
                    
                    if (!machine || machine.id === member.lastMachineId) continue;

                    if (!machine.isOccupied()) {
                        candidates.push({ exercise, machine, type: 'TRAIN', score: 0 });
                    } else if (machine.remainingTime <= 5 && machine.isQueueEmpty()) {
                        candidates.push({ exercise, machine, type: 'QUEUE', score: machine.remainingTime });
                    }
                }
            }

            // Congestion Fallback Phase
            if (candidates.length === 0) {
                member.incrementWaitTime();
                member.lastMachineId = null; 
                continue;
            }

            // Order candidates by lowest congestion footprint
            candidates.sort((a, b) => a.score - b.score);
            const bestCandidate = candidates[0];

            if (member.currentFloor !== bestCandidate.machine.floor) {
                member.currentFloor = bestCandidate.machine.floor;
            }

            if (bestCandidate.type === 'TRAIN') {
                bestCandidate.machine.occupy(member.name);
                member.status = "Training";
                member.remainingTime = bestCandidate.exercise.defaultDuration;
            } else {
                bestCandidate.machine.addToQueue(member);
                member.status = "Queued";
            }

            member.currentExercise = bestCandidate.exercise;
            member.lastMachineId = bestCandidate.machine.id;
        }
    }
}