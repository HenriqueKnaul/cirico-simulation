export const MemberStatus = {
    NOT_ARRIVED: 'NOT_ARRIVED',
    AWAITING: 'AWAITING',
    TRAINING: 'TRAINING',
    QUEUED: 'QUEUED',
    COMPLETED: 'COMPLETED'
};

export class Member {
    constructor(id, name, arrivalTick, currentFloor) {
        this.id = id;
        this.name = name;
        this.arrivalTick = arrivalTick;
        this.currentFloor = currentFloor;
        this.status = MemberStatus.NOT_ARRIVED;
        this.activeExercises = [];
        this.completedExercises = [];
        this.waitTime = 0;
        this.trainingTime = 0;
        this.remainingTime = 0;
        this.currentMachineId = null;
        this.currentExercise = null;
        this.lastMachineId = null;
        this.consecutiveBlockedTicks = 0;
        this.gaveUp = false;
    }

    loadSessionWorkout(exercises) {
        if (this.activeExercises.length > 0) {
            throw new Error(`Safety Violation: Active exercises are already loaded for member ${this.name}.`);
        }
        this.activeExercises = exercises;
    }

    tickTraining() {
        this.trainingTime++;
        if (this.remainingTime > 0) {
            this.remainingTime--;
        }
    }

    tickWaiting() {
        this.waitTime++;
    }

    startTraining(exercise, machineId) {
        this.status = MemberStatus.TRAINING;
        this.currentMachineId = machineId;
        this.currentExercise = exercise;
        this.remainingTime = exercise.defaultDuration;
        this.lastMachineId = machineId;
    }

    finishExercise() {
        if (this.currentExercise) {
            this.completedExercises.push(this.currentExercise);
            this.activeExercises = this.activeExercises.filter(e => e !== this.currentExercise);
        }
        this.status = MemberStatus.AWAITING;
        this.currentMachineId = null;
        this.currentExercise = null;
    }

    joinQueue(exercise, machineId) {
        this.status = MemberStatus.QUEUED;
        this.currentMachineId = machineId;
        this.currentExercise = exercise;
        this.lastMachineId = machineId;
        this.consecutiveBlockedTicks = 0;
    }

    hasFinishedWorkout() {
        return this.activeExercises.length === 0;
    }
}