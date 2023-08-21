import { characterScoreCompare, csvToArray } from "../../utils";

class Character {
  constructor(rioCharacter, alts) {
    rioCharacter.initialize();
    this.name = rioCharacter.getName();
    this.realm = rioCharacter.getRealm().replace(" ", "-");
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
      var altMap = csvToArray(process.env.GUILD_ALTS);
      var altMapResults = altMap.filter(x => x.endsWith("|" + this.name));
      var altNames = new Array();

      altMapResults.forEach(element => {
        altNames.push(element.substring(0, element.indexOf("|")));
      });

      if (altNames.length > 0) {
        this.alts = alts.filter(a => altNames.includes(a.getName())).map(x => new Character(x, [])).sort(characterScoreCompare);
      }
    }
  }
}

export default Character;