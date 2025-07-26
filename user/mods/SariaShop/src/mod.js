"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Custom Classes
const Container_1 = require("./di/Container");
class SariaMod {
    async preSptLoadAsync(container) {
        Container_1.DiContainer.register(container);
        await container.resolve("SariaShop").preSptLoadAsync();
    }
    async postDBLoadAsync(container) {
        container.resolve("SariaShop").postDBLoadAsync();
    }
}
module.exports = { mod: new SariaMod() };
//      \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/
//# sourceMappingURL=mod.js.map