import { LogConverter } from "../../helpers/convertToCsv";
import { HttpHandler } from "../HttpServer";
import fs from "fs"

export class LogController {
    constructor(private logConverter: LogConverter){}
    generateCsvReport: HttpHandler = async (request) => {
            const startDate = new Date(request.query?.startDate as string);
            const endDate = request.query?.endDate ? new Date(request.query?.endDate as string) : undefined;
            const filePath = await this.logConverter.convertToCSV(startDate, endDate);
            if (!fs.existsSync(filePath)) {
                return { statusCode: 400, body: { message: `Arquivo não encontrado` }}
            } 
            return { statusCode: 200, body: { message: `Arquivo gerado e salvo no caminho ${filePath}`}, filePath}
    };
}