var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject, Container } from 'inversify';
import 'reflect-metadata';
const TYPES = {
    Weapon: Symbol.for('Weapon'),
};
let Katana = class Katana {
    hit() {
        return 'cut!';
    }
};
Katana = __decorate([
    injectable()
], Katana);
let NotASharpKatana = class NotASharpKatana {
    hit() {
        return 'blunt!';
    }
};
NotASharpKatana = __decorate([
    injectable()
], NotASharpKatana);
let Ninja = class Ninja {
    constructor(weapon) {
        this._weapon = weapon;
    }
    fight() {
        return this._weapon.hit();
    }
};
Ninja = __decorate([
    injectable(),
    __param(0, inject(TYPES.Weapon)),
    __metadata("design:paramtypes", [Object])
], Ninja);
export function tryInversify() {
    const container = new Container();
    container.bind(TYPES.Weapon).to(Katana);
    const ninja1 = container.resolve(Ninja);
    console.log(ninja1.fight()); // Output: "cut!"
    // Override the binding for Weapon with NotASharpKatana
    container.rebind(TYPES.Weapon).to(NotASharpKatana);
    const ninja2 = container.resolve(Ninja);
    console.log(ninja2.fight()); // Output: "blunt!"
}
// import { injectable, inject, Container } from 'inversify';
// import 'reflect-metadata';
// interface Weapon {
//   hit(): string;
// }
// // Define the unique identifier symbols for the two weapon types
// const TYPES = {
//   Weapon: Symbol.for('Weapon'),
//   Blunt: Symbol.for('Blunt'),
// };
// @injectable()
// class Katana implements Weapon {
//   public hit() {
//     return 'cut!';
//   }
// }
// @injectable()
// class BluntKatana implements Weapon {
//   public hit() {
//     return 'blunt!';
//   }
// }
// @injectable()
// class Ninja {
//   private _weapon: Weapon;
//   public constructor(@inject(TYPES.Weapon) weapon: Weapon) {
//     this._weapon = weapon;
//   }
//   public fight() {
//     return this._weapon.hit();
//   }
// }
// // Create a new container instance
// const container = new Container();
// // Bind the Katana class to the Weapon type
// container.bind<Weapon>(TYPES.Weapon).to(Katana);
// // Bind the BluntKatana class to the Blunt type
// container.bind<Weapon>(TYPES.Blunt).to(BluntKatana);
// // Resolve the Ninja class with the bound Weapon type
// const ninja = container.resolve(Ninja);
// // Log the result of the Ninja's fight method
// console.log(ninja.fight()); // Output: "cut!"
// // Rebind the Weapon type to the BluntKatana class
// container.rebind<Weapon>(TYPES.Weapon).to(BluntKatana);
// // Resolve the Ninja class again with the rebound Weapon type
// const bluntNinja = container.resolve(Ninja);
// // Log the result of the BluntNinja's fight method
// console.log(bluntNinja.fight()); // Output: "blunt!"
