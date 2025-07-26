"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderUtils = void 0;
class TraderUtils {
    ref;
    constructor(ref) {
        this.ref = ref;
    }
    /**
     * Add profile picture to our trader
     * @param baseJson json file for trader (db/base.json)
     * @param preAkiModLoader mod loader class - used to get the mods file path
     * @param imageRouter image router class - used to register the trader image path so we see their image on trader page
     * @param traderImageName Filename of the trader icon to use
     */
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    registerProfileImage(baseJson, modName, traderImageName) {
        // Reference the mod "res" folder
        const imageFilepath = `./${this.ref.preSptModLoader.getModPath(modName)}res`;
        // Register a route to point to the profile picture - remember to remove the .jpg from it
        this.ref.imageRouter.addRoute(baseJson.avatar.replace(".png", ""), `${imageFilepath}/${traderImageName}`);
    }
    /**
     * Add record to trader config to set the refresh time of trader in seconds (default is 60 minutes)
     * @param traderConfig trader config to add our trader to
     * @param baseJson json file for trader (db/base.json)
     * @param refreshTimeSeconds How many sections between trader stock refresh
     */
    setTraderUpdateTime(traderConfig, 
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    baseJson, minSeconds, maxSeconds) {
        // Add refresh time in seconds to config
        const traderRefreshRecord = {
            traderId: baseJson._id,
            seconds: {
                min: minSeconds,
                max: maxSeconds,
            },
        };
        traderConfig.updateTime.push(traderRefreshRecord);
    }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    addTraderToDb(traderDetailsToAdd, assort) {
        this.ref.tables.traders[traderDetailsToAdd._id] = {
            assort: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(assort)),
            base: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(traderDetailsToAdd)),
            questassort: {
                started: {},
                success: {},
                fail: {},
            },
        };
    }
    // biome-ignore lint/suspicious/noExplicitAny: traderDetailsToAdd comes from base.json, so no type
    addTraderToDbCustomAssort(traderDetailsToAdd) {
        // Add trader to trader table, key is the traders id
        this.ref.tables.traders[traderDetailsToAdd._id] = {
            assort: this.createAssortTable(), // assorts are the 'offers' trader sells, can be a single item (e.g. carton of milk) or multiple items as a collection (e.g. a gun)
            base: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(traderDetailsToAdd)), // Deserialise/serialise creates a copy of the json and allows us to cast it as an ITraderBase
            questassort: {
                started: {},
                success: {},
                fail: {},
            }, // questassort is empty as trader has no assorts unlocked by quests
        };
    }
    /**
     * Create basic data for trader + add empty assorts table for trader
     * @param tables SPT db
     * @param jsonUtil SPT JSON utility class
     * @returns ITraderAssort
     */
    createAssortTable() {
        // Create a blank assort object, ready to have items added
        const assortTable = {
            nextResupply: 0,
            items: [],
            barter_scheme: {},
            loyal_level_items: {},
        };
        return assortTable;
    }
    /**
     * Add traders name/location/description to the locale table
     * @param baseJson json file for trader (db/base.json)
     * @param tables database tables
     * @param fullName Complete name of trader
     * @param firstName First name of trader
     * @param nickName Nickname of trader
     * @param location Location of trader (e.g. "Here in the cat shop")
     * @param description Description of trader
     */
    addTraderToLocales(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    baseJson, fullName, firstName, nickName, location, description) {
        // For each language, add locale for the new trader
        const locales = Object.values(this.ref.tables.locales.global);
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = fullName;
            locale[`${baseJson._id} FirstName`] = firstName;
            locale[`${baseJson._id} Nickname`] = nickName;
            locale[`${baseJson._id} Location`] = location;
            locale[`${baseJson._id} Description`] = description;
        }
    }
}
exports.TraderUtils = TraderUtils;
//# sourceMappingURL=Utils.js.map