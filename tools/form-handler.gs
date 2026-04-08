// OT Transport — Inquiry Form Handler
// Deploy this as a Google Apps Script Web App:
//   Execute as: Me
//   Who has access: Anyone
//
// After deploying, copy the Web App URL into index.html (APPS_SCRIPT_URL constant).

var SHEET_ID = '14OwDuJD1_Q77E2SQZrE3RVCM4wlcIXgd4TXaJ_YkK_w';
var NOTIFY_EMAIL = 'inamdarglobalconnect@gmail.com';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // --- Append to Google Sheet ---
    var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Company', 'Contact Name', 'Email', 'Phone',
        'Service Needed', 'Frequency', 'Shipment Details', 'Additional Notes'
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
      data.company || '',
      data.contact_name || '',
      data.email || '',
      data.phone || '',
      data.shipment_type || '',
      data.frequency || '',
      data.shipment_details || '',
      data.message || ''
    ]);

    // --- Send notification email ---
    var subject = 'New Inquiry from ' + (data.company || 'Unknown') + ' — OT Transport';
    var body = [
      'A new inquiry has been submitted on the OT Transport website.',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'LEAD DETAILS',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Company:          ' + (data.company || '—'),
      'Contact Name:     ' + (data.contact_name || '—'),
      'Email:            ' + (data.email || '—'),
      'Phone:            ' + (data.phone || '—'),
      'Service Needed:   ' + (data.shipment_type || '—'),
      'Frequency:        ' + (data.frequency || '—'),
      '',
      'Shipment Details:',
      (data.shipment_details || '—'),
      '',
      'Additional Notes:',
      (data.message || '—'),
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Submitted: ' + new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
    ].join('\n');

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: body
    });

    return buildResponse({ success: true });

  } catch (err) {
    return buildResponse({ success: false, error: err.message });
  }
}

// GET handler — required so the script URL responds to OPTIONS/preflight
function doGet(e) {
  return buildResponse({ status: 'OT Transport form handler is running.' });
}

function buildResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
