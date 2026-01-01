
class Wizard {
  #health;
  #mana;

  constructor(name, startingHealth, startingMana) {
    this.name = name;
    this.#health = startingHealth;
    this.#mana = startingMana;
    this.maxHealth = startingHealth;
    this.maxMana = startingMana;
  }

  isAlive() {
    return this.#health > 0;
  }

  getStatus() {
    // Safe snapshot (cannot modify internal state)
    return {
      name: this.name,
      health: this.#health,
      mana: this.#mana,
    };
  }

  receiveDamage(amount) {
    if (amount <= 0) return;

    this.#health -= amount;
    if (this.#health < 0) {
      this.#health = 0;
    }
  }

  spendMana(cost) {
    if (cost <= 0) return false;
    if (this.#mana < cost) return false;

    this.#mana -= cost;
    return true;
  }

  // Optional helper for IceWizard
  drainMana(amount) {
    if (amount <= 0) return;

    this.#mana -= amount;
    if (this.#mana < 0) {
      this.#mana = 0;
    }
  }

  castSpell(opponent) {
    console.log(`${this.name} casts a very weak generic spell...`);
  }
}
class FireWizard extends Wizard {
  castSpell(opponent) {
    if (!this.isAlive()) {
      console.log(`${this.name} is defeated and cannot act.`);
      return;
    }

    const manaCost = 20;
    const damage = 30;

    if (!this.spendMana(manaCost)) {
      console.log(`${this.name} tried to cast fire spell but lacks mana.`);
      return;
    }

    opponent.receiveDamage(damage);
    console.log(
      `${this.name} casts FIREBALL on ${opponent.name} dealing ${damage} damage!`
    );
  }
}

class IceWizard extends Wizard {
  castSpell(opponent) {
    if (!this.isAlive()) {
      console.log(`${this.name} is defeated and cannot act.`);
      return;
    }

    const manaCost = 15;
    const damage = 20;
    const manaDrain = 5;

    if (!this.spendMana(manaCost)) {
      console.log(`${this.name} tried to cast ice spell but lacks mana.`);
      return;
    }

    opponent.receiveDamage(damage);
    opponent.drainMana(manaDrain);

    console.log(
      `${this.name} casts ICE BLAST on ${opponent.name} dealing ${damage} damage and draining ${manaDrain} mana!`
    );
  }
}

class Duel {
  constructor(wizardA, wizardB) {
    this.wizardA = wizardA;
    this.wizardB = wizardB;
    this.roundNumber = 1;
  }

  printRoundStatus() {
    console.log("Status:");
    console.log(this.wizardA.getStatus());
    console.log(this.wizardB.getStatus());
    console.log("----------------------------");
  }

  run() {
    console.log("🔥 Duel Begins! 🔥");
    this.printRoundStatus();

    while (this.wizardA.isAlive() && this.wizardB.isAlive()) {
      console.log(`Round ${this.roundNumber}`);

      this.wizardA.castSpell(this.wizardB);
      if (!this.wizardB.isAlive()) break;

      this.wizardB.castSpell(this.wizardA);
      this.printRoundStatus();

      this.roundNumber++;
    }

    const winner = this.wizardA.isAlive()
      ? this.wizardA.name
      : this.wizardB.name;

    console.log(`🏆 Winner: ${winner}`);
  }
}

const wizard1 = new FireWizard("Gandalf", 100, 80);
const wizard2 = new IceWizard("Saruman", 100, 80);

const duel = new Duel(wizard1, wizard2);
duel.run();
