"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const items_json_1 = __importDefault(require("../database/items.json"));
const globals_json_1 = __importDefault(require("../database/globals.json"));
const assort_json_1 = __importDefault(require("../database/traders/668aaff35fd574b6dcc4a686/assort.json"));
class BlackCore {
    db;
    mydb;
    logger;
    jsonUtil;
    postDBLoad(container) {
        try {
            this.logger = container.resolve("WinstonLogger");
            this.jsonUtil = container.resolve("JsonUtil");
            const databaseServer = container.resolve("DatabaseServer");
            const databaseImporter = container.resolve("ImporterUtil");
            const modLoader = container.resolve("PreSptModLoader");
            this.db = databaseServer.getTables();
            this.mydb = {
                items: items_json_1.default,
                globals: globals_json_1.default,
                traders: {
                    "668aaff35fd574b6dcc4a686": {
                        assort: assort_json_1.default
                    }
                }
            };
            if (!this.db || !this.mydb) {
                throw new Error("Failed to load required databases");
            }
            const modFolderName = "MoxoPixel-BlackCore";
            const traders = {
                "painter": "668aaff35fd574b6dcc4a686"
            };
            for (const newItem in this.mydb.items) {
                this.cloneItem(this.mydb.items[newItem].clone, newItem);
                this.addCompatibilitiesAndConflicts(this.mydb.items[newItem].clone, newItem);
                const newItemLocales = this.mydb.items[newItem].locales;
                for (const lang in this.db.locales.global) {
                    this.db.locales.global[lang][`${newItem} Name`] = newItemLocales.Name;
                    this.db.locales.global[lang][`${newItem} ShortName`] = newItemLocales.Shortname;
                    this.db.locales.global[lang][`${newItem} Description`] = newItemLocales.Description;
                }
            }
            for (const trader in traders)
                this.addTraderAssort(traders[trader]);
            for (const preset in this.mydb.globals.ItemPresets) {
                this.db.globals.ItemPresets[preset] = this.mydb.globals.ItemPresets[preset];
                // this.db.locales.global.en[preset] = this.mydb.globals.ItemPresets[preset]._name;
            }
            const dbMastering = this.db.globals.config.Mastering;
            for (const weapon in dbMastering) {
                if (dbMastering[weapon].Name == "M4")
                    dbMastering[weapon].Templates.push("672e37d1179b7b969b7577cb", "672e37d1ddaf7c656e3a634c", "672e37d19f1683101780773b");
                if (dbMastering[weapon].Name == "AK74")
                    dbMastering[weapon].Templates.push("672e37d1e35a6ec6e6997492");
                if (dbMastering[weapon].Name == "R11SRASS")
                    dbMastering[weapon].Templates.push("672e37d1dd890afba20c10e7");
                if (dbMastering[weapon].Name == "MK47")
                    dbMastering[weapon].Templates.push("672e37d10b7a12e6a7a50b77");
                if (dbMastering[weapon].Name == "SPEAR")
                    dbMastering[weapon].Templates.push("672e37d17f433cdb29072bc8");
            }
            const dbQuests = this.db.templates.quests;
            for (const M4Quest in dbQuests) {
                if (dbQuests[M4Quest]._id === "5a27bb8386f7741c770d2d0a" ||
                    dbQuests[M4Quest]._id === "5c0d4c12d09282029f539173" ||
                    dbQuests[M4Quest]._id === "63a9b229813bba58a50c9ee5" ||
                    dbQuests[M4Quest]._id === "64e7b9bffd30422ed03dad38" ||
                    dbQuests[M4Quest]._id === "666314b4d7f171c4c20226c3") {
                    const availableForFinish = dbQuests[M4Quest].conditions.AvailableForFinish;
                    for (const condition of availableForFinish) {
                        if (condition.counter && condition.counter.conditions) {
                            for (const counterCondition of condition.counter.conditions) {
                                if (counterCondition.weapon) {
                                    counterCondition.weapon.push("672e37d1179b7b969b7577cb", "672e37d1ddaf7c656e3a634c", "672e37d19f1683101780773b");
                                }
                            }
                        }
                    }
                }
            }
            for (const AKQuest in dbQuests) {
                if (dbQuests[AKQuest]._id === "59c50a9e86f7745fef66f4ff" ||
                    dbQuests[AKQuest]._id === "61e6e60223374d168a4576a6" ||
                    dbQuests[AKQuest]._id === "64e7b9bffd30422ed03dad38") {
                    const availableForFinish = dbQuests[AKQuest].conditions.AvailableForFinish;
                    for (const condition of availableForFinish) {
                        if (condition.counter && condition.counter.conditions) {
                            for (const counterCondition of condition.counter.conditions) {
                                if (counterCondition.weapon) {
                                    counterCondition.weapon.push("672e37d1e35a6ec6e6997492");
                                }
                            }
                        }
                    }
                }
            }
            for (const MK47Quest in dbQuests) {
                if (dbQuests[MK47Quest]._id === "64e7b9bffd30422ed03dad38") {
                    const availableForFinish = dbQuests[MK47Quest].conditions.AvailableForFinish;
                    for (const condition of availableForFinish) {
                        if (condition.counter && condition.counter.conditions) {
                            for (const counterCondition of condition.counter.conditions) {
                                if (counterCondition.weapon) {
                                    counterCondition.weapon.push("672e37d10b7a12e6a7a50b77", "672e37d17f433cdb29072bc8");
                                }
                            }
                        }
                    }
                }
            }
            this.logger.info("------------------------");
            this.logger.info("Black Core Loaded");
        }
        catch (error) {
            this.logger.error(`Error loading BlackCore mod: ${error.message}`);
        }
    }
    cloneItem(itemToClone, blackCoreID) {
        if (!itemToClone || !blackCoreID) {
            this.logger.error("Invalid parameters passed to cloneItem");
            return;
        }
        if (!this.mydb.items[blackCoreID]?.enable) {
            return;
        }
        if (!this.db.templates.items[itemToClone]) {
            this.logger.error(`Template item ${itemToClone} not found`);
            return;
        }
        if (this.mydb.items[blackCoreID].enable == true) {
            let blackCoreItemOut = this.jsonUtil.clone(this.db.templates.items[itemToClone]);
            blackCoreItemOut._id = blackCoreID;
            blackCoreItemOut = this.compareAndReplace(blackCoreItemOut, this.mydb.items[blackCoreID]["items"]);
            const bcCompatibilities = (typeof this.mydb.items[blackCoreID].bcCompatibilities == "undefined") ? {} : this.mydb.items[blackCoreID].bcCompatibilities;
            const bcConflicts = (typeof this.mydb.items[blackCoreID].bcConflicts == "undefined") ? [] : this.mydb.items[blackCoreID].bcConflicts;
            for (const modSlotName in bcCompatibilities) {
                for (const slot of blackCoreItemOut._props.Slots) {
                    if (slot._name === modSlotName)
                        for (const id of bcCompatibilities[modSlotName])
                            slot._props.filters[0].Filter.push(id);
                }
            }
            blackCoreItemOut._props.ConflictingItems = blackCoreItemOut._props.ConflictingItems.concat(bcConflicts);
            this.db.templates.items[blackCoreID] = blackCoreItemOut;
            const handbookEntry = {
                "Id": blackCoreID,
                "ParentId": this.mydb.items[blackCoreID]["handbook"]["ParentId"],
                "Price": this.mydb.items[blackCoreID]["handbook"]["Price"]
            };
            this.db.templates.handbook.Items.push(handbookEntry);
        }
    }
    compareAndReplace(originalItem, attributesToChange) {
        for (const key in attributesToChange) {
            if ((["boolean", "string", "number"].includes(typeof attributesToChange[key])) || Array.isArray(attributesToChange[key])) {
                if (key in originalItem)
                    originalItem[key] = attributesToChange[key];
                else
                    this.logger.error("Error finding the attribute: \"" + key + "\", default value is used instead.");
            }
            else
                originalItem[key] = this.compareAndReplace(originalItem[key], attributesToChange[key]);
        }
        return originalItem;
    }
    addCompatibilitiesAndConflicts(itemClone, blackCoreID) {
        for (const item in this.db.templates.items) {
            if (item in this.mydb.items)
                continue;
            const slots = (typeof this.db.templates.items[item]._props.Slots === "undefined") ? [] : this.db.templates.items[item]._props.Slots;
            const chambers = (typeof this.db.templates.items[item]._props.Chambers === "undefined") ? [] : this.db.templates.items[item]._props.Chambers;
            const cartridges = (typeof this.db.templates.items[item]._props.Cartridges === "undefined") ? [] : this.db.templates.items[item]._props.Cartridges;
            const combined = slots.concat(chambers, cartridges);
            for (const entry of combined) {
                for (const id of entry._props.filters[0].Filter) {
                    if (id === itemClone)
                        entry._props.filters[0].Filter.push(blackCoreID);
                }
            }
            const conflictingItems = (typeof this.db.templates.items[item]._props.ConflictingItems === "undefined") ? [] : this.db.templates.items[item]._props.ConflictingItems;
            for (const conflictID of conflictingItems)
                if (conflictID === itemClone)
                    conflictingItems.push(blackCoreID);
        }
    }
    addTraderAssort(trader) {
        if (!this.db.traders[trader]?.assort || !this.mydb.traders[trader]?.assort) {
            this.logger.error(`Invalid trader assort data for trader: ${trader}`);
            return;
        }
        for (const item in this.mydb.traders[trader].assort.items) {
            this.db.traders[trader].assort.items.push(this.mydb.traders[trader].assort.items[item]);
        }
        for (const item in this.mydb.traders[trader].assort.barter_scheme) {
            this.db.traders[trader].assort.barter_scheme[item] = this.mydb.traders[trader].assort.barter_scheme[item];
        }
        for (const item in this.mydb.traders[trader].assort.loyal_level_items) {
            this.db.traders[trader].assort.loyal_level_items[item] = this.mydb.traders[trader].assort.loyal_level_items[item];
        }
    }
}
module.exports = { mod: new BlackCore() };
//# sourceMappingURL=mod.js.map