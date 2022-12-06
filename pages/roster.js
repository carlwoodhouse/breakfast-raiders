import Image from 'next/image'
import googleSheetsService from '../services/google.sheets.service';

export default function Home({ data }) {
  {console.log(data)}
  return (
    <div className="container-fluid p-0">
      <img src="/banshee-bg2.png" class="img-fluid" alt="..."></img>
      <table class="table roster">
        <thead>
          <tr>
            <th scope="col">score</th>
            <th scope="col">name</th>
            <th scope="col">ilvl</th>
            <th scope="col">m+ (15+)</th>
            <th scope="col">m+ (highest)</th>
            {/* <th scope="col">profile links</th> */}
            <th scope="col">updated</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        {data.map((user) => (
          <tr className={user[10].toString().toLowerCase().replace(" ", "-")}>
            <td scope="row">{user[9]}</td>
            <td className='class'>{user[0]}</td>
            <td>{user[1]}</td>
            <td>{user[4]}</td>
            <td>{user[5]}</td>
            {/* <td><span style={{fontSize: '0.8em'}}>
              <a href={"https://raider.io/characters/eu/" + user[8] + "/" + user[0] } target="_blank">[Raider.IO]</a> 
              &nbsp;-  <a href={"https://worldofwarcraft.com/en-gb/character/eu/" + user[8] + "/" + user[0] } target="_blank">[Blizz]</a>
              </span>
            </td> */}
            <td>{user[7]}</td>
            <td>
              <a title='RaiderIO Profile' className='d-inline p-right' href={"https://raider.io/characters/eu/" + user[8] + "/" + user[0] } target="_blank"><img src="icons/rio.svg" class="icon" alt="RaiderIO" /></a>
              <a title='Armory Profile' className='d-inline' href={"https://worldofwarcraft.com/en-gb/character/eu/" + user[8] + "/" + user[0] } target="_blank"><img src="icons/wow.svg" class="icon" alt="Armory" /></a>
              <a title='Quick SIM' className='d-inline' href={"https://www.raidbots.com/simbot/quick?region=eu&realm=" + user[8] + "&name=" + user[0] } target="_blank"><img src="icons/raidbots.webp" class="icon" alt="Raidbots" /></a>
              <a title='Logs' className='d-inline' href={"https://www.warcraftlogs.com/character/eu/" + user[8] + "&name=" + user[0] } target="_blank"><img src="icons/wcl.png" class="icon" alt="Raidbots" /></a>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps ({ query }) {
    const range = await googleSheetsService.getRange('Roster!A3:L50');
    const data = range.sort((a, b) => { if (a[9] === b[9]) { return  a[1] > b[1] ? -1 : 1  }  else return a[9] < b[9] ? 1: -1 });
    console.log(data)

    return { 
        props: {
          data,
        } 
    }
}

