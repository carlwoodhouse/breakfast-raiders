import Character from "../../components/character/character";
import { characterScoreCompare } from "../../utils";
import rioRoster from "../rio/roster";
import { unstable_cache } from 'next/cache'


export default class presentationRoster {
    constructor() {}

    static async buildRosterTree() {
        const guild = await rioRoster.getGuild();
        const characters = guild.getRaiders().concat(guild.getAlts());

        const charsWhoCouldBeAlts = characters.filter(x => x.getMain() != null);
        const charsWhoCouldBeMains = characters.filter(x => x.getMain() == null);;

        const tree = charsWhoCouldBeMains.map(x => new Character(x, charsWhoCouldBeAlts));

        var fixedTree = [];
        const raiderRanks = guild.getRaiderRanks();

        charsWhoCouldBeAlts.forEach(alt => {
            var found = false;


            if (tree.filter(a => a.name == alt.name).length > 0) {
                found = true;;
            }

            tree.forEach(main => {
                if (main.alts.filter(a => a.name == alt.name).length > 0) {
                    found = true;
                }
            });

            if (!found) {
                tree.push(new Character(alt, []));
            }
        });

        tree.forEach(chr => {
            if (raiderRanks.includes(chr.rank)) {
                chr.updateAlts(chr.alts.filter(c => c.mp_score > 0));
                fixedTree.push(chr);
            }
            else {
                if (chr.getAltCount() > 0) {
                    var chrAlts = chr.alts;
                    const realMain = chrAlts.filter(a => raiderRanks.includes(a.rank))[0];

                    if (realMain !== undefined) {
                        var alts = chrAlts.filter(x => x.name !== realMain.name);
                        chr.updateAlts([]);
                        realMain.updateAlts((alts.concat(chr)).filter(c => c.mp_score > 0));
                        fixedTree.push(realMain);
                    }
                }
            }
        });

        return fixedTree.sort(characterScoreCompare);
    } 
}