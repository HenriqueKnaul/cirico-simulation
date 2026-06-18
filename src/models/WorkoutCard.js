export class WorkoutCard {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.splits = {};
    }

    addExerciseToSplit(splitLetter, exercise) {
        if (!this.splits[splitLetter]) {
            this.splits[splitLetter] = [];
        }
        this.splits[splitLetter].push(exercise);
    }

    getRoutineBySplit(splitLetter) {
        const routine = this.splits[splitLetter];
        if (!routine) {
            throw new Error(`Split '${splitLetter}' not found in workout card '${this.name}'.`);
        }
        return routine;
    }
}