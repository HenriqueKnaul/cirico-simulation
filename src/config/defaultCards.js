import { WorkoutCard } from '../models/WorkoutCard.js';
import { Exercise } from '../models/Exercise.js';

const cardRegistry = {};

const card1001 = new WorkoutCard(1001);

card1001.addExerciseToSplit('A', new Exercise("Dumbbell Bench Press", [3, 4, 5, 6, 52, 53, 54, 55]));
card1001.addExerciseToSplit('A', new Exercise("Lat Pulldown", [16, 18, 19, 20, 21, 29, 65, 67, 68, 69, 70, 78]));
card1001.addExerciseToSplit('A', new Exercise("Barbell Squat", [27, 42, 49, 76, 91, 98]));
card1001.addExerciseToSplit('A', new Exercise("Leg Curl", [30, 31, 79, 80]));
card1001.addExerciseToSplit('A', new Exercise("Dumbbell Shoulder Press", [3, 4, 5, 6, 52, 53, 54, 55]));
card1001.addExerciseToSplit('A', new Exercise("Standing Calf Raise", [35, 36, 42, 49, 84, 85, 91, 98]));
card1001.addExerciseToSplit('A', new Exercise("Abdominal Exercise", [46, 47, 95, 96]));

card1001.addExerciseToSplit('B', new Exercise("Incline Dumbbell Press", [2, 3, 4, 5, 6, 51, 52, 53, 54, 55]));
card1001.addExerciseToSplit('B', new Exercise("Seated Cable Row", [17, 10, 21, 66, 59, 70]));
card1001.addExerciseToSplit('B', new Exercise("Leg Press", [35, 36, 32, 84, 85, 81]));
card1001.addExerciseToSplit('B', new Exercise("Stiff", [27, 42, 49, 76, 91, 98]));
card1001.addExerciseToSplit('B', new Exercise("Lateral Raise", [3, 52]));
card1001.addExerciseToSplit('B', new Exercise("Seated Calf Raise", [48, 97]));
card1001.addExerciseToSplit('B', new Exercise("Hanging Leg Raises", [46, 47, 95, 96]));

cardRegistry[1001] = card1001;

const card1002 = new WorkoutCard(1002);

card1002.addExerciseToSplit('A', new Exercise("Dumbbell Bench Press", [3, 4, 5, 6, 52, 53, 54, 55]));
card1002.addExerciseToSplit('A', new Exercise("Incline Barbell Press", [8, 9, 57, 58]));
card1002.addExerciseToSplit('A', new Exercise("Cable Crossover", [23, 24, 25, 26, 72, 73, 74, 75]));
card1002.addExerciseToSplit('A', new Exercise("Close Grip Bench Press", [8, 9, 57, 58]));
card1002.addExerciseToSplit('A', new Exercise("French Press", [3, 7, 52, 56]));
card1002.addExerciseToSplit('A', new Exercise("Rope Pushdown", [23, 24, 25, 26, 72, 73, 74, 75]));

card1002.addExerciseToSplit('B', new Exercise("Front Lat Pulldown", [16, 18, 19, 20, 21, 29, 65, 67, 68, 69, 70, 78]));
card1002.addExerciseToSplit('B', new Exercise("Barbell Row", [27, 42, 49, 10, 28, 76, 91, 98, 59, 77]));
card1002.addExerciseToSplit('B', new Exercise("Cable Pullover", [23, 24, 25, 26, 72, 73, 74, 75]));
card1002.addExerciseToSplit('B', new Exercise("Barbell Curl", [22, 71]));
card1002.addExerciseToSplit('B', new Exercise("Alternating Dumbbell Curl", [3, 52]));
card1002.addExerciseToSplit('B', new Exercise("Concentration Curl", [3, 4, 5, 6, 11, 52, 53, 54, 55, 60]));

card1002.addExerciseToSplit('C', new Exercise("Barbell Squat", [27, 42, 49, 76, 91, 98]));
card1002.addExerciseToSplit('C', new Exercise("Stiff", [27, 42, 49, 76, 91, 98]));
card1002.addExerciseToSplit('C', new Exercise("Leg Extension", [43, 44, 45, 92, 93, 94]));
card1002.addExerciseToSplit('C', new Exercise("Leg Curl", [30, 31, 79, 80]));
card1002.addExerciseToSplit('C', new Exercise("Barbell Shoulder Press", [27, 42, 49, 76, 91, 98]));
card1002.addExerciseToSplit('C', new Exercise("Lateral Raise", [3, 52]));
card1002.addExerciseToSplit('C', new Exercise("Barbell Shrug", [27, 42, 49, 76, 91, 98]));

cardRegistry[1002] = card1002;

const card1003 = new WorkoutCard(1003);

card1003.addExerciseToSplit('A', new Exercise("Dumbbell Bench Press", [3, 4, 5, 6, 52, 53, 54, 55]));
card1003.addExerciseToSplit('A', new Exercise("Lat Pulldown", [16, 18, 19, 20, 21, 29, 65, 67, 68, 69, 70, 78]));
card1003.addExerciseToSplit('A', new Exercise("Lateral Raise", [3, 52]));
card1003.addExerciseToSplit('A', new Exercise("Reverse Pec Deck", [13, 14, 62, 63]));
card1003.addExerciseToSplit('A', new Exercise("Shrug", [3, 27, 42, 49, 52, 76, 91, 98]));
card1003.addExerciseToSplit('A', new Exercise("EZ Bar Curl", [22, 71]));
card1003.addExerciseToSplit('A', new Exercise("Rope Pushdown", [23, 24, 25, 26, 72, 73, 74, 75]));

card1003.addExerciseToSplit('B', new Exercise("Barbell Squat", [27, 42, 49, 76, 91, 98]));
card1003.addExerciseToSplit('B', new Exercise("Romanian Deadlift", [27, 42, 49, 76, 91, 98]));
card1003.addExerciseToSplit('B', new Exercise("Leg Curl", [30, 31, 79, 80]));
card1003.addExerciseToSplit('B', new Exercise("Leg Extension", [43, 44, 45, 92, 93, 94]));
card1003.addExerciseToSplit('B', new Exercise("Hip Thrust", [40, 41, 89, 90]));
card1003.addExerciseToSplit('B', new Exercise("Standing Calf Raise", [35, 36, 42, 49, 84, 85, 91, 98]));

card1003.addExerciseToSplit('C', new Exercise("Incline Dumbbell Press", [2, 3, 4, 5, 6, 51, 52, 53, 54, 55]));
card1003.addExerciseToSplit('C', new Exercise("Barbell Row", [27, 42, 49, 10, 28, 76, 91, 98, 59, 77]));
card1003.addExerciseToSplit('C', new Exercise("Lateral Raise", [3, 52]));
card1003.addExerciseToSplit('C', new Exercise("Reverse Fly", [13, 14, 62, 63]));
card1003.addExerciseToSplit('C', new Exercise("Shrug", [3, 27, 42, 49, 52, 76, 91, 98]));
card1003.addExerciseToSplit('C', new Exercise("Hammer Curl", [3, 52]));
card1003.addExerciseToSplit('C', new Exercise("French Press", [3, 7, 52, 56]));

card1003.addExerciseToSplit('D', new Exercise("Hack Squat", [37, 38, 39, 86, 87, 88]));
card1003.addExerciseToSplit('D', new Exercise("Stiff", [27, 42, 49, 76, 91, 98]));
card1003.addExerciseToSplit('D', new Exercise("Leg Extension", [43, 44, 45, 92, 93, 94]));
card1003.addExerciseToSplit('D', new Exercise("Leg Curl", [30, 31, 79, 80]));
card1003.addExerciseToSplit('D', new Exercise("Hip Thrust", [40, 41, 89, 90]));
card1003.addExerciseToSplit('D', new Exercise("Seated Calf Raise", [48, 97]));

cardRegistry[1003] = card1003;

const card1004 = new WorkoutCard(1004);

card1004.addExerciseToSplit('A', new Exercise("Dips", [15, 29, 64, 78]));
card1004.addExerciseToSplit('A', new Exercise("Rope Pushdown", [23, 24, 25, 26, 72, 73, 74, 75]));
card1004.addExerciseToSplit('A', new Exercise("French Press", [3, 7, 52, 56]));
card1004.addExerciseToSplit('A', new Exercise("Barbell Curl", [22, 71]));
card1004.addExerciseToSplit('A', new Exercise("Alternating Dumbbell Curl", [3, 52]));
card1004.addExerciseToSplit('A', new Exercise("Hammer Curl", [3, 52]));
card1004.addExerciseToSplit('A', new Exercise("Reverse Curl", [22, 71]));

card1004.addExerciseToSplit('B', new Exercise("Barbell Squat", [27, 42, 49, 76, 91, 98]));
card1004.addExerciseToSplit('B', new Exercise("Leg Press", [35, 36, 32, 84, 85, 81]));
card1004.addExerciseToSplit('B', new Exercise("Leg Extension", [43, 44, 45, 92, 93, 94]));
card1004.addExerciseToSplit('B', new Exercise("Leg Curl", [30, 31, 79, 80]));
card1004.addExerciseToSplit('B', new Exercise("Stiff", [27, 42, 49, 76, 91, 98]));
card1004.addExerciseToSplit('B', new Exercise("Lunge", [3, 27, 42, 49, 52, 76, 91, 98]));
card1004.addExerciseToSplit('B', new Exercise("Standing Calf Raise", [35, 36, 84, 85]));
card1004.addExerciseToSplit('B', new Exercise("Seated Calf Raise", [48, 97]));

card1004.addExerciseToSplit('C', new Exercise("Shoulder Press", [3, 4, 5, 6, 27, 52, 53, 54, 55, 76]));
card1004.addExerciseToSplit('C', new Exercise("Dumbbell Lateral Raise", [3, 52]));
card1004.addExerciseToSplit('C', new Exercise("Front Raise", [3, 52]));
card1004.addExerciseToSplit('C', new Exercise("Upright Row", [22, 27, 42, 49, 71, 76, 91, 98]));
card1004.addExerciseToSplit('C', new Exercise("Dumbbell Shrug", [3, 52]));
card1004.addExerciseToSplit('C', new Exercise("Barbell Shrug", [27, 42, 49, 76, 91, 98]));
card1004.addExerciseToSplit('C', new Exercise("Cable Crunch", [23, 24, 25, 26, 72, 73, 74, 75]));
card1004.addExerciseToSplit('C', new Exercise("Hanging Leg Raise", [46, 95]));

card1004.addExerciseToSplit('D', new Exercise("Barbell Row", [27, 42, 49, 10, 28, 76, 91, 98, 59, 77]));
card1004.addExerciseToSplit('D', new Exercise("Pull Up / Lat Pulldown", [16, 18, 19, 20, 21, 29, 65, 67, 68, 69, 70, 78]));
card1004.addExerciseToSplit('D', new Exercise("Seated Cable Row", [17, 10, 21, 66, 59, 70]));
card1004.addExerciseToSplit('D', new Exercise("Straight Arm Pulldown", [23, 24, 25, 26, 72, 73, 74, 75]));
card1004.addExerciseToSplit('D', new Exercise("Reverse Pec Deck", [13, 14, 62, 63]));
card1004.addExerciseToSplit('D', new Exercise("Seated Calf Raise", [48, 97]));
card1004.addExerciseToSplit('D', new Exercise("Standing Calf Raise", [35, 36, 84, 85]));

card1004.addExerciseToSplit('E', new Exercise("Barbell Bench Press", [1, 8, 9, 50, 57, 58]));
card1004.addExerciseToSplit('E', new Exercise("Incline Dumbbell Press", [2, 3, 4, 5, 6, 51, 52, 53, 54, 55]));
card1004.addExerciseToSplit('E', new Exercise("Decline Bench Press", [12, 61]));
card1004.addExerciseToSplit('E', new Exercise("Pec Deck Fly", [13, 14, 62, 63]));
card1004.addExerciseToSplit('E', new Exercise("Cable Crunch", [23, 24, 25, 26, 72, 73, 74, 75]));
card1004.addExerciseToSplit('E', new Exercise("Hanging Leg Raise", [46, 95]));

cardRegistry[1004] = card1004;

export const defaultCards = Object.freeze(cardRegistry);