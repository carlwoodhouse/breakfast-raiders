import { csvToArray, slug } from '../../utils';
import rioCharacter from './character';
import rioClient from './client'

export default class rioGuild {
  constructor(name, realm, raidRanks, socialRanks, altRanks) {
    this.name = name;
    this.realm = realm;
    this.raidRanks = raidRanks;;
    this.socialRanks = socialRanks;
    this.altRanks = altRanks;
  }

  async initialize() {
    const client = new rioClient();

    let rg = await client.getGuild(this.name, this.realm);
    let rgMembers = rg.members;
    this.members = await Promise.all(rgMembers.filter(r => this.getAllRanks().includes(r.rank)).map(async x => await rioCharacter.initialize(x.character.name, x.character.realm, x.rank)).filter(x => x != null));

    let additionalMembers = await this.populateAdditionalMembers();
    this.members = this.members.concat(additionalMembers);

    if (process.env.RANK_OVERRIDE != undefined && process.env.RANK_OVERRIDE != "") {
      const charKeys = csvToArray(process.env.RANK_OVERRIDE);

      console.log(charKeys);

      let rankOverides = [];

      for await (const x of charKeys) {
        // name|realm|rank
        rankOverides.push(csvToArray(x, "|"));
      }

      this.members.forEach(chr => {
        rankOverides.forEach(ro => {
          if (ro[0] == chr.name && ro[1] == slug(chr.realm))
          {
            chr.rank = parseInt(ro[2]);
          }
        });
      });
    }
  }

  getAllRanks() {
    return this.raidRanks.concat(this.altRanks);
    // return this.raidRanks.concat(this.socialRanks).concat(this.altRanks);
  }

  getRaiders() {
    return this.members.filter(c => this.raidRanks.includes(c.rank));
  }

  getRaiderRanks() {
    return this.raidRanks;
  }

  getAlts() {
    return this.members.filter(c => this.altRanks.includes(c.rank));
  }

  getMembers() {
    return this.members;
  }

  async populateAdditionalMembers() {
    let addMembers = [];

    if (process.env.ADDITIONAL_CHARACTERS != undefined && process.env.ADDITIONAL_CHARACTERS != "") {
      const charKeys = csvToArray(process.env.ADDITIONAL_CHARACTERS);

      for await (const x of charKeys) {
        // name|realm|rank
        let keyParts = csvToArray(x, "|");
        let member = await rioCharacter.initialize(keyParts[0], keyParts[1], Number(keyParts[2]));
        addMembers.push(member);
      }
    }

    return addMembers;
  }
}
