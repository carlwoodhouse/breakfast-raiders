import { slug } from '../../utils';
import rioClient from './client'

let counter = 0;

class rioCharacter {
    constructor(name, realm, rank, rioChar, main) {
        counter = counter +1;

        if (counter % 100 == 0) {
            console.log("charCount; " + counter);
        }

        try {
            this.name = name;
            this.realm = realm;
            this.rank = rank;

            let mplus = calcMythicPlus(rioChar);
            this.class = rioChar.class;
            this.spec = rioChar.active_spec_name;
            this.mp_tens = mplus[0];
            this.mp_sixteens = mplus[1];
            this.mp_twenties = mplus[2];
            this.mp_max = mplus[3];
            this.mp_total = mplus[4];
            this.gear = {
                ilvl: rioChar.gear.item_level_equipped,
                tier: {
                    head: rioChar.gear.items.head?.tier == 29,
                    shoulders: rioChar.gear.items.shoulder?.tier == 29,
                    chest: rioChar.gear.items.chest?.tier == 29,
                    hands: rioChar.gear.items.hands?.tier == 29,
                    legs: rioChar.gear.items.legs?.tier == 29
                }
            };

            this.mp_score = rioChar.mythic_plus_scores_by_season[0].scores.all
            this.main = main;
            this.updated - new Date();
        }
        catch (error) {
            console.log(error);
            console.log(rioChar);
        }
    }

    static async initialize(name, realm, rank) {
        try {
            const client = new rioClient();
            const rioChar = await client.getCharacter(name, realm);

            if (rioChar == undefined) {
                return null;
            }

            const main = await client.getCharacterMain(name, slug(realm));

            if (main != null) {
                console.log("map: " + name + " > " + main)
            }
            else {
                console.log("map: " + name + " > main")
            }

            return new rioCharacter(name, realm, rank, rioChar, main);
        }
        catch {}

        return null;
    }

    getName() {
        return this.name;
    }

    getRealm() {
        return this.realm;
    }

    getMythicPlus10() {
        return this.mp_tens;
    }

    getMythicPlus16() {
        return this.mp_sixteens;
    }

    getMythicPlus20() {
        return this.mp_twenties;
    }

    getMythicPlusTotal() {
        return this.mp_total;
    }

    getMythicPlusMax() {
        return this.mp_max;
    }

    getGearLevel() {
        return this.gear.ilvl;
    }

    getMythicPlusScore() {
        return this.mp_score;
    }

    hasGearT29Head() {
        return this.gear.tier.head;
    }

    hasGearT29Shoulders() {
        return this.gear.tier.shoulders;
    }

    hasGearT29Chest() {
        return this.gear.tier.chest;
    }

    hasGearT29Hands() {
        return this.gear.tier.hands;
    }

    hasGearT29Legs() {
        return this.gear.tier.legs;
    }

    getUpdated() {
        return this._updated;
    }

    getClass() {
        return this.class;
    }

    getSpec() {
        return this.spec;
    }

    getRank() {
        return this.rank;
    }

   getMain() {
        return this.main;
    }
}

function calcMythicPlus(rioChar) {
    // < 15, 15, 20, MAX, TOTAL
    var mythicplus = [0, 0, 0, 0, 0];

    for (let j = 0; j < rioChar.mythic_plus_weekly_highest_level_runs.length; j++) {
        var run = rioChar.mythic_plus_weekly_highest_level_runs[j];

        if (run.mythic_level > 9 && run.mythic_level < 16) {
            mythicplus[0] = mythicplus[0] + 1;
        }

        if (run.mythic_level > 15 && run.mythic_level < 20) {
            mythicplus[1] = mythicplus[1] + 1;
        }

        if (run.mythic_level > 19) {
            mythicplus[2] = mythicplus[2] + 1;
        }

        if (run.mythic_level > mythicplus[3]) {
            mythicplus[3] = run.mythic_level;
        }

        mythicplus[4] = mythicplus[4] + 1;
    }

    return mythicplus;
}


export default rioCharacter