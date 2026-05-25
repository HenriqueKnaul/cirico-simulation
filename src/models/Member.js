export class Member {
    constructor(id, name, workoutCardId, arrivalTick, initialFloor = "LowerFloor") {
        this.id = id;
        this.name = name;
        this.workoutCardId = workoutCardId;
        this.arrivalTick = arrivalTick;
        this.activeExercises = [];
        this.status = "NotArrived"; 
        this.remainingTime = 0;
        this.waitTime = 0;
        this.currentFloor = initialFloor;
        this.currentExercise = null;
        this.totalTrainingTime = 0;
        this.lastMachineId = null;
        
        // Timeline tracking allocation bucket
        this.timeline = []; 
    }

    loadSessionWorkout(workoutCard, splitLetter) {
        const routine = workoutCard.getRoutineBySplit(splitLetter);
        this.activeExercises = routine.map(exercise => {
            const realisticDuration = Math.floor(Math.random() * 8) + 8;
            return {
                ...exercise,
                defaultDuration: realisticDuration
            };
        });
    }

    /**
     * Captures a discrete historical state snapshot for visual rendering.
     */
    logTickSnapshot(tick) {
        let currentActivity = "Idle";
        if (this.status === "Training" && this.currentExercise) {
            currentActivity = `Exercising: ${this.currentExercise.name} (${this.remainingTime} min left)`;
        } else if (this.status === "Queued" && this.currentExercise) {
            currentActivity = `Stuck in predictive queue for: ${this.currentExercise.name}`;
        } else if (this.status === "Awaiting") {
            currentActivity = "Scanning gym floor for available machines";
        } else if (this.status === "NotArrived") {
            currentActivity = `At home (Arriving at minute ${this.arrivalTick})`;
        } else if (this.status === "Completed") {
            currentActivity = "Session finished. Showering and leaving";
        }

        this.timeline.push({
            tick,
            status: this.status,
            floor: this.currentFloor,
            activity: currentActivity
        });
    }

    completeExercise(exercise) {
        this.activeExercises = this.activeExercises.filter(e => e !== exercise);
    }

    incrementWaitTime() { this.waitTime++; }
    incrementTrainingTime() { this.totalTrainingTime++; }
    hasFinishedWorkout() { return this.activeExercises.length === 0 && this.status !== "Training"; }
}