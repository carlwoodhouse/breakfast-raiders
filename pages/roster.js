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
            <th scope="col">updated</th>
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
            <td>{user[7]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps ({ query }) {
    const range = await googleSheetsService.getRange('Roster!A3:L50');
    const data = range.sort((a, b) => a[9] < b[9] ? 1: -1);
    console.log(data)

    return { 
        props: {
          data,
        } 
    }
}