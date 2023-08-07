import { google } from 'googleapis';

class googleSheetsService {
  constructor() { }
  
  static async getRange(range) {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const data = response.data.values;
    return data ?? [];
  }
}

export default googleSheetsService;