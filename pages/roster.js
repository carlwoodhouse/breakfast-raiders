import Image from 'next/image'
import * as Icon from 'react-bootstrap-icons';

import WarcraftlogsLink from '../components/characterLink/warcraftLogsLink';
import ArmoryLink from '../components/characterLink/armoryLink';
import SocialLinks from '../components/guild/socialLinks';

import Character from '../components/character/character';
import { characterScoreCompare } from "../utils";

import rioRoster from '../api/rio/roster';
import presentationRoster from '../api/presentation/roster';


export default function Home({ raiders, lastUpdated }) {
  return (
    <div className="container-fluid p-0">
      <img src="/breakfastraiders.webp" className="img-fluid" alt="..."></img>
      <div className="table-responsive">
        <table className="table table-dark table-hover roster accordion">
          <thead>
            <tr>
              <th scope="col">&nbsp;</th>
              <th scope="col">score</th>
              <th scope="col">name</th>
              <th scope="col">ilvl</th>
              <th scope="col">t31</th>
              <th scope="col">m+ (18-19)</th>
              <th scope="col">m+ (20+)</th>
              <th scope="col">m+ (highest)</th>
              <th scope="col">m+ (total)</th>
              <th scope="col">tools</th>
            </tr>
          </thead>
          <tbody>
          {
          raiders.map((user, index) => (
            // these rows should become components tbh
            <>
              <tr key={ "char-" + user.name } className={user.class.toLowerCase().replace(" ", "-") + (index !== 0 && index % 2 != 0 ? " striped" : "") } data-bs-toggle="collapse" data-bs-target={ ".char-" + user.name.toLowerCase() }>
                {user.alts.length > 0 
                  ? <td scope="row"><Icon.ChevronDown /></td>
                  : <td scope="row">&nbsp;</td>
                }
                <td>{user.mp_score}</td>
                <td className='class'>{user.name}</td>
                <td>{user.ilvl}</td>
                <td>{user.ilvl}</td>
                <td>{user.mp_myth}</td>
                <td>{user.mp_twenties}</td>
                <td>{user.mp_max}</td>
                <td>{user.mp_total === 10 ? "10+" : user.mp_total}</td>
                <td>
                  <a title='RaiderIO Profile' className='d-inline p-right' href={"https://raider.io/characters/eu/" + user.realm + "/" + user.name } target="_blank"><img src="icons/rio.svg" className="icon" alt="RaiderIO" /></a>
                  <ArmoryLink name={user.name} realm={user.realm} />
                  <a title='Quick SIM' className='d-inline' href={"https://www.raidbots.com/simbot/quick?region=eu&realm=" + user.realm + "&name=" + user.name } target="_blank"><img src="icons/raidbots.webp" className="icon" alt="Raidbots" /></a>
                  <WarcraftlogsLink name={user.name} realm={user.realm} />
                </td>
              </tr>
              {user.alts.map((alt) => (
                <tr key={ "char-" + alt.name } className={ "collapse accordian-collapse alt char-" + user.name.toLowerCase() + " " + alt.class.toLowerCase().replace(" ", "-") + (index !== 0 && index % 2 != 0 ? " striped" : "")} data-bs-parent=".table">
                  <td scope="row">&nbsp;</td>
                  <td>{alt.mp_score}</td>
                  <td className='class'>{alt.name}</td>
                  <td>{alt.ilvl}</td>
                  <td>{alt.mp_myth}</td>
                  <td>{alt.mp_twenties}</td>
                  <td>{alt.mp_max}</td>
                  <td>{alt.mp_total === 10 ? "10+" : alt.mp_total }</td>
                  <td>
                    <a title='RaiderIO Profile' className='d-inline p-right' href={"https://raider.io/characters/eu/" + alt.realm + "/" + alt.name } target="_blank"><img src="icons/rio.svg" className="icon" alt="RaiderIO" /></a>
                    <ArmoryLink name={alt.name} realm={alt.realm} />
                    <a title='Quick SIM' className='d-inline' href={"https://www.raidbots.com/simbot/quick?region=eu&realm=" + alt.realm + "&name=" + alt.name } target="_blank"><img src="icons/raidbots.webp" className="icon" alt="Raidbots" /></a>
                    <WarcraftlogsLink name={alt.name} realm={alt.realm} />
                  </td>
                </tr>
              ))}
            </>
      ))}
          </tbody>
        </table>
        <nav className="navbar navbar-dark fixed-bottom bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="https://raider.io/banshee" target="_blank">Updated: {lastUpdated}</a>
            <SocialLinks />
          </div>
        </nav>
      </div>
    </div>
  );
}

export async function getStaticProps ({ query }) {
    const roster = await presentationRoster.buildRosterTree();

    var resetDate = new Date();
    resetDate.setDate(resetDate.getDate() + (1 + 7 - resetDate.getDay()) % 7);

    return { 
        props: {
          raiders: JSON.parse(JSON.stringify(roster)),
          lastUpdated: (new Date()).toLocaleString(),
          resetDate: resetDate.toLocaleDateString()
        } 
    }
}


