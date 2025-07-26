import { DependencyContainer } from "tsyringe";
//Spt Classes
import { IPreSptLoadModAsync } from "@spt/models/external/IPreSptLoadModAsync";
import { IPostDBLoadModAsync } from "@spt/models/external/IPostDBLoadModAsync";
import { SariaShop } from "./Saria";
//Custom Classes
import { DiContainer } from "./di/Container";

class SariaMod implements IPreSptLoadModAsync, IPostDBLoadModAsync {
    public async preSptLoadAsync(container: DependencyContainer): Promise<void> {
        DiContainer.register(container);

        await container.resolve<SariaShop>("SariaShop").preSptLoadAsync();
    }

    public async postDBLoadAsync(container: DependencyContainer): Promise<void> {
        container.resolve<SariaShop>("SariaShop").postDBLoadAsync();
    }
}

module.exports = { mod: new SariaMod() };

//      \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/
