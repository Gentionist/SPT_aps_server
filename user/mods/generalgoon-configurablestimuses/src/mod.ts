import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { BaseClasses } from "@spt/models/enums/BaseClasses";

class Mod implements IPostDBLoadMod
{
    private modConfig = require("../config/config.json");

    public postDBLoad(container: DependencyContainer): void
    {
        const itemHelper: ItemHelper = container.resolve<ItemHelper>("ItemHelper");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = Object.values(tables.templates.items);

        for (const item of items) 
        {
            if (itemHelper.isOfBaseclass(item._id, BaseClasses.STIMULATOR))
            {
                item._props.MaxHpResource = this.modConfig.uses;
            }
        }
        tables.templates.items["544fb3f34bdc2d03748b456a"]._props.MaxHpResource = this.modConfig.uses;
    }
}

export const mod = new Mod();
