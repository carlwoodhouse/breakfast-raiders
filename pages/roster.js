import Image from 'next/image'
import googleSheetsService from '../services/google.sheets.service';

import WarcraftlogsLink from '../components/characterLink/warcraftLogsLink';
import ArmoryLink from '../components/characterLink/armoryLink';


export default function Home({ raiders, lastUpdated }) {
  return (
    <div className="container-fluid p-0">
      <img src="/banshee-bg2.png" class="img-fluid" alt="..."></img>
      <div class="guildlinks">
        <a title='RaiderIO guild Profile' className='d-inline p-right' href={ "https://raider.io/guilds/eu/steamwheedle-cartel/Banshee" } target="_blank"><img src="icons/rio.svg" class="icon" alt="RaiderIO" /></a>
        <a title='Armory guild Profile' className='d-inline' href={ "https://worldofwarcraft.com/en-gb/guild/eu/steamwheedle-cartel/banshee" } target="_blank"><img src="icons/wow.svg" class="icon" alt="Armory" /></a>
        <a title='Guild Logs' className='d-inline' href={ "https://www.warcraftlogs.com/guild/eu/steamwheedle-cartel/banshee" } target="_blank"><img src="icons/wcl.png" class="icon" alt="WarcraftLogs" /></a>
      </div>
      <table class="table roster">
        <thead>
          <tr>
            <th scope="col">score</th>
            <th scope="col">name</th>
            <th scope="col">ilvl</th>
            <th scope="col">m+ (15+)</th>
            <th scope="col">m+ (20+)</th>
            <th scope="col">m+ (highest)</th>
            <th scope="col">m+ (total)</th>
            <th scope="col">tools</th>
          </tr>
        </thead>
        <tbody>
        {raiders.map((user) => (
          <tr className={user[1] > 354 ? user[10].toString().toLowerCase().replace(" ", "-") : user[10].toString().toLowerCase().replace(" ", "-") + " bg-danger" }>
            <td scope="row">{user[9]}</td>
            <td className='class'>{user[0]}</td>
            <td>{user[1]}</td>
            <td>{user[4]}</td>
            <td>{user[14]}</td>
            <td>{user[5]}</td>
            <td>{user[15]}</td>
            <td>
              <a title='RaiderIO Profile' className='d-inline p-right' href={"https://raider.io/characters/eu/" + user[8] + "/" + user[0] } target="_blank"><img src="icons/rio.svg" class="icon" alt="RaiderIO" /></a>
              <ArmoryLink name={user[0]} realm={user[8]} />
              <a title='Quick SIM' className='d-inline' href={"https://www.raidbots.com/simbot/quick?region=eu&realm=" + user[8] + "&name=" + user[0] } target="_blank"><img src="icons/raidbots.webp" class="icon" alt="Raidbots" /></a>
              <WarcraftlogsLink name={user[0]} realm={user[8]} />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <nav class="navbar navbar-dark fixed-bottom bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="https://raider.io/banshee" target="_blank">Updated: {lastUpdated}</a>
        </div>
      </nav>
    </div>
  );
}

export async function getStaticProps ({ query }) {
    const raiderRange = await googleSheetsService.getRange('Roster!A3:P50');
    const raiders = raiderRange.sort((a, b) => { if (Number(a[9]) === Number(b[9])) { return  Number(a[1]) > Number(b[1]) ? -1 : 1  }  else return Number(a[9]) < Number(b[9]) ? 1: -1 });

    console.log(raiders);

    var resetDate = new Date();
    resetDate.setDate(resetDate.getDate() + (1 + 7 - resetDate.getDay()) % 7);

    return { 
        props: {
          raiders,
          lastUpdated: (new Date()).toLocaleString(),
          resetDate: resetDate.toLocaleDateString()
        } 
    }
}

