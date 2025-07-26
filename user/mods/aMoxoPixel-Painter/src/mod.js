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
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
const CustomItemsManager_1 = require("./CustomItemsManager");
const configJson = __importStar(require("../config.json"));
const baseJson = __importStar(require("../db/base.json"));
const assortJson = __importStar(require("../db/assort.json"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const modPath = path.normalize(path.join(__dirname, ".."));
class PainterTrader {
    mod;
    logger;
    configServer;
    ragfairConfig;
    constructor() {
        this.mod = "aMoxoPixel-Painter";
    }
    preSptLoad(container) {
        this.logger = container.resolve("WinstonLogger");
        const PreSptModLoader = container.resolve("PreSptModLoader");
        const imageRouter = container.resolve("ImageRouter");
        const configServer = container.resolve("ConfigServer");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const questConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.QUEST);
        if (!traderConfig.moddedTraders) {
            traderConfig.moddedTraders = { clothingService: [] };
        }
        if (configJson.enableRepeatableQuests) {
            const PainterRepeatQuests = {
                traderId: "668aaff35fd574b6dcc4a686",
                name: "painter",
                questTypes: ["Completion", "Exploration", "Elimination"],
                rewardBaseWhitelist: [
                    "543be6564bdc2df4348b4568",
                    "5448e5284bdc2dcb718b4567",
                    "5485a8684bdc2da71d8b4567",
                    "57864a3d24597754843f8721",
                    "55818af64bdc2d5b648b4570",
                    "57864e4c24597754843f8723",
                    "57864a66245977548f04a81f",
                    "57864ee62459775490116fc1",
                    "590c745b86f7743cc433c5f2"
                ],
                rewardCanBeWeapon: true,
                weaponRewardChancePercent: 20
            };
            questConfig.repeatableQuests[0].traderWhitelist.push(PainterRepeatQuests); // Daily quests
            questConfig.repeatableQuests[1].traderWhitelist.push(PainterRepeatQuests); // Weekly quests
            this.logger.info("Painter repeatable quests added to quest config");
        }
        this.registerProfileImage(PreSptModLoader, imageRouter);
        this.setupTraderUpdateTime(traderConfig);
        this.setupTraderServices(traderConfig);
        Traders_1.Traders["668aaff35fd574b6dcc4a686"] = "668aaff35fd574b6dcc4a686";
    }
    postDBLoad(container) {
        this.configServer = container.resolve("ConfigServer");
        this.ragfairConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        const configServer = container.resolve("ConfigServer");
        const imageRouter = container.resolve("ImageRouter");
        const jsonUtil = container.resolve("JsonUtil");
        const databaseServer = container.resolve("DatabaseServer");
        const databaseService = container.resolve("DatabaseService");
        const customItem = container.resolve("CustomItemService");
        const inventoryConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.INVENTORY);
        const tables = databaseService.getTables();
        if (configJson.enableRepeatableQuests) {
            const repeatableQuests = databaseServer.getTables().templates.repeatableQuests;
            const rqLocales = databaseServer.getTables().locales.global.en;
            if (repeatableQuests.templates.Elimination) {
                repeatableQuests.templates.Elimination.successMessageText = "A damn beast you are, hehe. Good work, here's your share.";
                repeatableQuests.templates.Elimination.description = "I have a mission for you. I need you to eliminate some trash from Tarkov's streets. You up for it?";
            }
            if (repeatableQuests.templates.Completion) {
                repeatableQuests.templates.Completion.successMessageText = "There you are! You got everything? Good stuff.";
                repeatableQuests.templates.Completion.description = "I have a mission for you. I need you to gather some items for me. You up for it?";
            }
            if (repeatableQuests.templates.Exploration) {
                repeatableQuests.templates.Exploration.successMessageText = "Marvelous, young man. Thank you for some fine work.";
                repeatableQuests.templates.Exploration.description = "Ah, mercenary, do you want to do a good deed? My clients are asking to ensure a safe area to conduct a specific secret operation. I would like to appoint you for this, as you are the most competent of the local workers. You will have to survey the area and report back to me. Good luck.";
            }
            // Update localization files
            rqLocales["616041eb031af660100c9967 successMessageText 668aaff35fd574b6dcc4a686 0"] = "Marvelous, young man. Thank you for the work.";
            rqLocales["616041eb031af660100c9967 description 668aaff35fd574b6dcc4a686 0"] = "Ah, mercenary, do you want to do a good deed? My clients are asking to ensure a safe area to conduct a specific secret operation. I would like to appoint you for this, as you are the most competent of the local workers. You will have to survey the area and report back to me. Good luck.";
            rqLocales["61604635c725987e815b1a46 successMessageText 668aaff35fd574b6dcc4a686 0"] = "There you are! You got everything? Good stuff.";
            rqLocales["61604635c725987e815b1a46 description 668aaff35fd574b6dcc4a686 0"] = "I have a mission for you. I need you to gather some items for me. You up for it?";
            rqLocales["616052ea3054fc0e2c24ce6e successMessageText 668aaff35fd574b6dcc4a686 0"] = "A damn beast you are, hehe. Good work, here's your share.";
            rqLocales["616052ea3054fc0e2c24ce6e description 668aaff35fd574b6dcc4a686 0"] = "I have a mission for you. I need you to eliminate some trash from Tarkov's streets. You up for it?";
            this.logger.info("Painter repeatable quest messages added to localization files");
        }
        this.addTraderToDb(baseJson, tables, jsonUtil);
        this.addTraderToLocales(tables, baseJson.name, "Ivan Samoylov", baseJson.nickname, baseJson.location, "Ivan Samoylov is a master craftsman renowned for his exceptional skill in creating exquisite weapon cosmetics. With an innate talent for blending artistry and functionality, he transforms ordinary weapons into mesmerizing works of art.");
        this.ragfairConfig.traders[baseJson._id] = true;
        this.importQuests(tables);
        this.importQuestLocales(tables);
        this.routeQuestImages(imageRouter);
        // Create all custom items using the CustomItemsManager
        const customItemsManager = new CustomItemsManager_1.CustomItemsManager(this.logger);
        customItemsManager.createCustomItems(customItem, configServer, tables, inventoryConfig, configJson.enableLootBoxes);
    }
    registerProfileImage(preSptModLoader, imageRouter) {
        const imageFilepath = `./${preSptModLoader.getModPath(this.mod)}res`;
        imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/painter.jpg`);
    }
    setupTraderUpdateTime(traderConfig) {
        const traderRefreshRecord = { traderId: baseJson._id, seconds: { min: 2000, max: 6600 } };
        traderConfig.updateTime.push(traderRefreshRecord);
    }
    setupTraderServices(traderConfig) {
        const traderId = baseJson._id;
        if (!traderConfig.moddedTraders) {
            traderConfig.moddedTraders = { clothingService: [] };
        }
        traderConfig.moddedTraders.clothingService.push(traderId);
    }
    addTraderToDb(traderDetailsToAdd, tables, jsonUtil) {
        tables.traders[traderDetailsToAdd._id] = {
            assort: jsonUtil.deserialize(jsonUtil.serialize(assortJson)),
            base: jsonUtil.deserialize(jsonUtil.serialize(traderDetailsToAdd)),
            questassort: {
                started: {},
                success: {
                    "672e2804a0529208b4e10e18": "668aad3c3ff8f5b258e3a65b",
                    "672e284a363b798192b802af": "668c18eb12542b3c3ff6e20f",
                    "672e289bb4096716fcb918a7": "668c18eb12542b3c3ff6e20f"
                },
                fail: {}
            }
        };
    }
    addTraderToLocales(tables, fullName, firstName, nickName, location, description) {
        const locales = Object.values(tables.locales.global);
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = fullName;
            locale[`${baseJson._id} FirstName`] = firstName;
            locale[`${baseJson._id} Nickname`] = nickName;
            locale[`${baseJson._id} Location`] = location;
            locale[`${baseJson._id} Description`] = description;
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
    importQuests(tables) {
        this.loadFiles(`${modPath}/db/quests/`, [".json"], function (filePath) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const item = require(filePath);
            if (Object.keys(item).length < 1)
                return;
            for (const quest in item) {
                tables.templates.quests[quest] = item[quest];
            }
        });
    }
    importQuestLocales(tables) {
        const serverLocales = ["ch", "cz", "en", "es", "es-mx", "fr", "ge", "hu", "it", "jp", "pl", "po", "ru", "sk", "tu"];
        const addedLocales = {};
        for (const locale of serverLocales) {
            this.loadFiles(`${modPath}/db/locales/${locale}`, [".json"], function (filePath) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
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
        this.loadFiles(`${modPath}/res/quests/`, [".png", ".jpg"], function (filePath) {
            imageRouter.addRoute(`/files/quest/icon/${path.basename(filePath, path.extname(filePath))}`, filePath);
        });
    }
}
module.exports = { mod: new PainterTrader() };
//# sourceMappingURL=mod.js.map