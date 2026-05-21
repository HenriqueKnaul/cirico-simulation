/**
 * High-Efficiency Stream Orchestrator.
 * Features time-gated agent activation and accurate performance telemetry tracking.
 */
export class Simulator {
    constructor(machines, members, options = { duration: 60 }) {
        this.machines = machines;
        this.members = members;
        this.duration = options.duration;
    }

    run() {
        console.log(`[ENGINE] Running staggered multi-split simulation for ${this.duration} cycles.`);
        for (let currentTick = 1; currentTick <= this.duration; currentTick++) {
            this._executeTick(currentTick);
        }
        console.log(`[ENGINE] Simulation lifecycle finalized.`);
    }

    _executeTick(tick) {
        // Gatekeeper Phase: Admit pending agents into the active simulation pool
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
                member.incrementTrainingTime(); // Telemetry tracking

                if (member.remainingTime === 0) {
                    const machine = this.machines.find(m => m.occupiedBy === member.name);
                    if (machine) machine.release();

                    member.completeExercise(member.currentExercise);
                    member.currentExercise = null;
                    member.status = member.hasFinishedWorkout() ? "Completed" : "Awaiting";
                }
            }
        }
    }

    _arbitrateResourceAllocation() {
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

            let selectedExercise = null;
            let targetMachine = null;

            for (const exercise of member.activeExercises) {
                const machine = this.machines.find(m => m.name === exercise.targetMachineName);
                if (machine && !machine.isOccupied()) {
                    selectedExercise = exercise;
                    targetMachine = machine;
                    break; 
                }
            }

            if (!selectedExercise) {
                member.incrementWaitTime();
                continue; 
            }

            if (member.currentFloor !== targetMachine.floor) {
                member.currentFloor = targetMachine.floor;
            }

            targetMachine.occupy(member.name);
            member.status = "Training";
            member.remainingTime = selectedExercise.defaultDuration;
            member.currentExercise = selectedExercise; 
        }
    }
}