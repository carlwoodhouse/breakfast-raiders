import Character from "../../components/character/character";
import { characterScoreCompare } from "../../utils";
import rioRoster from "../rio/roster";

export default class presentationRoster {
    constructor() {}

    static async buildRosterTree() {
        const guild = await rioRoster.getGuild(); 

        const characters = guild.getRaiders().concat(guild.getAlts());

        const charsWhoCouldBeAlts = characters.filter(x => x.getMain() != null);
        const charsWhoCouldBeMains = characters.filter(x => x.getMain() == null);

        const tree = charsWhoCouldBeMains.map(x => new Character(x, charsWhoCouldBeAlts)).sort(characterScoreCompare);
        // we'll add more filtering here for orphan alts
       return tree.filter(t => t.getAltCount() > 0 || guild.getRaiderRanks().includes(t.rank));
     //  return tree;
    } 
}s