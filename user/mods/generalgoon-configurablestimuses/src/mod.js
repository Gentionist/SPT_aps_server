"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
class Mod {
    modConfig = require("../config/config.json");
    postDBLoad(container) {
        const itemHelper = container.resolve("ItemHelper");
        const databaseServer = container.resolve("DatabaseServer");
        const tables = databaseServer.getTables();
        const items = Object.values(tables.templates.items);
        for (const item of items) {
            if (itemHelper.isOfBaseclass(item._id, BaseClasses_1.BaseClasses.STIMULATOR)) {
                item._props.MaxHpResource = this.modConfig.uses;
            }
        }
        tables.templates.items["544fb3f34bdc2d03748b456a"]._props.MaxHpResource = this.modConfig.uses;
    }
}
exports.mod = new Mod();
//# sourceMappingURL=mod.js.map