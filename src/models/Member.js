/**
 * Represents the autonomous agent inside the simulation environment.
 * Maintains its own state machine, metrics, and routine execution.
 */
export class Member {
    constructor(id, name, workoutRoutine, initialFloor = "LowerFloor") {
        this.id = id;
        this.name = name;
        
        // CRITICAL: We clone the array via spread operator to break reference sharing.
        // Prevents multi-agent mutation bugs if routines are generated from master configs.
        this.workoutRoutine = [...workoutRoutine]; 
        
        this.status = "Awaiting"; // State Machine: "Awaiting" | "Training" | "Moving" | "Completed"
        this.remainingTime = 0;   // Countdown timer for resource consumption
        this.waitTime = 0;        // KPI: Accumulated friction/idle time in minutes
        this.currentFloor = initialFloor; 
    }

    /**
     * Peek at the head of the routine array without dequeuing it.
     * Returns null if the stack is depleted.
     */
    getNextMachineName() {
        return this.workoutRoutine[0] || null;
    }

    /**
     * Shifts the routine array, effectively committing the exercise as finished.
     */
    completeCurrentExercise() {
        this.workoutRoutine.shift();
    }

    /**
     * Direct metric tracking. Called on every clock tick where status === "Awaiting".
     */
    incrementWaitTime() {
        this.waitTime++;
    }

    /**
     * Defensive validation to check if the agent has fully cleared its operational loop.
     */
    hasFinishedWorkout() {
        return this.workoutRoutine.length === 0 && this.status !== "Training";
    }
}