import rioCharacter from './character';
import rioClient from './client'

export default class rioGuild {
    constructor(name, realm, raidRanks, socialRanks, altRanks) {
        const client = new rioClient();

        let rg = client.getGuild(name, realm);
        let rgMembers = rg.members;

        let additionalMembers = this.additionalMembers();

        this.name = name;
        this.realm = realm;
        this.raidRanks = raidRanks;;
        this.socialRanks = socialRanks;
        this.altRanks = altRanks;

        this.members = rgMembers.filter(r => this.getAllRanks().includes(r.rank)).map(x =>  new rioCharacter(x.character.name, x.character.realm, x.rank));




        // this._additionalMembers = additionalMembers;
    }

    getAllRanks() {
        return this.raidRanks.concat(this.socialRanks).concat(this.altRanks);
    }

    getRaiders() {
        return this.members.filter(c => this.raidRanks.includes(c.rank));
    }

    getAlts() {
        return this.members.filter(c => this.altRanks.includes(c.rank));
    }

    additionalMembers() {
        // const settings = new settings();
        // const range = settings.AdditionalCharacters;
        // let members = [];

        // let numRows = range.getNumRows();

        // for (let r = 1; r <= numRows; r += 1) {
        //     let name = range.getCell(r, 1).getValue();

        //     if (name === "") { break; }

        //     let rank = range.getCell(r, 3).getValue();
        //     let realm = range.getCell(r, 2).getValue();

        //     members.push(new rioGuildCharacter(name, rank, realm));
        // }

        return rioCharacter[0];
    }
}

class rioCharacterAlt extends rioCharacter {
    constructor(character, main) {
        super(character, new Date());
        this_data.main = main;
    }

    getMain() {
        return this._data.main;
    }
}

function throttle(cb, delay) {
    let wait = false;
    let storedArgs = null;
  
    function checkStoredArgs () {
      if (storedArgs == null) {
        wait = false;
      } else {
        cb(...storedArgs);
        storedArgs = null;
        setTimeout(checkStoredArgs, delay);
      }
    }
  
    return (...args) => {
      if (wait) {
        storedArgs = args;
        return;
      }
  
      cb(...args);
      wait = true;
      setTimeout(checkStoredArgs, delay);
    }
  }