import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { References } from "../Refs/References";
import { TraderUtils } from "../Refs/Utils";

import * as assortJson from "../../db/assort.json";
import * as baseJson from "../../db/base.json";

const modName = "Lunnayaluna Lotus";

export class TraderData {
    constructor(
        private traderConfig: ITraderConfig,
        private ref: References,
        private traderHelper: TraderUtils,
    ) {}

    public registerProfileImage() {
        this.traderHelper.registerProfileImage(baseJson, modName, "lotus.png");
    }

    public setupTraderUpdateTime() {
        this.traderHelper.setTraderUpdateTime(this.traderConfig, baseJson, 1800, 7200);
    }

    public pushTrader() {
        this.traderHelper = new TraderUtils(this.ref);
        this.traderHelper.addTraderToDb(baseJson, assortJson);
    }

    public addTraderToLocales(
        fullName: string,
        firstName: string,
        nickName: string,
        location: string,
        description: string,
    ) {
        const locales = Object.values(this.ref.tables.locales.global) as Record<string, string>[];
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = fullName;
            locale[`${baseJson._id} FirstName`] = firstName;
            locale[`${baseJson._id} Nickname`] = nickName;
            locale[`${baseJson._id} Location`] = location;
            locale[`${baseJson._id} Description`] = description;
        }
    }
}
