import React, { Component } from 'react';

class SocialLinks extends Component  {
    render() {
        return (
        <div className="guildlinks">
            <a title='RaiderIO guild Profile' className='d-inline p-right' href={ "https://raider.io/guilds/" + process.env.GUILD_REGION + "/" + process.env.GUILD_REALM + "/" + process.env.GUILD_NAME } target="_blank"><img src="icons/rio.svg" className="icon" alt="RaiderIO" /></a>
            <a title='Armory guild Profile' className='d-inline' href={ "https://worldofwarcraft.com/en-gb/guild/eu/steamwheedle-cartel/banshee" } target="_blank"><img src="icons/wow.svg" className="icon" alt="Armory" /></a>
            <a title='Guild Logs' className='d-inline' href={ "https://www.warcraftlogs.com/guild/eu/steamwheedle-cartel/banshee" } target="_blank"><img src="icons/wcl.png" className="icon" alt="WarcraftLogs" /></a>
        </div>
        )
    }
}

export default SocialLinks