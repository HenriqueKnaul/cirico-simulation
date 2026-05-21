import { Member } from '../models/Member.js';
import { defaultCards } from '../config/defaultCards.js';

/**
 * Advanced Multi-Variable Factory Service.
 * Generates an agent stream characterized by randomized routine splits and staggered arrival schedules.
 */
export class MemberGenerator {
    /**
     * @param {number} count - Total number of agents to stream into the environment
     * @returns {Array<Member>}
     */
    static generate(count) {
        const cardIds = Object.keys(defaultCards).map(Number);
        const splits = ['A', 'B', 'C'];
        
        const poolOfNames = [
            "Henrique", "Guilherme", "Kaique", "Breno", "Andressa", "Cristiano", "Rodrigo", 
            "Aline", "Gustavo", "Eduarda", "Mateus", "Lucas", "Gabriel", "Bruno", "Rafael"
        ];

        const generatedMembers = [];

        for (let i = 1; i <= count; i++) {
            const id = 300 + i;
            const nameIdx = (i - 1) % poolOfNames.length;
            const uniqueName = `${poolOfNames[nameIdx]} #${i}`;

            const randomCardId = cardIds[Math.floor(Math.random() * cardIds.length)];
            const assignedCard = defaultCards[randomCardId];

            // Core Requirement: Randomize split selections per agent to distribute gym load
            const randomSplit = splits[Math.floor(Math.random() * splits.length)];

            // Core Requirement: Stagger arrivals gradually across a 45-minute initialization stream
            // This ensures an entry flow of roughly 1 to 2 new members per minute
            const arrivalTick = Math.floor((i - 1) / 1.2) + 1;

            const initialFloor = i % 2 === 0 ? "LowerFloor" : "UpperFloor";
            const member = new Member(id, uniqueName, randomCardId, arrivalTick, initialFloor);

            member.loadSessionWorkout(assignedCard, randomSplit);
            generatedMembers.push(member);
        }

        return generatedMembers;
    }
}