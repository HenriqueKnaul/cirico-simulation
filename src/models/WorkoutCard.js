/**
 * Domain entity managing the training card container.
 * Engineered with dynamic dictionary allocation to scale seamlessly up to 5 splits (A-E).
 */
export class WorkoutCard {
    constructor(id) {
        this.id = id;
        this.routines = {}; // Dynamic Key-Value store replacing rigid property arrays
    }

    /**
     * Registers an exercise node into a target split ledger.
     */
    addExerciseToSplit(splitLetter, exercise) {
        const target = splitLetter.toUpperCase();
        
        // Strategic Constraint: Enforce structural boundaries up to 5 custom splits
        if (!['A', 'B', 'C', 'D', 'E'].includes(target)) {
            throw new Error(`Domain Invariant Violation: Split split '${splitLetter}' exceeds corporate framework scale (A-E).`);
        }

        if (!this.routines[target]) {
            this.routines[target] = [];
        }
        this.routines[target].push(exercise);
    }

    /**
     * Safe extraction layer returning the target routine stack or an empty array fallback.
     */
    getRoutineBySplit(splitLetter) {
        return this.routines[splitLetter.toUpperCase()] || [];
    }
}