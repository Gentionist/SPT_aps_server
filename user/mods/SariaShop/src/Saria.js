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
exports.SariaShop = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
//Json Imports
const baseJson = __importStar(require("../db/base.json"));
let SariaShop = class SariaShop {
    logger;
    traderUtils;
    traderManager;
    configManager;
    configServer;
    constructor(logger, traderUtils, traderManager, configManager, configServer) {
        this.logger = logger;
        this.traderUtils = traderUtils;
        this.traderManager = traderManager;
        this.configManager = configManager;
        this.configServer = configServer;
    }
    async preSptLoadAsync() {
        const ragfair = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        this.traderUtils.registerProfileImage();
        this.traderUtils.setupTraderUpdateTime("66f4db5ca4958508883d700c");
        Traders_1.Traders["66f4db5ca4958508883d700c"] = "66f4db5ca4958508883d700c";
        ragfair.traders[baseJson._id] = true;
    }
    async postDBLoadAsync() {
        //Random message on server on startup
        const messageArray = [
            "found some rare goods out there",
            "there are much less bears to worry about now",
            "returning to base",
            "that's how you clean up a battlefield",
            "good thing I brought extra ammo",
        ];
        const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
        //Check For LL Config Option
        if (this.configManager.modConfig().RemoveMoneyLLRequirements) {
            baseJson.loyaltyLevels.forEach((level) => {
                level.minSalesSum = 0;
            });
        }
        if (this.configManager.modConfig().RemoveLevelLLRequirements) {
            baseJson.loyaltyLevels.forEach((level) => {
                level.minLevel = 1;
            });
        }
        //Add Saria to the game
        this.traderManager.pushExports();
        //Add in Sarias assort
        this.traderManager.createAssort();
        this.logger.log(`Mission accomplished, ${randomMessage}.`, LogTextColor_1.LogTextColor.CYAN);
    }
};
exports.SariaShop = SariaShop;
exports.SariaShop = SariaShop = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ROLogger")),
    __param(1, (0, tsyringe_1.inject)("TraderUtils")),
    __param(2, (0, tsyringe_1.inject)("TraderManager")),
    __param(3, (0, tsyringe_1.inject)("ConfigManager")),
    __param(4, (0, tsyringe_1.inject)("ConfigServer")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], SariaShop);
//# sourceMappingURL=Saria.js.map