import fs from 'fs';
import path from 'path';

/**
 * Infrastructure service designed to construct high-fidelity interactive HTML dashboards.
 * Renders minute-by-minute behavioral state matrix charts for multi-agent validation.
 */
export class HtmlVisualizer {
    static writeVisualizer(fileName, members) {
        const targetDir = path.join(process.cwd(), 'reports');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        const outputPath = path.join(targetDir, fileName);

        // Pre-build option list payload for the dashboard shell selector
        const selectorOptions = members.map(m => 
            `<option value="agent-${m.id}">${m.name} (Wait: ${m.waitTime}m | Train: ${m.totalTrainingTime}m)</option>`
        ).join('\n');

        // Pre-render hidden timeline block nodes for instant UI selector injection
        const timelineBlocks = members.map(m => {
            const rows = m.timeline.map(t => {
                let statusClass = 'bg-zinc-800 text-zinc-400';
                if (t.status === 'Training') statusClass = 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40';
                if (t.status === 'Queued') statusClass = 'bg-amber-950/80 text-amber-400 border border-amber-800/40';
                if (t.status === 'Awaiting') statusClass = 'bg-sky-950/80 text-sky-400 border border-sky-800/40';
                if (t.status === 'Completed') statusClass = 'bg-indigo-950/60 text-indigo-400 border border-indigo-900/30';

                return `
                    <div class="flex items-center gap-4 p-3 rounded-lg ${statusClass} transition-all duration-150 hover:scale-[1.01]">
                        <div class="w-16 font-mono font-bold opacity-75 text-sm">MIN ${String(t.tick).padStart(3, '0')}</div>
                        <div class="w-24 text-xs font-semibold tracking-wider uppercase opacity-90">${t.status}</div>
                        <div class="w-28 text-xs font-mono opacity-60">${t.floor}</div>
                        <div class="flex-1 text-sm font-medium">${t.activity}</div>
                    </div>
                `;
            }).join('\n');

            return `
                <div id="agent-${m.id}" class="agent-timeline hidden flex flex-col gap-2 animate-fade-in">
                    <div class="mb-4 bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
                        <div>
                            <h2 class="text-xl font-bold text-zinc-100">${m.name}</h2>
                            <p class="text-xs text-zinc-400 font-mono mt-1">Workout Template ID Reference: ${m.workoutCardId}</p>
                        </div>
                        <div class="flex gap-4 text-center font-mono">
                            <div class="bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-700/40">
                                <span class="block text-xs text-zinc-400">WAIT TIME</span>
                                <span class="text-lg font-bold text-amber-400">${m.waitTime} min</span>
                            </div>
                            <div class="bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-700/40">
                                <span class="block text-xs text-zinc-400">TRAIN TIME</span>
                                <span class="text-lg font-bold text-emerald-400">${m.totalTrainingTime} min</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1.5 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
                        ${rows}
                    </div>
                </div>
            `;
        }).join('\n');

        const htmlTemplate = `
<!DOCTYPE html>
<html lang="en" class="h-full bg-zinc-950 text-zinc-50">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cirico Iron Gym - Timeline Audit Tracker</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #09090b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
    </style>
</head>
<body class="h-full flex flex-col antialiased">
    <header class="flex-none bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between shadow-lg">
        <div class="flex items-center gap-3">
            <div class="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <h1 class="text-lg font-bold tracking-tight text-zinc-100">Cirico Simulation Engine <span class="text-zinc-500 font-mono text-xs font-normal">v2.1.0</span></h1>
        </div>
        <div class="flex items-center gap-3">
            <label for="agentSelector" class="text-xs font-mono tracking-wider text-zinc-400 font-bold uppercase">Select Agent Instance:</label>
            <select id="agentSelector" class="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm font-medium text-zinc-200 focus:outline-none focus:border-emerald-700 transition-colors cursor-pointer">
                <option value="" disabled selected>Choose a member to audit...</option>
                ${selectorOptions}
            </select>
        </div>
    </header>

    <main class="flex-1 p-6 overflow-hidden max-w-5xl w-full mx-auto flex flex-col justify-center">
        <div id="welcomePlaceholder" class="text-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 max-w-xl mx-auto w-full">
            <svg class="mx-auto h-12 w-12 text-zinc-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h3 class="text-sm font-semibold text-zinc-300">No Agent Selected</h3>
            <p class="mt-1 text-xs text-zinc-500">Pick an athlete from the dropdown list on the top right corner to audit their 120-minute operational execution trace.</p>
        </div>

        <div id="timelineContainer" class="hidden flex-1 flex flex-col overflow-hidden">
            ${timelineBlocks}
        </div>
    </main>

    <script>
        const selector = document.getElementById('agentSelector');
        const placeholder = document.getElementById('welcomePlaceholder');
        const container = document.getElementById('timelineContainer');
        const timelines = document.querySelectorAll('.agent-timeline');

        selector.addEventListener('change', (e) => {
            placeholder.classList.add('hidden');
            container.classList.remove('hidden');
            
            timelines.forEach(t => t.classList.add('hidden'));
            
            const activeTimeline = document.getElementById(e.target.value);
            if (activeTimeline) {
                activeTimeline.classList.remove('hidden');
            }
        });
    </script>
</body>
</html>
        `;

        fs.writeFileSync(outputPath, htmlTemplate, 'utf-8');
        console.log(`[I/O] UI Dashboard telemetry successfully written to: ${outputPath}`);
    }
}