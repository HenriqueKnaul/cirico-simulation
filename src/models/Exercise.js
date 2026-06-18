export class Exercise {
    constructor(name, targetMachineIds, defaultDuration = 3) {
        this.name = name;
        this.targetMachineIds = [...targetMachineIds];
        this.defaultDuration = defaultDuration;
    }
}