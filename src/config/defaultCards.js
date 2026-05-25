import { WorkoutCard } from '../models/WorkoutCard.js';
import { Exercise } from '../models/Exercise.js';

const cardRegistry = {};

// --- CARD 1001 ---
const card1001 = new WorkoutCard(1001);
card1001.addExerciseToSplit('A', new Exercise("Barbell Bench Press", [1]));
card1001.addExerciseToSplit('A', new Exercise("Pec Deck Flyes", [5]));
card1001.addExerciseToSplit('A', new Exercise("Triceps Pushdown", [9, 10, 11, 12])); // Procura qualquer polia livre
card1001.addExerciseToSplit('A', new Exercise("Overhead Triceps Extension", [9, 10, 11, 12]));

card1001.addExerciseToSplit('B', new Exercise("Heavy Lat Pulldown", [13]));
card1001.addExerciseToSplit('B', new Exercise("T-Bar Row", [15]));
card1001.addExerciseToSplit('B', new Exercise("Preacher Curl", [16]));
card1001.addExerciseToSplit('B', new Exercise("Bicep Cable Curl", [9, 10, 11, 12]));

card1001.addExerciseToSplit('C', new Exercise("Barbell Back Squat", [26]));
card1001.addExerciseToSplit('C', new Exercise("45° Leg Press", [19]));
card1001.addExerciseToSplit('C', new Exercise("Leg Extensions", [21]));
card1001.addExerciseToSplit('C', new Exercise("Lying Leg Curl", [23]));
card1001.addExerciseToSplit('C', new Exercise("Calf Raises", [27]));
cardRegistry[1001] = card1001;

// --- CARD 1002 ---
const card1002 = new WorkoutCard(1002);
card1002.addExerciseToSplit('A', new Exercise("Machine Chest Press", [2]));
card1002.addExerciseToSplit('A', new Exercise("Incline Machine Press", [3]));
card1002.addExerciseToSplit('A', new Exercise("Pec Deck Isolation", [5]));
card1002.addExerciseToSplit('A', new Exercise("Triceps Extension Machine", [9, 10, 11, 12]));

card1002.addExerciseToSplit('B', new Exercise("Seated Machine Row 1", [17]));
card1002.addExerciseToSplit('B', new Exercise("Seated Cable Row", [14]));
card1002.addExerciseToSplit('B', new Exercise("Bicep Pulley Curl", [9, 10, 11, 12]));

card1002.addExerciseToSplit('C', new Exercise("Machine Leg Press", [20]));
card1002.addExerciseToSplit('C', new Exercise("Hack Squat Equivalent", [28]));
card1002.addExerciseToSplit('C', new Exercise("Seated Leg Curl", [24]));
card1002.addExerciseToSplit('C', new Exercise("Hip Abduction", [22]));
cardRegistry[1002] = card1002;

// --- CARD 1003 ---
const card1003 = new WorkoutCard(1003);
card1003.addExerciseToSplit('A', new Exercise("Barbell Bench Press", [1]));
card1003.addExerciseToSplit('A', new Exercise("Decline Press Machine", [4]));
card1003.addExerciseToSplit('A', new Exercise("Triceps Heavy Extension", [9, 10, 11, 12]));

card1003.addExerciseToSplit('B', new Exercise("Lat Pulldown Wide Grip", [13]));
card1003.addExerciseToSplit('B', new Exercise("Heavy T-Bar Row", [15]));
card1003.addExerciseToSplit('B', new Exercise("Preacher Curl Standard", [16]));

card1003.addExerciseToSplit('C', new Exercise("Pendulum Squat Drop-set", [25]));
card1003.addExerciseToSplit('C', new Exercise("45° Leg Press Heavy", [19]));
card1003.addExerciseToSplit('C', new Exercise("Seated Leg Curl", [24]));
card1003.addExerciseToSplit('C', new Exercise("Calf Burnout", [27]));
cardRegistry[1003] = card1003;

export const defaultCards = Object.freeze(cardRegistry);