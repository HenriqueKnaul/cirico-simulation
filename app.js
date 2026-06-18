import express from 'express';
import path from 'path';
import { DatabaseService } from './src/services/DatabaseService.js';
import { Machine } from './src/models/Machine.js';
import { MemberGenerator } from './src/services/MemberGenerator.js';
import { Simulator } from './src/services/Simulator.js';

DatabaseService.init();

const app = express();
const PORT = 8080;

app.use(express.static(path.join(process.cwd(), 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'home.html'));
});

app.get('/select-layout', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'layout.html'));
});

app.get('/config', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'config.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'results.html'));
});

app.get('/api/gym/:id', (req, res) => {
    const gyms = DatabaseService.getGyms();
    const gym = gyms.find(g => g.id === parseInt(req.params.id));
    if (gym) {
        res.json(gym);
    } else {
        res.status(404).json({ error: 'Gym not found' });
    }
});

app.get('/api/simulate', (req, res) => {
    try {
        const gymId = parseInt(req.query.gymId) || 1;
        const agentsCount = parseInt(req.query.agents) || 35;
        const duration = parseInt(req.query.time) || 120;
        const simulationsCount = parseInt(req.query.simulations) || 1;

        const dbMachines = DatabaseService.getMachinesByGym(gymId);
        if (!dbMachines || dbMachines.length === 0) {
            return res.status(404).json({ error: 'Layout database contains no machine profiles for execution.' });
        }

        let totalWaitTime = 0;
        let totalProductivity = 0;
        let totalOccupancy = 0;
        let totalAbandoned = 0;
        const aggregatedMachineOccupancy = {};
        let finalTimeline = [];

        for (let s = 0; s < simulationsCount; s++) {
            const machines = dbMachines.map(m => new Machine(m.id, m.name, m.floor));
            const members = MemberGenerator.generate(agentsCount, duration, machines);

            const simulator = new Simulator(machines, members, { duration });
            const report = simulator.run();

            totalWaitTime += report.averageWaitTime;
            totalProductivity += report.productivityIndex;
            totalOccupancy += report.overallOccupancy;
            totalAbandoned += report.abandonedCount;

            for (const [name, rate] of Object.entries(report.machineOccupancy)) {
                aggregatedMachineOccupancy[name] = (aggregatedMachineOccupancy[name] || 0) + rate;
            }

            if (s === 0) {
                finalTimeline = report.timeline;
            } else {
                for (let t = 0; t < report.timeline.length; t++) {
                    if (finalTimeline[t] && report.timeline[t]) {
                        finalTimeline[t].training += report.timeline[t].training;
                        finalTimeline[t].queued += report.timeline[t].queued;
                    }
                }
            }
        }

        for (const name of Object.keys(aggregatedMachineOccupancy)) {
            aggregatedMachineOccupancy[name] = Math.round(aggregatedMachineOccupancy[name] / simulationsCount);
        }

        for (let t = 0; t < finalTimeline.length; t++) {
            if (finalTimeline[t]) {
                finalTimeline[t].training = Math.round(finalTimeline[t].training / simulationsCount);
                finalTimeline[t].queued = Math.round(finalTimeline[t].queued / simulationsCount);
            }
        }

        res.json({
            averageWaitTime: Math.round(totalWaitTime / simulationsCount),
            productivityIndex: Math.round(totalProductivity / simulationsCount),
            overallOccupancy: Math.round(totalOccupancy / simulationsCount),
            abandonedCount: Math.round(totalAbandoned / simulationsCount),
            machineOccupancy: aggregatedMachineOccupancy,
            timeline: finalTimeline
        });
    } catch (error) {
        console.error("[SERVER ERROR]", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`\n[WEB] Servidor rodando em: http://localhost:${PORT}`);
});