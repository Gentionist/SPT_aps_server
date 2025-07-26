"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiContainer = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
//Custom Classes
const SariaController_1 = require("../controllers/SariaController");
const ConfigManager_1 = require("../managers/ConfigManager");
const TraderManager_1 = require("../managers/TraderManager");
const AssortUtils_1 = require("../utils/AssortUtils");
const Logger_1 = require("../utils/Logger");
const TraderUtils_1 = require("../utils/TraderUtils");
const Utils_1 = require("../utils/Utils");
const Saria_1 = require("../Saria");
class DiContainer {
    static register(container) {
        container.register("SariaController", SariaController_1.SariaController, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("ConfigManager", ConfigManager_1.ConfigManager, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("TraderManager", TraderManager_1.TraderManager, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("AssortUtils", AssortUtils_1.AssortUtils, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("TraderUtils", TraderUtils_1.TraderUtils, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("SariaShop", Saria_1.SariaShop, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("ROLogger", Logger_1.ROLogger, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("Utils", Utils_1.Utils, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
    }
}
exports.DiContainer = DiContainer;
//# sourceMappingURL=Container.js.map