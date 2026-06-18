export class Machine {
    constructor(id, name, floor) {
        this.id = id;
        this.name = name;
        this.floor = floor;
        this.queue = [];
        
        const unlimitedMachines = ["dumbbells", "exercise mat area"];
        this.isUnlimited = unlimitedMachines.includes(name.toLowerCase());
        this.maxCapacity = this.isUnlimited ? 10 : 1;
        
        this.users = [];
        this.totalUsageTime = 0;
        this.totalQueueTime = 0;
        this.queueCapacity = Infinity;
    }

    isFull() {
        return this.users.length >= this.maxCapacity;
    }

    hasQueueCapacity() {
        return this.queue.length < this.queueCapacity;
    }

    occupy(memberName) {
        if (this.isFull()) {
            throw new Error(`Machine ${this.name} is already at maximum capacity.`);
        }
        this.users.push(memberName);
    }

    releaseUser(memberName) {
        this.users = this.users.filter(u => u !== memberName);
    }

    hasUser(memberName) {
        return this.users.includes(memberName);
    }

    addToQueue(member) {
        if (!this.hasQueueCapacity()) {
            throw new Error(`Machine ${this.id} queue is full.`);
        }
        this.queue.push(member);
    }

    nextInQueue() {
        return this.queue.shift() || null;
    }

    recordTickUsage() {
        this.totalUsageTime += (this.users.length / this.maxCapacity);
        this.totalQueueTime += this.queue.length;
    }
}