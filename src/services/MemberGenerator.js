import { Member } from '../models/Member.js';

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export class MemberGenerator {
    static generate(count, duration, machines) {
        const members = [];

        for (let i = 1; i <= count; i++) {
            const arrivalTick = Math.floor(Math.random() * Math.floor(duration / 3)) + 1;
            const member = new Member(i, `Member_${i}`, arrivalTick, "LowerFloor");

            const exerciseCount = Math.floor(Math.random() * 3) + 4;
            const shuffled = shuffle([...machines]);
            const exercises = shuffled.slice(0, Math.min(exerciseCount, shuffled.length)).map(machine => ({
                name: `${machine.name} Exercise`,
                targetMachineIds: [machine.id],
                defaultDuration: Math.floor(Math.random() * 8) + 8
            }));

            member.loadSessionWorkout(exercises);
            members.push(member);
        }

        return members;
    }
}