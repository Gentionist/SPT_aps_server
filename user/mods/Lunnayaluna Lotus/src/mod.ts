import { DependencyContainer } from "tsyringe";

import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { Traders } from "@spt/models/enums/Traders";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { ItemGenerator } from "./CustomItems/ItemGenerator";
import { References } from "./Refs/References";
import { TraderUtils } from "./Refs/Utils";
import { TraderData } from "./Trader/Lotus";

import * as baseJson from "../db/base.json";
import * as questAssort from "../db/questassort.json";

class Lotus implements IPreSptLoadMod, IPostDBLoadMod {
    private ref: References = new References();

    public preSptLoad(container: DependencyContainer): void {
        this.ref.preSptLoad(container);

        const ragfair: IRagfairConfig = this.ref.configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const traderConfig: ITraderConfig = this.ref.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const traderUtils = new TraderUtils(this.ref);
        const traderData = new TraderData(traderConfig, this.ref, traderUtils);

        traderData.registerProfileImage();
        traderData.setupTraderUpdateTime();

        Traders[baseJson._id] = baseJson._id;
        ragfair.traders[baseJson._id] = true;
    }

    public postDBLoad(container: DependencyContainer): void {
        this.ref.postDBLoad(container);

        const traderConfig: ITraderConfig = this.ref.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const locations = this.ref.tables.locations;
        const itemGenerator = new ItemGenerator(this.ref);
        const traderUtils = new TraderUtils(this.ref);
        const traderData = new TraderData(traderConfig, this.ref, traderUtils);

        traderData.pushTrader();
        this.ref.tables.traders[baseJson._id].questassort = questAssort;
        traderData.addTraderToLocales(
            baseJson.name,
            "Lotus",
            baseJson.nickname,
            baseJson.location,
            "A businesswoman who travels around conflict zones around the world.",
        );

        itemGenerator.createCustomItems("../../db/ItemGen/Keys");
        locations.laboratory.base.AccessKeys.push(...["6747b519aa6cb78b189e6081"]);

        this.ref.logger.log("Lotus arrived in Tarkov", LogTextColor.CYAN);
    }
}

module.exports = { mod: new Lotus() };
