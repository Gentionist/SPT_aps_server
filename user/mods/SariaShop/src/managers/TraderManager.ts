import { inject, injectable } from "tsyringe";
//Custom Classes
import type { SariaController } from "../controllers/SariaController";
import type { TraderUtils } from "../utils/TraderUtils";
//Json Imports
import * as baseJson from "../../db/base.json";

@injectable()
export class TraderManager {
    constructor(
        @inject("TraderUtils") protected traderUtils: TraderUtils,
        @inject("SariaController") protected sariaController: SariaController,
    ) {}

    public pushExports(): void {
        //Add Req Shop to the game
        this.traderUtils.pushTrader(baseJson);

        //Add Req Shop to Locales
        this.traderUtils.addTraderToLocales(
            "Saria",
            "A soldier with questionable motives, an unknown background, and a large supply of military goods. She's willing to trade, for a price of course.",
            baseJson,
        );
    }

    public createAssort() {
        this.sariaController.createLoyalLevel1();
        this.sariaController.createLoyalLevel2();
        this.sariaController.createLoyalLevel3();
        this.sariaController.createLoyalLevel4();
    }
}
