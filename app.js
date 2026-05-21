import { gymLayout } from './src/config/gymLayout.js';
import { Machine } from './src/models/Machine.js';
import { Simulator } from './src/services/Simulator.js';
import { MemberGenerator } from './src/services/MemberGenerator.js';
import { CsvWriter } from './src/utils/csvWriter.js';

// 1. Initialize physical infrastructure
const machines = gymLayout.machines.map(m => new Machine(m.id, m.name, m.floor));

// 2. Load Generation: Build a distributed stream of 50 multi-split agents
const members = MemberGenerator.generate(50);

// 3. Construct simulation infrastructure (120 minutes execution window)
const simulator = new Simulator(machines, members, { duration: 120 });

// 4. Run runtime environment
simulator.run();

// 5. Build telemetry file report
try {
    const fileTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputFileName = `dynamic_gym_session_${fileTimestamp}.csv`;

    CsvWriter.writeMemberReport(outputFileName, members);
} catch (error) {
    console.error(`[FATAL] Pipeline broken: ${error.message}`);
    process.exit(1);
}