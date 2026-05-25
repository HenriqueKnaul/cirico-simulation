/**
 * High-Performance Predictive Orchestrator.
 * Executes dual-pass resource scanning to handle multi-target ID routing,
 * temporal queue windows (remaining time <= 5), and instant floor teleportation.
 */
export class Simulator {
    constructor(machines, members, options = { duration: 60 }) {
        this.machines = machines;
        this.members = members;
        this.duration = options.duration;
    }

    run() {
        console.log(`[ENGINE] Running predictive-queue architecture for ${this.duration} cycles.`);
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

        // TELEMETRY SNAPSHOT PHASE: Instruct all agents to commit their state to history
        for (const member of this.members) {
            member.logTickSnapshot(tick);
        }
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
                        
                        // Queue Promotion: Instantly transfer machine lock to the waiting agent
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
                member.incrementWaitTime(); // Accumulate wait time KPIs while locked in the predictive queue
            }
        }
    }

    _arbitrateResourceAllocation() {
        // Starvation Guard: Randomize processing priority array
        const randomizedAgents = [...this.members];
        for (let i = randomizedAgents.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedAgents[i], randomizedAgents[j]] = [randomizedAgents[j], randomizedAgents[i]];
        }

        for (const member of randomizedAgents) {
            if (member.status !== "Awaiting") continue;

            if (member.hasFinishedWorkout()) {
                member.status = "Completed";
                continue;
            }

            let allocated = false;

            // --- PASS 1: IMMEDIATE OPPORTUNISTIC ALLOCATION ---
            // Scan for any physical machine from the exercise array that is 100% idle
            for (const exercise of member.activeExercises) {
                for (const machineId of exercise.targetMachineIds) {
                    const machine = this.machines.find(m => m.id === machineId);
                    
                    // Rule Check: Must be idle AND not the exact consecutive resource used last tick
                    if (machine && !machine.isOccupied() && machine.id !== member.lastMachineId) {
                        if (member.currentFloor !== machine.floor) {
                            member.currentFloor = machine.floor; // Instant teleportation
                        }
                        machine.occupy(member.name);
                        member.status = "Training";
                        member.remainingTime = exercise.defaultDuration;
                        member.currentExercise = exercise;
                        member.lastMachineId = machine.id; // Set anti-consecutive lock
                        allocated = true;
                        break;
                    }
                }
                if (allocated) break;
            }

            if (allocated) continue;

            // --- PASS 2: PREDICTIVE QUEUE ROUTING ---
            // Triggered only if Pass 1 fails. Scans for a machine ending its block soon.
            for (const exercise of member.activeExercises) {
                for (const machineId of exercise.targetMachineIds) {
                    const machine = this.machines.find(m => m.id === machineId);

                    // Strict Criteria: Machine is occupied, current user has <= 5 mins left, queue slot is empty, and not the last used machine
                    if (machine && machine.isOccupied() && machine.remainingTime <= 5 && machine.isQueueEmpty() && machine.id !== member.lastMachineId) {
                        if (member.currentFloor !== machine.floor) {
                            member.currentFloor = machine.floor;
                        }
                        machine.addToQueue(member);
                        member.status = "Queued";
                        member.currentExercise = exercise;
                        member.lastMachineId = machine.id;
                        allocated = true;
                        break;
                    }
                }
                if (allocated) break;
            }

            // --- FALLBACK PHASE ---
            // Absolutely no physical options or eligible queues found. Agent waits out this cycle.
            if (!allocated) {
                member.incrementWaitTime();
                
                // Tech Note: If the agent is forced to wait out a minute entirely, we clear their 
                // consecutive machine lock flag. This elegantly handles single-machine deadlocks 
                // since they have already technically broken their streak by waiting.
                member.lastMachineId = null;
            }
        }
    }
}