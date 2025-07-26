import { ITraderAssort, ITraderBase } from "@spt/models/eft/common/tables/ITrader";
import { ITraderConfig, UpdateTime } from "@spt/models/spt/config/ITraderConfig";
import { References } from "../Refs/References";

export class TraderUtils {
    constructor(public ref: References) {}
    /**
     * Add profile picture to our trader
     * @param baseJson json file for trader (db/base.json)
     * @param preAkiModLoader mod loader class - used to get the mods file path
     * @param imageRouter image router class - used to register the trader image path so we see their image on trader page
     * @param traderImageName Filename of the trader icon to use
     */

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    public registerProfileImage(baseJson: any, modName: string, traderImageName: string): void {
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
    public setTraderUpdateTime(
        traderConfig: ITraderConfig,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        baseJson: any,
        minSeconds: number,
        maxSeconds: number,
    ): void {
        // Add refresh time in seconds to config
        const traderRefreshRecord: UpdateTime = {
            traderId: baseJson._id,
            seconds: {
                min: minSeconds,
                max: maxSeconds,
            },
        };
        traderConfig.updateTime.push(traderRefreshRecord);
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    public addTraderToDb(traderDetailsToAdd: any, assort): void {
        this.ref.tables.traders[traderDetailsToAdd._id] = {
            assort: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(assort)) as ITraderAssort,
            base: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(traderDetailsToAdd)) as ITraderBase,
            questassort: {
                started: {},
                success: {},
                fail: {},
            },
        };
    }

    // biome-ignore lint/suspicious/noExplicitAny: traderDetailsToAdd comes from base.json, so no type
    public addTraderToDbCustomAssort(traderDetailsToAdd: any): void {
        // Add trader to trader table, key is the traders id
        this.ref.tables.traders[traderDetailsToAdd._id] = {
            assort: this.createAssortTable(), // assorts are the 'offers' trader sells, can be a single item (e.g. carton of milk) or multiple items as a collection (e.g. a gun)
            base: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(traderDetailsToAdd)) as ITraderBase, // Deserialise/serialise creates a copy of the json and allows us to cast it as an ITraderBase
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
    private createAssortTable(): ITraderAssort {
        // Create a blank assort object, ready to have items added
        const assortTable: ITraderAssort = {
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
    public addTraderToLocales(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        baseJson: any,
        fullName: string,
        firstName: string,
        nickName: string,
        location: string,
        description: string,
    ) {
        // For each language, add locale for the new trader
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
