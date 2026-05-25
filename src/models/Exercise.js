/**
 * Value Object representing a workout exercise.
 * Refactored to map against an array of physical resource IDs (Multi-Target Routing).
 */
export class Exercise {
    /**
     * @param {string} name - Exercise description
     * @param {Array<number>} targetMachineIds - Collection of valid physical Machine IDs (e.g., [9, 10, 11, 12])
     * @param {number} defaultDuration - Default baseline minutes
     */
    constructor(name, targetMachineIds, defaultDuration = 3) {
        this.name = name;
        this.targetMachineIds = [...targetMachineIds]; 
        this.defaultDuration = defaultDuration;
    }
}