/**
 * Value Object representing a specific exercise in a routine.
 * Decouples the abstract workout activity from the physical infrastructure resource.
 */
export class Exercise {
    /**
     * @param {string} name - Common name of the exercise (e.g., "Inclined Press")
     * @param {string} targetMachineName - Exact string match of the Machine name in gymLayout
     * @param {number} defaultDuration - Estimated time in minutes needed to complete the sets
     */
    constructor(name, targetMachineName, defaultDuration = 3) {
        this.name = name;
        this.targetMachineName = targetMachineName;
        this.defaultDuration = defaultDuration;
    }
}