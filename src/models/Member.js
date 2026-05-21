/**
 * Refactored Autonomous Agent with Stochastic Arrival support.
 * Manages its own timeline constraints and lifecycle entry flags.
 */
export class Member {
    constructor(id, name, workoutCardId, arrivalTick, initialFloor = "LowerFloor") {
        this.id = id;
        this.name = name;
        this.workoutCardId = workoutCardId;
        this.arrivalTick = arrivalTick; // The exact simulation minute this agent enters the gym
        
        this.activeExercises = []; 
        this.status = "NotArrived"; // Lifecycle State Machine: "NotArrived" | "Awaiting" | "Training" | "Completed"
        this.remainingTime = 0;
        this.waitTime = 0;
        this.currentFloor = initialFloor;
        this.currentExercise = null; 
        
        // Analytical KPIs to evaluate execution efficiency at teardown
        this.totalTrainingTime = 0;
    }

    /**
     * Injects the routine splits and dynamically overrides exercise durations 
     * to match the new 8-15 minute standard block requirement.
     */
    loadSessionWorkout(workoutCard, splitLetter) {
        const routine = workoutCard.getRoutineBySplit(splitLetter);
        
        // Deep clone and duration override engineering phase
        this.activeExercises = routine.map(exercise => {
            // Generates a randomized integer bounded strictly between 8 and 15 minutes
            const realisticDuration = Math.floor(Math.random() * 8) + 8;
            return {
                ...exercise,
                defaultDuration: realisticDuration
            };
        });
    }

    completeExercise(exercise) {
        this.activeExercises = this.activeExercises.filter(e => e !== exercise);
    }

    incrementWaitTime() {
        this.waitTime++;
    }

    incrementTrainingTime() {
        this.totalTrainingTime++;
    }

    hasFinishedWorkout() {
        return this.activeExercises.length === 0 && this.status !== "Training";
    }
}