/**
 * BAB AL KHIBRAH TRADING LLC - GOOGLE APPS SCRIPT WEB APP
 * 
 * Target Google Sheet: BAB AL KHIBRAH
 * - Sheet1: Detailed Material RFQ Submissions
 * - Sheet2: General Message Desk Submissions
 * 
 * Target Email: kaleel@babalkhibrah.com, sales@babalkhibrah.com
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Open Google Sheets (or create a new sheet named "BAB AL KHIBRAH")
 * 2. Click Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Deploy > New deployment
 * 5. Select type: Web app
 *    - Description: Bab Al Khibrah Contact & RFQ Service v2
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 * 6. Click Deploy and Authorize access
 * 7. Copy the Web App URL and set it in your .env.local as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 */

// ============================================================
// CONFIGURATION
// ============================================================
var SPREADSHEET_ID = "1e3mlxUpJfsi1vr5JyJzXAfMBBz3qKwbUG8CLtrs19h0";
var NOTIFICATION_EMAILS = "kaleel@babalkhibrah.com, sales@babalkhibrah.com";

// ============================================================
// DIAGNOSTIC TEST - Run this inside Apps Script Editor to test
// ============================================================
function testRfqSubmission() {
  var dummyPayload = {
    postData: {
      contents: JSON.stringify({
        formType: "rfq",
        refNum: "RFQ-TEST-" + Math.floor(Math.random() * 10000),
        name: "Test Engineer",
        companyName: "Precision Engineering LLC",
        email: "test@example.com",
        phone: "+971 50 575 1347",
        country: "United Arab Emirates",
        deliveryLocation: "Sharjah Yard",
        materialFamily: "Alloy Steel",
        grade: "EN19 / 4140",
        form: "Round bars",
        diameter: "120",
        length: "500",
        quantity: "10",
        unit: "pcs",
        cuttingRequirement: "In-House Bandsaw Sizing",
        certificateRequirement: "MTC 3.1",
        additionalNotes: "Diagnostic test from Google Apps Script editor."
      })
    }
  };
  var response = doPost(dummyPayload);
  Logger.log("Test Response: " + response.getContent());
}

// ============================================================
// MAIN WEB APP POST HANDLER
// ============================================================
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    Logger.log("doPost called at: " + new Date().toISOString());

    // ---- Parse incoming payload ----
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        Logger.log("JSON parse error: " + jsonErr.toString());
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date();
    var formType = data.formType || "rfq";

    // ---- Access Google Spreadsheet ----
    var doc;
    try {
      doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      doc = SpreadsheetApp.getActiveSpreadsheet();
    }
    if (!doc) {
      doc = SpreadsheetApp.getActiveSpreadsheet();
    }

    if (formType === "rfq" || formType === "Sheet1") {
      // ------------------------------------------------------------
      // 1. PROCESS MATERIAL RFQ (Sheet1)
      // ------------------------------------------------------------
      var sheet1 = doc.getSheetByName("Sheet1");
      if (!sheet1) {
        sheet1 = doc.insertSheet("Sheet1");
      }

      // Initialize Headers if Sheet is new
      if (sheet1.getLastRow() === 0) {
        sheet1.appendRow([
          "Timestamp",
          "Reference ID",
          "Contact Name",
          "Company Name",
          "Email",
          "Phone",
          "Country",
          "Delivery Location",
          "Material Family",
          "Target Grade",
          "Shape / Form",
          "Dimensions (mm)",
          "Quantity",
          "Unit",
          "Cutting Spec",
          "Certificate Spec",
          "Additional Notes"
        ]);
        sheet1.getRange(1, 1, 1, 17)
          .setFontWeight("bold")
          .setBackground("#1C3B5E")
          .setFontColor("#FFFFFF");
        sheet1.setFrozenRows(1);
      }

      // Format dimensions cleanly
      var dimParts = [];
      if (data.diameter) dimParts.push("Dia: " + data.diameter + "mm");
      if (data.thickness) dimParts.push("Thk: " + data.thickness + "mm");
      if (data.width) dimParts.push("W: " + data.width + "mm");
      if (data.length) dimParts.push("L: " + data.length + "mm");
      var dimensionsFormatted = dimParts.length > 0 ? dimParts.join(" | ") : "-";

      var refId = data.refNum || ("RFQ-" + Utilities.formatDate(timestamp, "GMT+4", "yyyyMMdd") + "-" + Math.floor(1000 + Math.random() * 9000));

      // Append row to Sheet1
      sheet1.appendRow([
        timestamp,
        refId,
        data.name || "",
        data.companyName || data.company || "",
        data.email || "",
        data.phone || "",
        data.country || "United Arab Emirates",
        data.deliveryLocation || "",
        data.materialFamily || "",
        data.grade || "",
        data.form || "",
        dimensionsFormatted,
        data.quantity || "",
        data.unit || "pcs",
        data.cuttingRequirement || "",
        data.certificateRequirement || "MTC 3.1",
        data.notes || data.additionalNotes || ""
      ]);

      Logger.log("Row added to Sheet1 with Ref: " + refId);

      // ---- Send Email Notification for RFQ ----
      try {
        var emailSubject = "[Website RFQ] " + refId + " - " + (data.companyName || data.name || "New Inquiry");
        var emailBody = [
          "==================================================",
          "BAB AL KHIBRAH TRADING LLC - NEW MATERIAL RFQ",
          "==================================================",
          "Reference ID:      " + refId,
          "Date & Time:       " + Utilities.formatDate(timestamp, "GMT+4", "dd/MM/yyyy HH:mm:ss") + " (UAE Time)",
          "",
          "--- CLIENT CONTACT DETAILS ---",
          "Contact Name:      " + (data.name || "-"),
          "Company Name:      " + (data.companyName || data.company || "-"),
          "Email Address:     " + (data.email || "-"),
          "Phone Number:      " + (data.phone || "-"),
          "Country:           " + (data.country || "United Arab Emirates"),
          "Delivery Location: " + (data.deliveryLocation || "-"),
          "",
          "--- MATERIAL SPECIFICATIONS ---",
          "Material Family:   " + (data.materialFamily || "-"),
          "Target Grade:      " + (data.grade || "-"),
          "Shape / Form:      " + (data.form || "-"),
          "Dimensions:        " + dimensionsFormatted,
          "Quantity:          " + (data.quantity || "-") + " " + (data.unit || "pcs"),
          "Cutting Spec:      " + (data.cuttingRequirement || "Full lengths"),
          "Certificate:       " + (data.certificateRequirement || "MTC 3.1"),
          "",
          "--- ADDITIONAL NOTES / TOLERANCES ---",
          (data.notes || data.additionalNotes || "None specified"),
          "=================================================="
        ].join("\n");

        MailApp.sendEmail({
          to: NOTIFICATION_EMAILS,
          subject: emailSubject,
          body: emailBody
        });
        Logger.log("RFQ Notification Email dispatched.");
      } catch (mailErr) {
        Logger.log("Email dispatch warning: " + mailErr.toString());
      }

    } else {
      // ------------------------------------------------------------
      // 2. PROCESS GENERAL INQUIRY (Sheet2)
      // ------------------------------------------------------------
      var sheet2 = doc.getSheetByName("Sheet2");
      if (!sheet2) {
        sheet2 = doc.insertSheet("Sheet2");
      }

      // Initialize Headers if Sheet is new
      if (sheet2.getLastRow() === 0) {
        sheet2.appendRow([
          "Timestamp",
          "Reference ID",
          "Name",
          "Company",
          "Email",
          "Phone",
          "Subject",
          "Message"
        ]);
        sheet2.getRange(1, 1, 1, 8)
          .setFontWeight("bold")
          .setBackground("#D65A24")
          .setFontColor("#FFFFFF");
        sheet2.setFrozenRows(1);
      }

      var msgRefId = data.refNum || ("MSG-" + Math.floor(1000 + Math.random() * 9000));

      sheet2.appendRow([
        timestamp,
        msgRefId,
        data.name || "",
        data.company || "",
        data.email || "",
        data.phone || "",
        data.subject || "General Inquiry",
        data.message || ""
      ]);

      Logger.log("Row added to Sheet2 with Ref: " + msgRefId);

      // ---- Send Email Notification for General Inquiry ----
      try {
        var genSubject = "[Website Inquiry] " + msgRefId + " - " + (data.subject || "General Inquiry");
        var genBody = [
          "==================================================",
          "BAB AL KHIBRAH TRADING LLC - GENERAL MESSAGE",
          "==================================================",
          "Reference ID:  " + msgRefId,
          "Date & Time:   " + Utilities.formatDate(timestamp, "GMT+4", "dd/MM/yyyy HH:mm:ss") + " (UAE Time)",
          "From:          " + (data.name || "-"),
          "Company:       " + (data.company || "-"),
          "Email:         " + (data.email || "-"),
          "Phone:         " + (data.phone || "-"),
          "Subject:       " + (data.subject || "General Inquiry"),
          "",
          "--- MESSAGE CONTENT ---",
          (data.message || "No message body provided"),
          "=================================================="
        ].join("\n");

        MailApp.sendEmail({
          to: NOTIFICATION_EMAILS,
          subject: genSubject,
          body: genBody
        });
        Logger.log("General Inquiry Email dispatched.");
      } catch (mailErr2) {
        Logger.log("Email dispatch warning: " + mailErr2.toString());
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("FATAL doPost error: " + err.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ============================================================
// GET HANDLER (Health Check / Liveness)
// ============================================================
function doGet(e) {
  return ContentService.createTextOutput("Bab Al Khibrah Google Apps Script Web Service is Active and Running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
