/**
 * Domain entity representing a member's complete training card.
 * Holds structurally isolated routines for different muscle groups splits (A, B, C).
 */
export class WorkoutCard {
    /**
     * @param {number} id - Unique identifier for the specific card template
     */
    constructor(id) {
        this.id = id;
        this.routineA = []; // Split: Chest, Shoulders, and Triceps
        this.routineB = []; // Split: Back and Biceps
        this.routineC = []; // Split: Overall Legs and Calf
    }

    /**
     * Fluent interface method to populate routine paths without leaking array internals.
     */
    addExerciseToSplit(splitLetter, exercise) {
        const target = splitLetter.toUpperCase();
        if (target === 'A') this.routineA.push(exercise);
        else if (target === 'B') this.routineB.push(exercise);
        else if (target === 'C') this.routineC.push(exercise);
        else throw new Error(`Domain Invariant Violation: Invalid routine split letter '${splitLetter}'.`);
    }

    /**
     * Safe extraction layer to retrieve a specific workout sequence for a given simulation day.
     * @param {string} splitLetter - "A" | "B" | "C"
     * @returns {Array<Exercise>}
     */
    getRoutineBySplit(splitLetter) {
        const target = splitLetter.toUpperCase();
        if (target === 'A') return this.routineA;
        if (target === 'B') return this.routineB;
        if (target === 'C') return this.routineC;
        return [];
    }
}