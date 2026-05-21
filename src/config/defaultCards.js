import { WorkoutCard } from '../models/WorkoutCard.js';
import { Exercise } from '../models/Exercise.js';

/**
 * Static Data Seed Registry.
 * Provides a read-only dictionary of pre-configured production workout cards.
 * Alignment with 'gymLayout.js' machine name keys is mandatory to prevent simulation failure.
 */
const cardRegistry = {};

// --- CARD 1001: Standard Strength & Power Split ---
const card1001 = new WorkoutCard(1001);
// Split A: Chest, Shoulders, Triceps (Lower Floor)
card1001.addExerciseToSplit('A', new Exercise("Barbell Bench Press", "Barbell Bench Press", 4));
card1001.addExerciseToSplit('A', new Exercise("Pec Deck Flyes", "Pec Deck Machine", 3));
card1001.addExerciseToSplit('A', new Exercise("Triceps Pushdown", "Cable Pulley 1", 3));
// Split B: Back & Biceps (Lower Floor)
card1001.addExerciseToSplit('B', new Exercise("Heavy Lat Pulldown", "Lat Pulldown Cable", 4));
card1001.addExerciseToSplit('B', new Exercise("T-Bar Row", "T-Bar Row", 4));
card1001.addExerciseToSplit('B', new Exercise("Preacher Curl", "Preacher Curl Bench", 3));
// Split C: Quad Dominant Legs (Upper Floor)
card1001.addExerciseToSplit('C', new Exercise("Barbell Back Squat", "Barbell Squat Rack", 5));
card1001.addExerciseToSplit('C', new Exercise("45° Leg Press", "45-Degree Leg Press", 4));
card1001.addExerciseToSplit('C', new Exercise("Calf Raises", "Calf Raise Machine", 3));
cardRegistry[1001] = card1001;

// --- CARD 1002: Machine-Heavy Hypertrophy Split ---
const card1002 = new WorkoutCard(1002);
card1002.addExerciseToSplit('A', new Exercise("Machine Chest Press", "Seated Chest Press Machine", 3));
card1002.addExerciseToSplit('A', new Exercise("Incline Machine Press", "Incline Chest Press Machine", 3));
card1002.addExerciseToSplit('A', new Exercise("Triceps Extension", "Cable Pulley 2", 3));
card1002.addExerciseToSplit('B', new Exercise("Seated Machine Row 1", "Back Row Machine 1", 3));
card1002.addExerciseToSplit('B', new Exercise("Seated Cable Row", "Seated Cable Row", 3));
card1002.addExerciseToSplit('B', new RegistryExercise("Bicep Pulley Curl", "Cable Pulley 3", 3));
function RegistryExercise(n, m, d) { return new Exercise(n, m, d); } // Internal builder alias
card1002.addExerciseToSplit('B', new Exercise("Bicep Pulley Curl", "Cable Pulley 3", 3));
card1002.addExerciseToSplit('C', new Exercise("Machine Leg Press", "Seated Leg Press Machine", 4));
card1002.addExerciseToSplit('C', new Exercise("Leg Extensions", "Leg Extension Machine", 3));
card1002.addExerciseToSplit('C', new Exercise("Lying Leg Curl", "Lying Leg Curl Machine", 3));
cardRegistry[1002] = card1002;

// --- CARD 1003: High Volume Advanced Split ---
const card1003 = new WorkoutCard(1003);
card1003.addExerciseToSplit('A', new Exercise("Incline Machine Press", "Incline Chest Press Machine", 4));
card1003.addExerciseToSplit('A', new Exercise("Pec Deck Isolation", "Pec Deck Machine", 3));
card1003.addExerciseToSplit('A', new Exercise("Triceps Rope Press", "Cable Pulley 4", 3));
card1003.addExerciseToSplit('B', new Exercise("Lat Pulldown Wide Grip", "Lat Pulldown Cable", 4));
card1003.addExerciseToSplit('B', new Exercise("Seated Machine Row 2", "Back Row Machine 2", 4));
card1003.addExerciseToSplit('B', new Exercise("Isolated Preacher Curl", "Preacher Curl Bench", 3));
card1003.addExerciseToSplit('C', new Exercise("Pendulum Squat Drop-set", "Pendulum Squat", 5));
card1003.addExerciseToSplit('C', new Exercise("Seated Leg Curl", "Seated Leg Curl Machine", 3));
card1003.addExerciseToSplit('C', new Exercise("Calf Burnout", "Calf Raise Machine", 4));
cardRegistry[1003] = card1003;

// --- CARD 1004: Powerbuilding Hybrid Split ---
const card1004 = new WorkoutCard(1004);
card1004.addExerciseToSplit('A', new Exercise("Barbell Bench Press", "Barbell Bench Press", 5));
card1004.addExerciseToSplit('A', new Exercise("Decline Press Machine", "Decline Chest Press Machine", 3));
card1004.addExerciseToSplit('A', new Exercise("Triceps Heavy Pushdown", "Cable Pulley 1", 3));
card1004.addExerciseToSplit('B', new Exercise("Heavy T-Bar Row", "T-Bar Row", 4));
card1004.addExerciseToSplit('B', new Exercise("Seated Cable Row", "Seated Cable Row", 3));
card1004.addExerciseToSplit('B', new Exercise("Preacher Concentration Curl", "Preacher Curl Bench", 3));
card1004.addExerciseToSplit('C', new Exercise("V-Squat Machine", "Squat Machine", 4));
card1004.addExerciseToSplit('C', new Exercise("45° Leg Press", "45-Degree Leg Press", 4));
card1004.addExerciseToSplit('C', new Exercise("Leg Extensions", "Leg Extension Machine", 3));
cardRegistry[1004] = card1004;

// --- CARD 1005: Intermediate Basic Routine ---
const card1005 = new WorkoutCard(1005);
card1005.addExerciseToSplit('A', new Exercise("Chest Press Machine", "Seated Chest Press Machine", 3));
card1005.addExerciseToSplit('A', new Exercise("Pec Deck Flyes", "Pec Deck Machine", 3));
card1005.addExerciseToSplit('A', new Exercise("Triceps Pulley Overhead", "Cable Pulley 3", 3));
card1005.addExerciseToSplit('B', new Exercise("Machine Row Vertical Grip", "Back Row Machine 1", 3));
card1005.addExerciseToSplit('B', new Exercise("Lat Pulldown Dynamic", "Lat Pulldown Cable", 3));
card1005.addExerciseToSplit('B', new Exercise("Bicep Single Cable Curl", "Cable Pulley 2", 3));
card1005.addExerciseToSplit('C', new Exercise("Barbell Back Squat", "Barbell Squat Rack", 4));
card1005.addExerciseToSplit('C', new Exercise("Lying Leg Curl", "Lying Leg Curl Machine", 3));
card1005.addExerciseToSplit('C', new Exercise("Calf Raises", "Calf Raise Machine", 3));
cardRegistry[1005] = card1005;

// --- CARD 1006: Alternative Machine-Focus Split ---
const card1006 = new WorkoutCard(1006);
card1006.addExerciseToSplit('A', new Exercise("Incline Machine Press", "Incline Chest Press Machine", 3));
card1006.addExerciseToSplit('A', new Exercise("Decline Press Machine", "Decline Chest Press Machine", 3));
card1006.addExerciseToSplit('A', new Exercise("Triceps Execution", "Cable Pulley 4", 3));
card1006.addExerciseToSplit('B', new Exercise("Seated Machine Row 2", "Back Row Machine 2", 3));
card1006.addExerciseToSplit('B', new Exercise("T-Bar Row Lat Focus", "T-Bar Row", 3));
card1006.addExerciseToSplit('B', new Exercise("Preacher Curl Standard", "Preacher Curl Bench", 3));
card1006.addExerciseToSplit('C', new Exercise("Pendulum Squat", "Pendulum Squat", 4));
card1006.addExerciseToSplit('C', new Exercise("Machine Leg Press", "Seated Leg Press Machine", 4));
card1006.addExerciseToSplit('C', new Exercise("Seated Leg Curl", "Seated Leg Curl Machine", 3));
cardRegistry[1006] = card1006;

// Object.freeze guarantees the registry metadata cannot be altered during runtime mutations
export const defaultCards = Object.freeze(cardRegistry);