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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SariaController = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const Enums_1 = require("../models/Enums");
//Json Imports
const presetArray = __importStar(require("../utils/data/presetArray.json"));
const baseJson = __importStar(require("../../db/base.json"));
let SariaController = class SariaController {
    utils;
    assortUtils;
    configManager;
    databaseService;
    constructor(utils, assortUtils, configManager, databaseService) {
        this.utils = utils;
        this.assortUtils = assortUtils;
        this.configManager = configManager;
        this.databaseService = databaseService;
    }
    createLoyalLevel1() {
        const tables = this.databaseService.getTables();
        let ammoStackCount = 60;
        let presetStackCount = 1;
        let baseStackCount = 3;
        if (this.configManager.modConfig().UnlimitedStackCount) {
            ammoStackCount = 999999;
            presetStackCount = 999999;
            baseStackCount = 999999;
        }
        else {
            ammoStackCount = this.utils.genRandomCount(0, 300);
            presetStackCount = this.utils.genRandomCount(0, 3);
            baseStackCount = this.utils.genRandomCount(0, 10);
        }
        //#region LL1 Items
        this.assortUtils
            .createSingleAssortItem("56eabcd4d2720b66698b4574")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 29999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("584924ec24597768f12ae244")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 45999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5a3501acc4a282000d72293a")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 15999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("56eabf3bd2720b75698b4569")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 44999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("59db3a1d86f77429e05b4e92")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 34999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5a718f958dc32e00094b97e7")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 30999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("628e4e576d783146b124c64d")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 87999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5fb651dc85f90547f674b6f4")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 28999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5b057b4f5acfc4771e1bd3e9")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 34999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("58d2912286f7744e27117493")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 69999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5b2388675acfc4771e1be0be")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 37999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("618b9671d14d6d5ab879c5ea")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 9999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("618b9643526131765025ab35")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 16999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("593962ca86f774068014d9af")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 19999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5937ee6486f77408994ba448")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 19999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5aafbcd986f7745e590fff23")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 379999)
            .export(tables.traders[baseJson._id], false);
        10999;
        this.assortUtils
            .createSingleAssortItem("5c6d46132e221601da357d56")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 10999)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL1 Ammo
        this.assortUtils
            .createSingleAssortItem("5e023e53d4353e3302577c4c")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 199)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("59e6906286f7746c9f75e847")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 449)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5c925fa22e221601da359b7b")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 399)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("6529302b8c26af6326029fb7")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 549)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL1 Barters
        this.assortUtils
            .createSingleAssortItem("544a11ac4bdc2d470e8b456a")
            .addStackCount(1)
            .addLoyaltyLevel(1)
            .addBarterCost(Enums_1.Currency.Roubles, 599999)
            .addBarterCost("5732ee6a24597719ae0c0281", 1)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL1 Weapon Presets
        this.assortUtils
            .createComplexAssortItem(presetArray["sig_mcx_spear_cqb"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 899)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["vector_9_default"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 599)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["vector_45_default"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 749)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["HK416 default"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 699)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["M4A1_USASOC2"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1099)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["birdeye_sr25"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1649)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["mcx_short_default"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 849)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["SR25_default"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 799)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["MP5_SilentOps"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 649)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL1 Gear Presets
        this.assortUtils
            .createComplexAssortItem(presetArray["Vest Eagle Industries MMAC Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 84999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Vest Shellback Tactical Banshee Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 114999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Vest ANA Tactical M1 Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 114999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Helmet Class Tor 2 Standart"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 57999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Helmet Diamond Age Bastion Standart"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 94999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Helmet LShZ Standart"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 47999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id], false);
        //#endregion
    }
    createLoyalLevel2() {
        const tables = this.databaseService.getTables();
        let ammoStackCount = 60;
        let presetStackCount = 1;
        let baseStackCount = 3;
        if (this.configManager.modConfig().UnlimitedStackCount) {
            ammoStackCount = 999999;
            presetStackCount = 999999;
            baseStackCount = 999999;
        }
        else {
            ammoStackCount = this.utils.genRandomCount(0, 300);
            presetStackCount = this.utils.genRandomCount(0, 3);
            baseStackCount = this.utils.genRandomCount(0, 10);
        }
        //#region LL2 Items
        this.assortUtils
            .createSingleAssortItem("5ea058e01dbce517f324b3e2")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 134999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("628bc7fb408e2b2e9c0801b1")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 229999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5c793fb92e221644f31bfb64")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 74999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("618ba27d9008e4636a67f61d")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 139999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5b3b99475acfc432ff4dcbee")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 109999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5d235bb686f77443f4331278")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 599999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("59fb042886f7746c5005a7b2")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 2999999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("59fb023c86f7746d0d4b423c")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Dollars, 19999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("619cbf7d23893217ec30b689")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 499999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5648a69d4bdc2ded0b8b457b")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 67999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5df8a42886f77412640e2e75")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 44999)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL2 Ammo
        this.assortUtils
            .createSingleAssortItem("5cc80f38e4a949001152b560")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Dollars, 8)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("58dd3ad986f77403051cba8f")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 449)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("54527ac44bdc2d36668b4567")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 599)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5efb0cabfb3e451d70735af5")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 599)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5efb0da7a29a85116f6ea05f")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(2)
            .addMoneyCost(Enums_1.Currency.Roubles, 599)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL2 Barters
        this.assortUtils
            .createSingleAssortItem("5c94bbff86f7747ee735c08f")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(2)
            .addBarterCost("5c0e531d86f7747fa23f4d42", 1)
            .addBarterCost("5ed51652f6c34d2cc26336a1", 1)
            .addBarterCost("5c0e530286f7747fa1419862", 1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5857a8b324597729ab0a0e7d")
            .addStackCount(1)
            .addLoyaltyLevel(2)
            .addBarterCost(Enums_1.Currency.Roubles, 999999)
            .addBarterCost("544a11ac4bdc2d470e8b456a", 1)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL2 Weapon Presets
        this.assortUtils
            .createComplexAssortItem(presetArray["9A91_tactical"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1099)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["VSK94_tactical"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1199)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["SA-58_OSW"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1099)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["tx-15 default"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 799)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["knight_mk47"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1099)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["MP7_DEVGRU"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 899)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL2 Gear Presets
        this.assortUtils
            .createComplexAssortItem(presetArray["Body armor Korund VM Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 149999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Body armor HighCom Trooper Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 179999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Helmet MSA Gallet TC 800 Standart"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 64999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Helmet HighCom Striker ACHHC IIIA Black Standart"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 78999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id], false);
        //#endregion
    }
    createLoyalLevel3() {
        const tables = this.databaseService.getTables();
        let ammoStackCount = 60;
        let presetStackCount = 1;
        let baseStackCount = 3;
        if (this.configManager.modConfig().UnlimitedStackCount) {
            ammoStackCount = 999999;
            presetStackCount = 999999;
            baseStackCount = 999999;
        }
        else {
            ammoStackCount = this.utils.genRandomCount(0, 300);
            presetStackCount = this.utils.genRandomCount(0, 3);
            baseStackCount = this.utils.genRandomCount(0, 10);
        }
        //#region LL3 Items
        this.assortUtils
            .createSingleAssortItem("59bfe68886f7746004266202")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(3)
            .addMoneyCost(Enums_1.Currency.Roubles, 89999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5d00ec68d7ad1a04a067e5be")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(3)
            .addMoneyCost(Enums_1.Currency.Roubles, 58999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5c0126f40db834002a125382")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(3)
            .addMoneyCost(Enums_1.Currency.Roubles, 3299999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5c0e66e2d174af02a96252f4")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(3)
            .addMoneyCost(Enums_1.Currency.Roubles, 99999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("628baf0b967de16aab5a4f36")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(3)
            .addMoneyCost(Enums_1.Currency.Roubles, 89999)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL3 Ammo
        this.assortUtils
            .createSingleAssortItem("5a608bf24f39f98ffc77720e")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(3)
            .addMoneyCost(Enums_1.Currency.Roubles, 1299)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("59e0d99486f7744a32234762")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(3)
            .addMoneyCost(Enums_1.Currency.Roubles, 1799)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("59e690b686f7746c9f75e848")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(3)
            .addMoneyCost(Enums_1.Currency.Roubles, 1199)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("6529243824cbe3c74a05e5c1")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(3)
            .addMoneyCost(Enums_1.Currency.Roubles, 799)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL3 Barters
        this.assortUtils
            .createSingleAssortItem("5b6d9ce188a4501afc1b2b25")
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .addBarterCost(Enums_1.Currency.Dollars, 19999)
            .addBarterCost("59fb023c86f7746d0d4b423c", 1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5857a8bc2459772bad15db29")
            .addStackCount(1)
            .addLoyaltyLevel(3)
            .addBarterCost(Enums_1.Currency.Roubles, 1499999)
            .addBarterCost("5857a8b324597729ab0a0e7d", 1)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("59db794186f77448bc595262")
            .addStackCount(1)
            .addLoyaltyLevel(3)
            .addBarterCost(Enums_1.Currency.Roubles, 1999999)
            .addBarterCost("5857a8bc2459772bad15db29", 1)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL3 Weapon Presets
        this.assortUtils
            .createComplexAssortItem(presetArray["sig_mcx_spear_default"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1699)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["p90 SBRT"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1399)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["SCARH MK17 CQC"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1099)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["G28 Patrol"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1459)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["M1A 2018 new year"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["SCARL MK16 CW"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 949)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["rpd_short"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1699)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL3 Gear Presets
        this.assortUtils
            .createComplexAssortItem(presetArray["Vest FirstSpear Strandhogg Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 189999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Body armor LBT 6094A Slick Plate Carrier Black Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 249999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Helmet Ops Core Fast MT Black Standart"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 99999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Helmet Ops Core Fast MT Sand Standart"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 99999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id], false);
        //#endregion
    }
    createLoyalLevel4() {
        const tables = this.databaseService.getTables();
        let ammoStackCount = 60;
        let presetStackCount = 1;
        let baseStackCount = 3;
        if (this.configManager.modConfig().UnlimitedStackCount) {
            ammoStackCount = 999999;
            presetStackCount = 999999;
            baseStackCount = 999999;
        }
        else {
            ammoStackCount = this.utils.genRandomCount(0, 300);
            presetStackCount = this.utils.genRandomCount(0, 3);
            baseStackCount = this.utils.genRandomCount(0, 10);
        }
        //#region LL4 Items
        this.assortUtils
            .createSingleAssortItem("59c1383d86f774290a37e0ca")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 47999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5a1ead28fcdbcb001912fa9f")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 179999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5a1eaa87fcdbcb001865f75e")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 499999)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL4 Ammo
        this.assortUtils
            .createSingleAssortItem("5efb0c1bd79ff02a1f5e68d9")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 1899)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5fc382a9d724d907e2077dab")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 5999)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("601949593ae8f707c4608daa")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 1799)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5fc23426900b1d5091531e15")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 19999)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL4 Barters
        this.assortUtils
            .createSingleAssortItem("5c0a840b86f7742ffa4f2482")
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .addBarterCost(Enums_1.Currency.Dollars, 29999)
            .addBarterCost("59fb042886f7746c5005a7b2", 2)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5c093ca986f7740a1867ab12")
            .addStackCount(1)
            .addLoyaltyLevel(4)
            .addBarterCost(Enums_1.Currency.Roubles, 2999999)
            .addBarterCost("59db794186f77448bc595262", 1)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL4 Weapon Presets
        this.assortUtils
            .createComplexAssortItem(presetArray["mjolnir_default"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 309999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["birdeye_rsass"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 349999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["RSASS"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 209999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["akm_kreb_thermal_silenced"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 699999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        //#endregion
        //#region LL4 Gear Presets
        this.assortUtils
            .createComplexAssortItem(presetArray["Helmet Maska 1 Sha Killa Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 129999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Helmet Crye Precision AirFrame Standart"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 89999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Vest Tasmanian Tiger SK Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 229999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Body armor 6B13 M Killa Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 279999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Vest Ars Arma A18 Skanda Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 229999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["Body armor BNTI Zhuk 6a Standard"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 304999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id], false);
        //#endregion
    }
};
exports.SariaController = SariaController;
exports.SariaController = SariaController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("Utils")),
    __param(1, (0, tsyringe_1.inject)("AssortUtils")),
    __param(2, (0, tsyringe_1.inject)("ConfigManager")),
    __param(3, (0, tsyringe_1.inject)("DatabaseService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SariaController);
//# sourceMappingURL=SariaController.js.map