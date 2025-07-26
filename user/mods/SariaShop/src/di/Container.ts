import { DependencyContainer, Lifecycle } from "tsyringe";
//Custom Classes
import { SariaController } from "../controllers/SariaController";
import { ConfigManager } from "../managers/ConfigManager";
import { TraderManager } from "../managers/TraderManager";
import { AssortUtils } from "../utils/AssortUtils";
import { ROLogger } from "../utils/Logger";
import { TraderUtils } from "../utils/TraderUtils";
import { Utils } from "../utils/Utils";
import { SariaShop } from "../Saria";

export class DiContainer {
    public static register(container: DependencyContainer): void {
        container.register<SariaController>("SariaController", SariaController, {
            lifecycle: Lifecycle.Singleton,
        });
        container.register<ConfigManager>("ConfigManager", ConfigManager, {
            lifecycle: Lifecycle.Singleton,
        });
        container.register<TraderManager>("TraderManager", TraderManager, {
            lifecycle: Lifecycle.Singleton,
        });
        container.register<AssortUtils>("AssortUtils", AssortUtils, {
            lifecycle: Lifecycle.Singleton,
        });
        container.register<TraderUtils>("TraderUtils", TraderUtils, {
            lifecycle: Lifecycle.Singleton,
        });
        container.register<SariaShop>("SariaShop", SariaShop, {
            lifecycle: Lifecycle.Singleton,
        });
        container.register<ROLogger>("ROLogger", ROLogger, {
            lifecycle: Lifecycle.Singleton,
        });
        container.register<Utils>("Utils", Utils, {
            lifecycle: Lifecycle.Singleton,
        });
    }
}
