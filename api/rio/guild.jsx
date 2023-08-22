import rioCharacter from './character';
import rioClient from './client'

export default class rioGuild {
    constructor(name, realm, raidRanks, socialRanks, altRanks) {
       

        let additionalMembers = this.additionalMembers();

        this.name = name;
        this.realm = realm;
        this.raidRanks = raidRanks;;
        this.socialRanks = socialRanks;
        this.altRanks = altRanks;


        // this._additionalMembers = additionalMembers;
    }

    async initialize() {
      const client = new rioClient();

      let rg = await client.getGuild(this.name, this.realm);
      let rgMembers = rg.members;
      this.members = await Promise.all(rgMembers.filter(r => this.getAllRanks().includes(r.rank)).map(async x => await rioCharacter.initialize(x.character.name, x.character.realm, x.rank)));
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