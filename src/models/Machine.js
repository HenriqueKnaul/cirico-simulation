/**
 * Entity representing a physical resource inside the gym.
 * Handles state encapsulation and its own local FIFO queue.
 */
export class Machine {
    constructor(id, name, floor) {
        this.id = id;
        this.name = name;
        this.floor = floor; // Invariant: Must strictly be "UpperFloor" or "LowerFloor"
        this.occupiedBy = null; // Holds reference to the Member's identity (string/id). Null means idle.
        this.queue = []; // Simple array acting as a FIFO queue. 
    }

    /**
     * Clean boolean flag to abstract state evaluation from external services.
     */
    isOccupied() {
        return this.occupiedBy !== null;
    }

    /**
     * Mutates the machine state to occupied. 
     * Concurrency control must be handled by the orchestrator (Simulator).
     */
    occupy(memberName) {
        if (this.isOccupied()) {
            throw new Error(`State Conflict: Machine ${this.name} is already occupied by ${this.occupiedBy}.`);
        }
        this.occupiedBy = memberName;
    }

    /**
     * Resets the resource state back to idle.
     */
    release() {
        this.occupiedBy = null;
    }

    /**
     * Pushes a waiting member to the end of the line.
     */
    addToQueue(member) {
        this.queue.push(member);
    }

    /**
     * Dequeues the next member in line.
     * Note: JS Array.shift() is O(N) due to index shifting. For a gym simulation 
     * with dozens of agents, V8 optimizes this natively. No need for a custom LinkedList yet.
     */
    nextInQueue() {
        return this.queue.shift() || null;
    }
}