import Image from 'next/image'

export default function Home({ data }) {
  {console.log(data)}
  return (
    <div className="container-fluid p-0">
      <img src="/banshee-bg2.png" class="img-fluid" alt="..."></img>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">score</th>
            <th scope="col">name</th>
            <th scope="col">ilvl</th>
            <th scope="col">m+ (15+)</th>
            <th scope="col">m+ (highest)</th>
            <th scope="col">realm</th>
            <th scope="col">updated</th>
          </tr>
        </thead>
        <tbody>
        {data.map((user) => (
          <tr className={user[10].toString().toLowerCase().replace(" ", "-")}>
            <th scope="row">{user[9]}</th>
            <td className='class'>{user[0]}</td>
            <td>{user[1]}</td>
            <td>{user[4]}</td>
            <td>{user[5]}</td>
            <td>@{user[8]}</td>
            <td>{user[7]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

import { google } from 'googleapis';

export async function getStaticProps ({ query }) {

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    const range = 'Roster!A3:L50';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const data = response.data.values.sort((a, b) => a[9] < b[9] ? 1: -1);
    console.log(data)

    return { 
        props: {
          data,
        } 
    }
}