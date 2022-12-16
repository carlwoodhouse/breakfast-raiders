import { google } from 'googleapis';

class Character {
  //constructor() { }

  // temp
  constructor(sheetsArrEntry, alts) { 
    this.name = sheetsArrEntry[0];
    this.realm = sheetsArrEntry[8]
    this.class = sheetsArrEntry[10];
    this.spec = sheetsArrEntry[11];

    this.ilvl = sheetsArrEntry[1];

    this.mp_tens = sheetsArrEntry[3];
    this.mp_fifthteens = sheetsArrEntry[4];
    this.mp_max = sheetsArrEntry[5];
    this.mp_twenties = sheetsArrEntry[14];
    this.mp_total = sheetsArrEntry[15];
    this.mp_score = sheetsArrEntry[9];

    this.alts = [];

    const filteredAlts = alts.filter(x => x[13] === this.name);

    if (filteredAlts.length > 0) {
        this.alts = filteredAlts.map(x => new Character(x, []));
    }
  }
}

export default Character;