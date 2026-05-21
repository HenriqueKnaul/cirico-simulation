import fs from 'fs';
import path from 'path';

/**
 * Utility service to handle infrastructure I/O operations for data persistence.
 * Engineered to isolate file system mutations from core simulation mechanics.
 */
export class CsvWriter {
    /**
     * Persists the simulation metrics into a structured semi-colon-separated CSV.
     * Implements lazy directory evaluation to mitigate runtime file-system failures.
     * * @param {string} fileName - Target output file name (e.g., 'session_metrics.csv')
     * @param {Array<object>} records - Collection of simulated Member instances
     */
    static writeMemberReport(fileName, records) {
        const targetDir = path.join(process.cwd(), 'reports');

        // Defensive Check: Ensure infrastructure safety before attempting I/O.
        // Prevents throwing unhandled ENOENT exceptions at the end of execution.
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const outputPath = path.join(targetDir, fileName);

        // Strict Schema Definition: Explicit mapping decouples CSV columns 
        // from any dynamic V8 property ordering in memory.
        const headers = ['ID_Member', 'Name', 'Wait_Time_Minutes', 'Final_Status'];
        const csvRows = [headers.join(';')];

        for (const member of records) {
            const row = [
                member.id,
                // Data Sanitization: Prevent CSV injection/malformation by escaping structural delimiters.
                String(member.name).replace(/;/g, ','),
                member.waitTime,
                member.status
            ];
            csvRows.push(row.join(';'));
        }

        try {
            // Using synchronous I/O intentionally because this process executes at the absolute 
            // dead-end of the application lifecycle. Event-loop blocking is a non-issue during teardown.
            fs.writeFileSync(outputPath, csvRows.join('\n'), 'utf-8');
            console.log(`\n[I/O] Telemetry report successfully written to: ${outputPath}`);
        } catch (error) {
            // Fail-fast principle: Wrap low-level I/O errors into meaningful domain context.
            throw new Error(`Infrastructure Failure: Failed to write report. Internal cause: ${error.message}`);
        }
    }
}