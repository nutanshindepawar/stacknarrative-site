/**
 * StackNarrative contact form handler (Google Apps Script web app).
 *
 * For every form submission:
 *   1. Saves it as a row in the "Leads" tab first. The visitor only sees "sent" once the row is saved.
 *   2. Then emails the enquiry to NOTIFY_EMAIL (Reply goes straight to the sender).
 *   3. Records what happened in the Status column: "emailed", or why the email didn't go out.
 *
 * Built so nothing gets lost when many people submit at once:
 *   - A lock makes simultaneous submissions take turns writing to the sheet.
 *   - A failed or skipped email never fails the submission; the lead is already in the sheet.
 *   - If the daily email quota runs out, rows are marked "pending" and retryPendingEmails() sends them later.
 *
 * Setup: see the steps in README.md ("Contact form"), or:
 *   1. Create a Google Sheet "StackNarrative Leads" with the account that owns nutan@stacknarrative.com.
 *   2. Extensions > Apps Script. Delete the sample code, paste this file, save.
 *   3. Run setup() once from the editor (choose it in the function dropdown, click Run, allow access).
 *   4. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Deploy.
 *   5. Copy the Web app URL (ends in /exec).
 *
 * After editing this script: Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy.
 * The URL stays the same.
 */

const NOTIFY_EMAIL = "nutan@stacknarrative.com";
const SHEET_NAME = "Leads";
const HEADERS = ["Received", "Name", "Email", "Company", "Problems", "Service", "Tell us more", "Page", "Status"];
const STATUS_COL = HEADERS.length; // column I
const MAX_LEN = 4000;

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return json_({ ok: false, error: "Bad request" });
  }

  // Spam trap: real visitors never fill the hidden "website" field.
  if (data.website) return json_({ ok: true });

  const lead = {
    name: clean_(data.name, 200),
    email: clean_(data.email, 200),
    company: clean_(data.company, 200),
    problems: (Array.isArray(data.problems) ? data.problems : []).slice(0, 20).map(function (p) { return clean_(p, 200); }).filter(String),
    service: clean_(data.service, 200),
    more: clean_(data.more, MAX_LEN),
    page: clean_(data.page, 500),
  };

  if (!lead.name || !lead.company || !lead.service || !lead.problems.length || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return json_({ ok: false, error: "Missing or invalid fields" });
  }

  // 1. Save the lead. If this fails, tell the visitor, so the site falls back to email.
  let row;
  try {
    row = saveLead_(lead);
  } catch (err) {
    console.error("Could not save lead: " + err);
    return json_({ ok: false, error: "Could not save" });
  }

  // 2. Email it. Whatever happens here, the lead is saved, so the visitor sees success.
  setStatus_(row, sendLeadEmail_(lead));
  return json_({ ok: true });
}

// Lets you open the /exec URL in a browser to confirm the deployment is live.
function doGet() {
  return json_({ ok: true, message: "StackNarrative contact form endpoint is live." });
}

// Run once from the editor: creates the Leads tab and an hourly retry for emails that could not be sent.
function setup() {
  getSheet_();
  const exists = ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === "retryPendingEmails"; });
  if (!exists) ScriptApp.newTrigger("retryPendingEmails").timeBased().everyHours(1).create();
}

// Sends emails for rows whose status is not "emailed" (quota ran out, or a mail error).
function retryPendingEmails() {
  const sheet = getSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return;
  const rows = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (r[STATUS_COL - 1] === "emailed" || r[STATUS_COL - 1] === "") continue;
    const lead = { name: r[1], email: r[2], company: r[3], problems: String(r[4]).split("; "), service: r[5], more: r[6], page: r[7] };
    const status = sendLeadEmail_(lead);
    setStatus_(i + 2, status);
    if (status.indexOf("pending") === 0) return; // still out of quota; try next hour
  }
}

function saveLead_(lead) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000); // waits for other submissions to finish writing
  try {
    const sheet = getSheet_();
    sheet.appendRow([new Date(), lead.name, lead.email, lead.company, lead.problems.join("; "), lead.service, lead.more, lead.page, "saving"]);
    SpreadsheetApp.flush();
    return sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }
}

function sendLeadEmail_(lead) {
  try {
    if (MailApp.getRemainingDailyQuota() < 1) return "pending: daily email quota used up";
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: lead.email,
      subject: "New enquiry: " + lead.name + " (" + lead.company + ")",
      body:
        "New enquiry from the StackNarrative website\n\n" +
        "Name: " + lead.name + "\n" +
        "Email: " + lead.email + "\n" +
        "Company: " + lead.company + "\n" +
        "Problems: " + lead.problems.join("; ") + "\n" +
        "Service: " + lead.service + "\n\n" +
        "Tell us more:\n" + (lead.more || "(left blank)") + "\n\n" +
        "Sent from: " + lead.page,
    });
    return "emailed";
  } catch (err) {
    return "email failed: " + String(err).slice(0, 200);
  }
}

function setStatus_(row, status) {
  try {
    getSheet_().getRange(row, STATUS_COL).setValue(status);
  } catch (err) {
    console.error("Could not write status for row " + row + ": " + err);
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Trims, limits length, and stops spreadsheet formula injection (values starting with = + - @).
function clean_(value, max) {
  let s = String(value == null ? "" : value).trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
