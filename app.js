import { gymLayout } from './src/config/gymLayout.js';
import { Machine } from './src/models/Machine.js';
import { Simulator } from './src/services/Simulator.js';
import { MemberGenerator } from './src/services/MemberGenerator.js';
import { CsvWriter } from './src/utils/csvWriter.js';
import { HtmlVisualizer } from './src/utils/htmlVisualizer.js';

// 1. Initialize core physical infrastructure
const machines = gymLayout.machines.map(m => new Machine(m.id, m.name, m.floor));

// 2. Load Generation: Distribute a staggered stream of 30 multi-split agents
const members = MemberGenerator.generate(30);

// 3. Setup core simulation framework (120 minutes window execution)
const simulator = new Simulator(machines, members, { duration: 120 });

// 4. Run discrete engine loops
simulator.run();

// 5. Fire persistence generation pipelines
try {
    const fileTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Save standard raw analytics file
    CsvWriter.writeMemberReport(`dynamic_gym_session_${fileTimestamp}.csv`, members);
    
    // Save the new interactive HTML audit dashboard file
    HtmlVisualizer.writeVisualizer(`cirico_ui_dashboard_${fileTimestamp}.html`, members);
} catch (error) {
    console.error(`[FATAL] Pipeline broken: ${error.message}`);
    process.exit(1);
}