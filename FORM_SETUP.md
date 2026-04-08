# Form Setup — Google Apps Script

Follow these steps once to connect the inquiry form to email + Google Sheets.

---

## Step 1 — Open Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Sign in with **ottransport247@gmail.com**
3. Click **New project**
4. Rename the project to **OT Transport Form Handler** (click "Untitled project" at the top)

---

## Step 2 — Paste the Script

1. Delete all existing code in the editor
2. Open `tools/form-handler.gs` from this project folder
3. Copy the entire file contents
4. Paste it into the Apps Script editor
5. Click **Save** (Ctrl+S / Cmd+S)

---

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Type" and select **Web app**
3. Fill in:
   - **Description**: `OT Transport Form Handler v1`
   - **Execute as**: `Me (ottransport247@gmail.com)`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → click **Allow**
6. Copy the **Web app URL** (it looks like `https://script.google.com/macros/s/AKfy.../exec`)

---

## Step 4 — Paste the URL into index.html

1. Open `index.html` in a text editor
2. Find this line near the bottom of the `<script>` block:
   ```
   const APPS_SCRIPT_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';
   ```
3. Replace `PASTE_YOUR_WEB_APP_URL_HERE` with the URL you copied
4. Save the file

---

## Step 5 — Set Up the Google Sheet

1. Open the Google Sheet: [OT Transport Leads](https://docs.google.com/spreadsheets/d/14OwDuJD1_Q77E2SQZrE3RVCM4wlcIXgd4TXaJ_YkK_w)
2. Make sure it's owned by or shared with **ottransport247@gmail.com** (the script needs edit access)
3. The header row will be created automatically on the first submission

---

## Step 6 — Test It

1. Start the local server: `node serve.mjs`
2. Open [http://localhost:3000](http://localhost:3000)
3. Scroll to the **Get a Quote** section
4. Fill in the form and submit
5. Check:
   - ✅ ottransport247@gmail.com receives the notification email
   - ✅ A new row appears in the Google Sheet
   - ✅ The form shows the thank-you message

---

## Re-deploying After Changes

If you update `tools/form-handler.gs`, you must redeploy:
1. Apps Script → **Deploy → Manage deployments**
2. Click the pencil (edit) icon on the existing deployment
3. Change **Version** to **New version**
4. Click **Deploy**

The URL stays the same — no need to update `index.html`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Form shows "Something went wrong" | Check the Apps Script execution log (Apps Script → Executions) for errors |
| No email received | Check Gmail spam folder; verify the script has `MailApp` permission |
| Sheet not updating | Confirm ottransport247@gmail.com has edit access to the sheet |
| "Script function not found" error | Make sure you saved and redeployed after any edits |
