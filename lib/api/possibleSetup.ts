import { injectable, inject, Container } from 'inversify';
import 'reflect-metadata';

interface Weapon {
  hit(): string;
}

const TYPES = {
  Weapon: Symbol.for('Weapon'),
};

@injectable()
class Katana implements Weapon {
  public hit() {
    return 'cut!';
  }
}

@injectable()
class NotASharpKatana implements Weapon {
  public hit() {
    return 'blunt!';
  }
}

@injectable()
class Ninja {
  private _weapon: Weapon;

  public constructor(@inject(TYPES.Weapon) weapon: Weapon) {
    this._weapon = weapon;
  }

  public fight() {
    return this._weapon.hit();
  }
}

export function tryInversify() {
  const container = new Container();

  container.bind<Weapon>(TYPES.Weapon).to(Katana);

  const ninja1 = container.resolve(Ninja);
  console.log(ninja1.fight()); // Output: "cut!"

  // Override the binding for Weapon with NotASharpKatana
  container.rebind<Weapon>(TYPES.Weapon).to(NotASharpKatana);

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

