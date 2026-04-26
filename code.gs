// Keyboard Ranger - Google Apps Script Leaderboard API
// Deploy as Web App and set to "Anyone" for access

const SHEET_NAME = 'Leaderboard';

// doGET - Fetch top players leaderboard
function doGet() {
  const leaderboard = getLeaderboard();
  return ContentService.createTextOutput(JSON.stringify(leaderboard))
    .setMimeType(ContentService.MimeType.JSON);
}

// doPOST - Submit player score
function doPost(e) {
  let name = '';
  let score = 0;
  let wave = 1;
  
  try {
    // Try JSON from postData contents
    if (e.postData && e.postData.contents) {
      const data = JSON.parse(e.postData.contents);
      name = String(data.name || '').trim();
      score = parseInt(data.score) || 0;
      wave = parseInt(data.wave) || 1;
    } else {
      // Try from parameter string
      const paramStr = e.parameter || '{}';
      const data = JSON.parse(paramStr);
      name = String(data.name || '').trim();
      score = parseInt(data.score) || 0;
      wave = parseInt(data.wave) || 1;
    }
  } catch (err) {
    // Fallback: try form params
    name = String(e.parameter.name || '').trim();
    score = parseInt(e.parameter.score) || 0;
    wave = parseInt(e.parameter.wave) || 1;
  }
  
  if (!name || score <= 0) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Name and score required',
      debug: { name: name, score: score }
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const result = submitScore(name, score, wave);
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Get top players leaderboard
function getLeaderboard() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    return { players: [], error: 'Sheet not found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const players = [];
  
  // Skip header row (row 0), process data
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] && data[i][1]) {
      players.push({
        name: data[i][0],
        score: parseInt(data[i][1]) || 0,
        wave: data[i][2] || 1,
        date: data[i][3] || ''
      });
    }
  }
  
  // Sort by score descending
  players.sort((a, b) => b.score - a.score);
  
  // Assign ranks after sorting
  players.forEach((p, i) => p.rank = i + 1);
  
  return { players: players.slice(0, 20) };
}

// Submit score to leaderboard
function submitScore(name, score, wave) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    return { success: false, error: 'Sheet not found' };
  }
  
  // Check if name already exists and update if higher score
  const data = sheet.getDataRange().getValues();
  let existingRow = 0;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === name) {
      existingRow = i + 1;
      if (score > parseInt(data[i][1])) {
        sheet.getRange(i + 1, 2).setValue(score);
        sheet.getRange(i + 1, 3).setValue(wave);
        sheet.getRange(i + 1, 4).setValue(new Date());
        return { success: true, updated: true, name: name, score: score };
      }
      return { success: true, updated: false, name: name, score: score, existingScore: data[i][1] };
    }
  }
  
  // Add new entry
  const newRow = data.length + 1;
  sheet.getRange(newRow, 1).setValue(name);
  sheet.getRange(newRow, 2).setValue(score);
  sheet.getRange(newRow, 3).setValue(wave);
  sheet.getRange(newRow, 4).setValue(new Date());
  
  return { success: true, added: true, name: name, score: score };
}

// Test function - verify API connection
function testAPI() {
  const result = {
    test: 'Leaderboard API is working',
    timestamp: new Date(),
    functions: ['doGet', 'doPost', 'getLeaderboard', 'submitScore']
  };
  return JSON.stringify(result);
}