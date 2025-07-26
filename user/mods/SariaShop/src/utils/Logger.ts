//Spt Classes
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { inject, injectable } from "tsyringe";

@injectable()
export class ROLogger {
    private logPrefix = "[Saria] ";

    constructor(@inject("WinstonLogger") protected logger: ILogger) {}

    public log(text: string, textColor?: LogTextColor) {
        if (typeof textColor !== "undefined") {
            this.logger.log(this.logPrefix + text, textColor);
        } else {
            this.logger.log(this.logPrefix + text, LogTextColor.WHITE);
        }
    }

    public logError(errorText: string) {
        this.logger.error(this.logPrefix + errorText);
    }

    public logWarning(text: string) {
        this.logger.warning(this.logPrefix + text);
    }
}
