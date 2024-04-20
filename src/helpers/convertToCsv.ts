import fs from 'fs';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import { LoggerI } from './Logger';

export class LogConverter {
    private jsonLogFilePath = path.join(__dirname, "..", "..", "logs", 'logs.log');
    private csvLogDirectory = path.join(__dirname, "..", "..", "logs");
    constructor(private logger: LoggerI) {}

    async convertToCSV(startDate: Date, endDate?: Date) {
        let csvFileName: string
        let endDateString: string
        let csvFilePath: string;

        const startDateString = startDate.toISOString().split('T')[0];

        if (endDate === undefined) {
            endDate = startDate;
            endDateString = endDate?.toISOString().split('T')[0];
            csvFileName = `${startDateString}.relatorio.csv`;
        } else {
            csvFileName = `${startDateString}_${endDate.toISOString().split('T')[0]}.relatorio.csv`;
            endDateString =  String(endDate?.setDate(endDate.getDate() + 1));
        }

        csvFilePath = path.join(this.csvLogDirectory, csvFileName);
        const csvWriter = createObjectCsvWriter({
            path: csvFilePath,
            header: [
                { id: 'level', title: 'LEVEL' },
                { id: 'time', title: 'TIME' },
                { id: 'pid', title: 'PID' },
                { id: 'hostname', title: 'HOSTNAME' },
                { id: 'msg', title: 'MESSAGE' },
            ],
        });
        const logData = fs.readFileSync(this.jsonLogFilePath, 'utf-8');
        const logLines = logData.trim().split('\n');
        const logRecords = logLines.map((line) => {

            const log = JSON.parse(line);
            const logDate = new Date(log.time);
    
            const formattedTime = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}-${String(logDate.getDate()).padStart(2, '0')} ${String(logDate.getHours()).padStart(2, '0')}:${String(logDate.getMinutes()).padStart(2, '0')}:${String(logDate.getSeconds()).padStart(2, '0')}`;
            log.time = formattedTime;

            if(startDate === endDate) {
    
                if (logDate.toDateString() === startDate.toDateString()) {
                    return log;
                }
            } else {
                if (logDate >= startDate && logDate <= endDate) {
                    return log;
                }
            }
           

            return null;
        }).filter(record => record !== null);   

        await csvWriter.writeRecords(logRecords)
            .then(() => {
                this.logger.info(`Logs convertidos para CSV com sucesso! Arquivo salvo em: ${csvFilePath}`);
            })
            .catch((error) => {
                this.logger.error(`Erro ao converter logs para CSV: ${error.message}`);
            });

            return csvFilePath;
    }
}
