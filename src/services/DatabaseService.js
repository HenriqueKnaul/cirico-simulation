import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'gym_simulation.db');
const db = new Database(dbPath);

const originalMachines = [
    { name: "seated chest press machine", floor: "LowerFloor" },
    { name: "incline chest press machine", floor: "LowerFloor" },
    { name: "Dumbbells", floor: "LowerFloor" },
    { name: "Adjustable bench", floor: "LowerFloor" },
    { name: "Adjustable bench", floor: "LowerFloor" },
    { name: "Adjustable bench", floor: "LowerFloor" },
    { name: "French press triceps bench", floor: "LowerFloor" },
    { name: "Barbell bench press station", floor: "LowerFloor" },
    { name: "Barbell bench press station", floor: "LowerFloor" },
    { name: "Plate-loaded row machine", floor: "LowerFloor" },
    { name: "Preacher curl bench", floor: "LowerFloor" },
    { name: "Decline chest press machine", floor: "LowerFloor" },
    { name: "2-in-1 peck deck machine", floor: "LowerFloor" },
    { name: "Old school peck deck machine", floor: "LowerFloor" },
    { name: "Plate-loaded triceps dip machine", floor: "LowerFloor" },
    { name: "Lat pulldown machine", floor: "LowerFloor" },
    { name: "Seated cable row machine", floor: "LowerFloor" },
    { name: "Plate-loaded lat pulldown", floor: "LowerFloor" },
    { name: "Plate-loaded lat pulldown", floor: "LowerFloor" },
    { name: "Plate-loaded high row machine", floor: "LowerFloor" },
    { name: "Plate-loaded vertical row machine", floor: "LowerFloor" },
    { name: "Barbell bicep curl station", floor: "LowerFloor" },
    { name: "Cable pulley", floor: "LowerFloor" },
    { name: "Cable pulley", floor: "LowerFloor" },
    { name: "Cable pulley", floor: "LowerFloor" },
    { name: "Cable pulley", floor: "LowerFloor" },
    { name: "Smith machine", floor: "LowerFloor" },
    { name: "T-bar row station", floor: "LowerFloor" },
    { name: "Assisted pull-up machine", floor: "LowerFloor" },
    { name: "Lying leg curl machine", floor: "UpperFloor" },
    { name: "Prone leg curl bench", floor: "UpperFloor" },
    { name: "Pendulum squat machine", floor: "UpperFloor" },
    { name: "Plate-loaded hip abductor machine", floor: "UpperFloor" },
    { name: "2-in-1 hip abductor/adductor", floor: "UpperFloor" },
    { name: "Seated leg press machine", floor: "UpperFloor" },
    { name: "45-degree leg press", floor: "UpperFloor" },
    { name: "Hack squat machine 1", floor: "UpperFloor" },
    { name: "Hack squat machine 2", floor: "UpperFloor" },
    { name: "Hack squat machine 3", floor: "UpperFloor" },
    { name: "Hip thrust machine", floor: "UpperFloor" },
    { name: "Plate-loaded sumo squat machine", floor: "UpperFloor" },
    { name: "Squat rack cage", floor: "UpperFloor" },
    { name: "Plate-loaded leg extension machine", floor: "UpperFloor" },
    { name: "Old school leg extension machine", floor: "UpperFloor" },
    { name: "Leg extension machine", floor: "UpperFloor" },
    { name: "Captain chair abs station", floor: "UpperFloor" },
    { name: "Exercise mat area", floor: "UpperFloor" },
    { name: "Seated calf raise machine", floor: "UpperFloor" },
    { name: "Barbell squat rack", floor: "UpperFloor" }
];

export class DatabaseService {
    static init() {
        db.exec(`
            DROP TABLE IF EXISTS machines;
            DROP TABLE IF EXISTS gyms;

            CREATE TABLE IF NOT EXISTS gyms (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS machines (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                gymId INTEGER,
                name TEXT NOT NULL,
                floor TEXT NOT NULL,
                FOREIGN KEY (gymId) REFERENCES gyms(id)
            );
        `);

        const insertGym = db.prepare('INSERT INTO gyms (id, name) VALUES (?, ?)');
        insertGym.run(1, 'Original Layout');
        insertGym.run(2, 'DoubleSize Layout');

        const insertMachine = db.prepare('INSERT INTO machines (gymId, name, floor) VALUES (?, ?, ?)');

        for (const m of originalMachines) {
            insertMachine.run(1, m.name, m.floor);
        }

        const doubleSizeMachines = [...originalMachines, ...originalMachines];
        for (const m of doubleSizeMachines) {
            insertMachine.run(2, m.name, m.floor);
        }
    }

    static getGyms() {
        return db.prepare('SELECT * FROM gyms').all();
    }

    static getMachinesByGym(gymId) {
        return db.prepare('SELECT * FROM machines WHERE gymId = ?').all(gymId);
    }
}