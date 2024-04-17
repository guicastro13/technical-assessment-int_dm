import pino from 'pino';
import path from 'node:path';
import fs from 'node:fs';

export interface LoggerI {
    info(message:string): void
    error(message:string):void
}

export class LoggerService implements LoggerI {
    private logger;

    constructor() {
        const logFilePath = path.join(__dirname, "..", "..", "logs", 'logs.log');
        const logDirectory = path.dirname(logFilePath);
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory, { recursive: true });
        }

        const transport = pino.transport({
            targets: [
                {
                    target: 'pino/file',
                    options: { destination: logFilePath },
                },
                {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                    },
                },
            ],
        });

        this.logger = pino(transport);
    }

    info(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }
}