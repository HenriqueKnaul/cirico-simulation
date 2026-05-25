/**
 * Entity representing a physical gym asset.
 * Controls resource allocation state and hosts a high-friction predictive queue.
 */
export class Machine {
    constructor(id, name, floor) {
        this.id = id;
        this.name = name;
        this.floor = floor;
        this.occupiedBy = null;
        this.queue = []; // Finite queue allocation block. Maximum capacity boundary = 1.
    }

    isOccupied() {
        return this.occupiedBy !== null;
    }

    occupy(memberName) {
        this.occupiedBy = memberName;
    }

    release() {
        this.occupiedBy = null;
    }

    /**
     * Pushes an agent to the predictive waiting slot.
     */
    addToQueue(member) {
        if (this.queue.length >= 1) {
            throw new Error(`Infrastructure Overflow: Machine ID ${this.id} predictive queue slot is already locked.`);
        }
        this.queue.push(member);
    }

    /**
     * Pops and returns the next agent inline to claim immediate resource ownership.
     */
    nextInQueue() {
        return this.queue.shift() || null;
    }

    isQueueEmpty() {
        return this.queue.length === 0;
    }
}