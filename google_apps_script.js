/**
 * BAB AL KHIBRAH TRADING LLC - BULLETPROOF GOOGLE SHEETS AUTOMATION SCRIPT
 * 
 * Target Google Sheet: BAB AL KHIBARH
 * - Sheet1: Detailed Material RFQ Submissions
 * - Sheet2: General Message Desk Submissions
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    
    // Safety check if active spreadsheet is null
    if (!doc) {
      // Optional: Replace with your actual Spreadsheet ID if using a standalone script
      // var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_FROM_URL";
      // doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    }

    var data = {};

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date();
    var formType = data.formType || "rfq"; // "rfq" -> Sheet1, "general" -> Sheet2

    if (formType === "rfq" || formType === "Sheet1") {
      // === TAB 1: DETAILED MATERIAL RFQ ===
      var sheet1 = doc.getSheetByName("Sheet1");
      if (!sheet1) {
        sheet1 = doc.insertSheet("Sheet1");
      }

      // Automatically create Header Row if empty
      if (sheet1.getLastRow() === 0) {
        sheet1.appendRow([
          "Timestamp",
          "Reference ID",
          "Contact Name",
          "Company Name",
          "Email Address",
          "Phone Number",
          "Material Family",
          "Target Grade",
          "Material Shape",
          "Dimensions (mm)",
          "Quantity",
          "Unit",
          "Sizing Requirement",
          "Certificate Spec",
          "Delivery City",
          "Additional Notes"
        ]);
        sheet1.getRange(1, 1, 1, 16).setFontWeight("bold").setBackground("#1C3B5E").setFontColor("#FFFFFF");
      }

      // Format dimensions list
      var dimStr = [];
      if (data.diameter) dimStr.push("Dia: " + data.diameter + "mm");
      if (data.thickness) dimStr.push("Thk: " + data.thickness + "mm");
      if (data.width) dimStr.push("W: " + data.width + "mm");
      if (data.length) dimStr.push("L: " + data.length + "mm");

      sheet1.appendRow([
        timestamp,
        data.refNum || ("RFQ-" + Math.floor(Math.random() * 10000)),
        data.name || data.contactName || "",
        data.companyName || data.company || "",
        data.email || "",
        data.phone || "",
        data.materialFamily || "",
        data.grade || "",
        data.form || "",
        dimStr.join(" | "),
        data.quantity || "",
        data.unit || "",
        data.cuttingRequirement || "",
        data.certificateRequirement || "",
        data.deliveryLocation || "",
        data.notes || ""
      ]);

      // Send email alert to kaleel@babalkhibrah.com
      sendNotificationEmail("kaleel@babalkhibrah.com", "New Material RFQ [" + (data.refNum || "Detailed RFQ") + "]", [
        "Reference ID: " + (data.refNum || "N/A"),
        "Contact: " + (data.name || "N/A") + " (" + (data.companyName || "N/A") + ")",
        "Email: " + (data.email || "N/A"),
        "Phone: " + (data.phone || "N/A"),
        "Material Family: " + (data.materialFamily || "N/A"),
        "Target Grade: " + (data.grade || "N/A"),
        "Shape: " + (data.form || "N/A"),
        "Dimensions: " + dimStr.join(" | "),
        "Quantity: " + (data.quantity || "N/A") + " " + (data.unit || ""),
        "Sizing Requirement: " + (data.cuttingRequirement || "N/A"),
        "Certificate Spec: " + (data.certificateRequirement || "N/A"),
        "Delivery City: " + (data.deliveryLocation || "N/A"),
        "Notes: " + (data.notes || "None")
      ].join("\n"));

    } else {
      // === TAB 2: GENERAL MESSAGE DESK ===
      var sheet2 = doc.getSheetByName("Sheet2");
      if (!sheet2) {
        sheet2 = doc.insertSheet("Sheet2");
      }

      // Automatically create Header Row if empty
      if (sheet2.getLastRow() === 0) {
        sheet2.appendRow([
          "Timestamp",
          "Reference ID",
          "Contact Name",
          "Company Name",
          "Email Address",
          "Phone Number",
          "Subject",
          "Message"
        ]);
        sheet2.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#D65A24").setFontColor("#FFFFFF");
      }

      sheet2.appendRow([
        timestamp,
        data.refNum || ("MSG-" + Math.floor(Math.random() * 10000)),
        data.name || "",
        data.company || "",
        data.email || "",
        data.phone || "",
        data.subject || "",
        data.message || ""
      ]);

      // Send email alert to kaleel@babalkhibrah.com
      sendNotificationEmail("kaleel@babalkhibrah.com", "New Message Desk [" + (data.refNum || "General Message") + "]", [
        "Reference ID: " + (data.refNum || "N/A"),
        "Contact Name: " + (data.name || "N/A"),
        "Company Name: " + (data.company || "N/A"),
        "Email Address: " + (data.email || "N/A"),
        "Phone Number: " + (data.phone || "N/A"),
        "Subject: " + (data.subject || "N/A"),
        "Message: " + (data.message || "N/A")
      ].join("\n"));
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Bab Al Khibrah Google Sheet Apps Script Service is Active.");
}

function sendNotificationEmail(toEmail, subject, bodyText) {
  try {
    MailApp.sendEmail({
      to: toEmail,
      subject: "[Website Inquiry] " + subject,
      body: "Bab Al Khibrah B2B Website Inquiry Received:\n\n" + bodyText + "\n\nThis entry has been logged into your 'BAB AL KHIBARH' Google Sheet automatically."
    });
  } catch (err) {
    Logger.log("Email Error: " + err.toString());
  }
}

/**
 * TEST FUNCTION - Click "Run" on this function inside Apps Script Editor to test saving data!
 */
function testRun() {
  var dummyPayload = {
    postData: {
      contents: JSON.stringify({
        formType: "rfq",
        refNum: "RFQ-TEST-9999",
        name: "Kaleel Test Buyer",
        companyName: "Sharjah Precision CNC",
        email: "kaleel@babalkhibrah.com",
        phone: "+971 50 575 1347",
        materialFamily: "Alloy Steels",
        grade: "EN19 / 4140",
        form: "Round bars",
        diameter: "120",
        length: "500",
        quantity: "5",
        unit: "Pieces (pcs)",
        notes: "Test automated entry from Apps Script editor"
      })
    }
  };
  var response = doPost(dummyPayload);
  Logger.log("Test Output: " + response.getContent());
}
