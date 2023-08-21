import { config } from 'config';
import rioGuild  from './guild';
import { csvToIntArray } from '../../utils';

export default class rioRoster {
    constructor() { }

    static async getGuild() {
        return new rioGuild(
            process.env.GUILD_NAME, 
            process.env.GUILD_REALM, 
            csvToIntArray(process.env.GUILD_RAIDER_RANKS),
            csvToIntArray(process.env.GUILD_SOCIAL_RANKS),
            csvToIntArray(process.env.GUILD_ALT_RANKS));
    }
}

