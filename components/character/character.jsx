import { characterScoreCompare, csvToArray } from "../../utils";

class Character {
  constructor(rioCharacter, alts) {
    this.name = rioCharacter.getName();
    this.realm = rioCharacter.getRealm().replace(" ", "-").toLowerCase();
    this.class = rioCharacter.getClass();
    this.spec = rioCharacter.getSpec();

    this.ilvl = rioCharacter.getGearLevel();

    this.mp_tens = rioCharacter.getMythicPlus10();
    this.mp_sixteens = rioCharacter.getMythicPlus16();
    this.mp_max = rioCharacter.getMythicPlusMax();
    this.mp_twenties = rioCharacter.getMythicPlus20();
    this.mp_total = rioCharacter.getMythicPlusTotal();
    this.mp_score = rioCharacter.getMythicPlusScore();

    this.alts = [];

    if (alts.length > 0) {
      this.alts = alts.filter(a => a.getMain() == this.name).map(x => new Character(x, [])).sort(characterScoreCompare);
    }
  }
}

export default Character;