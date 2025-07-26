"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const baseJson = __importStar(require("../db/base.json"));
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
const assortJson = __importStar(require("../db/assort.json"));
const questassortJson = __importStar(require("../db/questassort.json"));
const path = __importStar(require("path"));
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const fs = require('fs');
const modPath = path.normalize(path.join(__dirname, '..'));
class Legs {
    mod;
    logger;
    configServer;
    ragfairConfig;
    constructor() {
        this.mod = "house-legsthetrader"; // Set name of mod so we can log it to console later
    }
    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param container Dependency container
     */
    preSptLoad(container) {
        this.logger = container.resolve("WinstonLogger");
        this.logger.debug(`[${this.mod}] preSpt Loading... `);
        const preSptModLoader = container.resolve("PreSptModLoader");
        const imageRouter = container.resolve("ImageRouter");
        const configServer = container.resolve("ConfigServer");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        this.registerProfileImage(preSptModLoader, imageRouter);
        this.setupTraderUpdateTime(traderConfig);
        // Add trader to trader enum
        Traders_1.Traders["6748edbcb936f1098d4303e4"] = "6748edbcb936f1098d4303e4";
        this.logger.debug(`[${this.mod}] preSpt Loaded`);
    }
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     * @param container Dependency container
     */
    postDBLoad(container) {
        this.logger.debug(`[${this.mod}] postDb Loading... `);
        this.configServer = container.resolve("ConfigServer");
        this.ragfairConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const jsonUtil = container.resolve("JsonUtil");
        const imageRouter = container.resolve("ImageRouter");
        const tables = databaseServer.getTables();
        const customItem = container.resolve("CustomItemService");
        // Add new trader to the trader dictionary in DatabaseServer
        this.addTraderToDb(baseJson, tables, jsonUtil);
        this.addTraderToLocales(tables, baseJson.name, "Legs", baseJson.nickname, baseJson.location, "Names legs, dont ask. Anyways I got lowers for ya.");
        // Add item purchase threshold value (what % durability does trader stop buying items at)
        //        traderConfig.durabilityPurchaseThreshhold[baseJson._id] = 60;
        this.ragfairConfig.traders[baseJson._id] = true;
        // this.importQuests(tables)
        this.importQuestLocales(tables);
        this.routeQuestImages(imageRouter);
        //#region CustomsItem ******************************************************************
        const bearHat = {
            itemTplToClone: "5b40e61f5acfc4001a599bec",
            overrideProperties: {
                Name: "Bear 5 Panel",
                ShortName: "Bear Hat",
                Description: "5 Panel hat used by BEAR PMCs",
                Weight: .2,
                Prefab: {
                    "path": "bear_hat.bundle",
                    "rcid": ""
                },
                Width: 1,
                Height: 1
            },
            parentId: "5a341c4086f77401f2541505",
            newId: "6765d79148caecc924f38301",
            fleaPriceRoubles: 100,
            handbookPriceRoubles: 100,
            handbookParentId: "5b47574386f77428ca22b330",
            locales: {
                en: {
                    name: "Bear 5 Panel",
                    shortName: "Bear Hat",
                    description: "5 Panel hat used by BEAR PMCs"
                }
            }
        };
        customItem.createItemFromClone(bearHat);
        const usecHat = {
            itemTplToClone: "5b40e61f5acfc4001a599bec",
            overrideProperties: {
                Name: "USEC 5 Panel",
                ShortName: "USEC Hat",
                Description: "5 Panel hat used by USEC PMCs",
                Weight: .2,
                Prefab: {
                    "path": "usec_hat.bundle",
                    "rcid": ""
                },
                Width: 1,
                Height: 1
            },
            parentId: "5a341c4086f77401f2541505",
            newId: "679d31ae779c471efb063dba",
            fleaPriceRoubles: 100,
            handbookPriceRoubles: 100,
            handbookParentId: "5b47574386f77428ca22b330",
            locales: {
                en: {
                    name: "USEC 5 Panel",
                    shortName: "USEC Hat",
                    description: "5 Panel hat used by USEC PMCs"
                }
            }
        };
        customItem.createItemFromClone(usecHat);
        const trustyPack = {
            itemTplToClone: "66b5f247af44ca0014063c02",
            overrideProperties: {
                Name: "Legs' Trusty Backpack",
                ShortName: "Trusty Backpack",
                Description: "Leg's trusty backpack he used to survive tarkov in the early days during the contract wars.",
                Weight: .78,
                Prefab: {
                    "path": "leather_backpack.bundle",
                    "rcid": ""
                },
                Width: 4,
                Height: 4
            },
            parentId: "5448e53e4bdc2d60728b4567",
            newId: "679d31db3d176182a2adfd86",
            fleaPriceRoubles: 20000,
            handbookPriceRoubles: 20000,
            handbookParentId: "5b5f6f6c86f774093f2ecf0b",
            locales: {
                en: {
                    name: "Legs' Trusty Backpack ",
                    shortName: "Trusty Backpack",
                    description: "Leg's trusty backpack he used to survive tarkov in the early days during the contract wars."
                }
            }
        };
        customItem.createItemFromClone(trustyPack);
        const usecBeanie = {
            itemTplToClone: "5b40e61f5acfc4001a599bec",
            overrideProperties: {
                Name: "USEC Beanie",
                ShortName: "USEC Beanie ",
                Description: "USEC Beanie worn by USEC PMCs during the winter.",
                Weight: .2,
                Prefab: {
                    "path": "usec_beanie.bundle",
                    "rcid": ""
                },
                Width: 1,
                Height: 1
            },
            parentId: "5a341c4086f77401f2541505",
            newId: "679de71c3b47fe7f7537f7ff",
            fleaPriceRoubles: 100,
            handbookPriceRoubles: 100,
            handbookParentId: "5b47574386f77428ca22b330",
            locales: {
                en: {
                    name: "USEC Beanie",
                    shortName: "USEC Beanie",
                    description: "USEC Beanie worn by USEC PMCs during the winter."
                }
            }
        };
        customItem.createItemFromClone(usecBeanie);
        const bearBeanie = {
            itemTplToClone: "5b40e61f5acfc4001a599bec",
            overrideProperties: {
                Name: "BEAR Beanie",
                ShortName: "BEAR Beanie ",
                Description: "BEAR Beanie worn by BEAR PMCs during the winter.",
                Weight: .2,
                Prefab: {
                    "path": "bear_beanie.bundle",
                    "rcid": ""
                },
                Width: 1,
                Height: 1
            },
            parentId: "5a341c4086f77401f2541505",
            newId: "67e343112c5ed0143e3c74eb",
            fleaPriceRoubles: 100,
            handbookPriceRoubles: 100,
            handbookParentId: "5b47574386f77428ca22b330",
            locales: {
                en: {
                    name: "BEAR Beanie",
                    shortName: "BEAR Beanie ",
                    description: "BEAR Beanie worn by BEAR PMCs during the winter."
                }
            }
        };
        customItem.createItemFromClone(bearBeanie);
        // #endregion
        this.logger.debug(`[${this.mod}] postDb Loaded`);
        this.logger.log("Get Building with Legs!", LogTextColor_1.LogTextColor.BLUE);
    }
    /**
     * Add profile picture to our trader
     * @param preSptModLoader mod loader class - used to get the mods file path
     * @param imageRouter image router class - used to register the trader image path so we see their image on trader page
     */
    registerProfileImage(preSptModLoader, imageRouter) {
        // Reference the mod "res" folder
        const imageFilepath = `./${preSptModLoader.getModPath(this.mod)}res`;
        // Register a route to point to the profile picture
        imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/Legs.jpg`);
    }
    /**
     * Add record to trader config to set the refresh time of trader in seconds (default is 60 minutes)
     * @param traderConfig trader config to add our trader to
     */
    setupTraderUpdateTime(traderConfig) {
        // Add refresh time in seconds to config
        const traderRefreshRecord = { traderId: baseJson._id, seconds: { min: 1000, max: 6000 } };
        traderConfig.updateTime.push(traderRefreshRecord);
    }
    /**
     * Add our new trader to the database
     * @param traderDetailsToAdd trader details
     * @param tables database
     * @param jsonUtil json utility class
     */
    // rome-ignore lint/suspicious/noExplicitAny: traderDetailsToAdd comes from base.json, so no type
    addTraderToDb(traderDetailsToAdd, tables, jsonUtil) {
        // Add trader to trader table, key is the traders id
        tables.traders[traderDetailsToAdd._id] = {
            assort: jsonUtil.deserialize(jsonUtil.serialize(assortJson)), // assorts are the 'offers' trader sells, can be a single item (e.g. carton of milk) or multiple items as a collection (e.g. a gun)
            base: jsonUtil.deserialize(jsonUtil.serialize(traderDetailsToAdd)),
            questassort: jsonUtil.deserialize(jsonUtil.serialize(questassortJson))
        };
    }
    /**
     * Add traders name/location/description to the locale table
     * @param tables database tables
     * @param fullName fullname of trader
     * @param firstName first name of trader
     * @param nickName nickname of trader
     * @param location location of trader
     * @param description description of trader
     */
    addTraderToLocales(tables, fullName, firstName, nickName, location, description) {
        // For each language, add locale for the new trader
        const locales = Object.values(tables.locales.global);
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = fullName;
            locale[`${baseJson._id} FirstName`] = firstName;
            locale[`${baseJson._id} Nickname`] = nickName;
            locale[`${baseJson._id} Location`] = location;
            locale[`${baseJson._id} Description`] = description;
        }
    }
    addItemToLocales(tables, itemTpl, name, shortName, Description) {
        // For each language, add locale for the new trader
        const locales = Object.values(tables.locales.global);
        for (const locale of locales) {
            locale[`${itemTpl} Name`] = name;
            locale[`${itemTpl} ShortName`] = shortName;
            locale[`${itemTpl} Description`] = Description;
        }
    }
    loadFiles(dirPath, extName, cb) {
        if (!fs.existsSync(dirPath))
            return;
        const dir = fs.readdirSync(dirPath, { withFileTypes: true });
        dir.forEach(item => {
            const itemPath = path.normalize(`${dirPath}/${item.name}`);
            if (item.isDirectory())
                this.loadFiles(itemPath, extName, cb);
            else if (extName.includes(path.extname(item.name)))
                cb(itemPath);
        });
    }
    /*()
    public importQuests(tables) {
        let questCount = 0

        this.loadFiles(`${modPath}/db/quests/`, [".json"], function (filePath) {
            const item = require(filePath)
            if (Object.keys(item).length < 1) return
            for (const quest in item) {
                tables.templates.quests[quest] = item[quest]
                questCount++
            }
        })
    }
*/
    importQuestLocales(tables) {
        const serverLocales = ['ch', 'cz', 'en', 'es', 'es-mx', 'fr', 'ge', 'hu', 'it', 'jp', 'pl', 'po', 'ru', 'sk', 'tu'];
        const addedLocales = {};
        for (const locale of serverLocales) {
            this.loadFiles(`${modPath}/db/locales/${locale}`, [".json"], function (filePath) {
                const localeFile = require(filePath);
                if (Object.keys(localeFile).length < 1)
                    return;
                for (const currentItem in localeFile) {
                    tables.locales.global[locale][currentItem] = localeFile[currentItem];
                    if (!Object.keys(addedLocales).includes(locale))
                        addedLocales[locale] = {};
                    addedLocales[locale][currentItem] = localeFile[currentItem];
                }
            });
        }
        for (const locale of serverLocales) {
            if (locale == "en")
                continue;
            for (const englishItem in addedLocales["en"]) {
                if (locale in addedLocales) {
                    if (englishItem in addedLocales[locale])
                        continue;
                }
                if (tables.locales.global[locale] != undefined)
                    tables.locales.global[locale][englishItem] = addedLocales["en"][englishItem];
            }
        }
    }
    routeQuestImages(imageRouter) {
        let imageCount = 0;
        this.loadFiles(`${modPath}/res/quests/`, [".png", ".jpg"], function (filePath) {
            imageRouter.addRoute(`/files/quest/icon/${path.basename(filePath, path.extname(filePath))}`, filePath);
            imageCount++;
        });
    }
}
module.exports = { mod: new Legs() };
//# sourceMappingURL=mod.js.map