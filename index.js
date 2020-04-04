// Spreadsheet API Reference document
// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values
const { log } = require('./logs')
const { google } = require('googleapis')
const { client_email, private_key } = require('./service_key.json')
const { SPREADSHEETS_IDS } = require('./constants')

// Create client's credential object from service credetial file
const scopes = ['https://www.googleapis.com/auth/spreadsheets']
const client = new google.auth.JWT(client_email, null, private_key, scopes)

// Get BEARER token from client's credential
client.authorize(function (err) {
  if (err) {
    console.log(err.message)
    return
  }
  console.log('🎉  Great! Connected to GoogleSheet API')
  // Run the function with client's credential included BEARER token
  GSheetRun(client)
})

async function GSheetRun(client) {
  const gsapi = google.sheets({
    version: 'v4',
    auth: client
  })

  const options = {
    spreadsheetId: SPREADSHEETS_IDS.TEST
  }
  // Get data of specify spreadsheet
  const getSpreadsheet = gsapi.spreadsheets.get(options)

  // Get sheet values of specified spreadsheet
  const getSheetValues = gsapi.spreadsheets.values.get({
    ...options,
    range: 'people'
  })

  // Update values of specified sheet
  const updateSheet = gsapi.spreadsheets.values.update({
    ...options,
    range: 'people!D1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [['lmint3010']]
    }
  })

  try {
    const result = await Promise.all([
      getSpreadsheet,
      getSheetValues,
      updateSheet
    ])
    log(JSON.stringify(result[1].data))
  } catch (err) {
    console.error(err.message)
  }
}
