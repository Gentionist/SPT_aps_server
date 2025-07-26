import { inject, injectable } from "tsyringe";
//Spt Classes
import type { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import type { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { Traders } from "@spt/models/enums/Traders";
//Custom Classes
import type { ConfigManager } from "./managers/ConfigManager";
import type { TraderManager } from "./managers/TraderManager";
import type { TraderUtils } from "./utils/TraderUtils";
import type { ROLogger } from "./utils/Logger";
//Json Imports
import * as baseJson from "../db/base.json";

@injectable()
export class SariaShop {
    constructor(
        @inject("ROLogger") protected logger: ROLogger,
        @inject("TraderUtils") protected traderUtils: TraderUtils,
        @inject("TraderManager") protected traderManager: TraderManager,
        @inject("ConfigManager") protected configManager: ConfigManager,
        @inject("ConfigServer") protected configServer: ConfigServer,
    ) {}

    public async preSptLoadAsync(): Promise<void> {
        const ragfair = this.configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);

        this.traderUtils.registerProfileImage();
        this.traderUtils.setupTraderUpdateTime("66f4db5ca4958508883d700c");

        Traders["66f4db5ca4958508883d700c"] = "66f4db5ca4958508883d700c";
        ragfair.traders[baseJson._id] = true;
    }

    public async postDBLoadAsync(): Promise<void> {
        //Random message on server on startup
        const messageArray = [
            "found some rare goods out there",
            "there are much less bears to worry about now",
            "returning to base",
            "that's how you clean up a battlefield",
            "good thing I brought extra ammo",
        ];
        const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];

        //Check For LL Config Option
        if (this.configManager.modConfig().RemoveMoneyLLRequirements) {
            baseJson.loyaltyLevels.forEach((level) => {
                level.minSalesSum = 0;
            });
        }

        if (this.configManager.modConfig().RemoveLevelLLRequirements) {
            baseJson.loyaltyLevels.forEach((level) => {
                level.minLevel = 1;
            });
        }
        //Add Saria to the game
        this.traderManager.pushExports();
        //Add in Sarias assort
        this.traderManager.createAssort();

        this.logger.log(`Mission accomplished, ${randomMessage}.`, LogTextColor.CYAN);
    }
}
