import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import * as path from "path";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";


import { IInventoryConfig } from "@spt/models/spt/config/IInventoryConfig";
import { DatabaseService } from "@spt/services/DatabaseService";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";

const modPath = path.normalize(path.join(__dirname, '..'));


class items implements IPostDBLoadMod {
    mod: string
    logger: ILogger
    private configServer: ConfigServer;

    constructor() {
        this.logger.debug("Constructor");
    }


    public run(): void {

/*
        const bearHat: NewItemFromCloneDetails = {
            itemTplToClone: "5b40e61f5acfc4001a599bec",
            overrideProperties: {
                Name: "Bear 5 Panel",
                ShortName: "Bear Hat",
                Description: "5 Panel hat used by BEAR PMCs",
                Weight: 1,
                Prefab: {
                    "path": "bear_hat.bundle",
                    "rcid": ""
                },
                Width: 1,
                Height: 1
            },
            parentId: "5a341c4086f77401f2541505",
            newId: "6765d79148caecc924f38301",
            fleaPriceRoubles: 1,
            handbookPriceRoubles: 1,
            handbookParentId: "6765d794b79a3bb2607a2389",
            locales: {
                en: {
                    name: "Bear 5 Panel",
                    shortName: "Bear Hat",
                    description: "5 Panel hat used by BEAR PMCs",
                },
            },
        };

        customItem.createItemFromClone(bearHat);
*/
        this.logger.log("Custom Items Loaded", LogTextColor.GREEN)

    }
    
}
module.exports = { mod: new items() }