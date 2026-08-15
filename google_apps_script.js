/**
 * BAB AL KHIBRAH TRADING LLC - BULLETPROOF GOOGLE SHEETS & DRIVE AUTOMATION SCRIPT
 *
 * Target Google Sheet: BAB AL KHIBARH
 * - Sheet1: Detailed Material RFQ Submissions
 * - Sheet2: General Message Desk Submissions
 * - Target Google Drive Folder ID: 16AXtB_mmPgOTheDrSzS-Pfsk8FbddqJ9
 *
 * HOW TO USE:
 * 1. Open your Google Sheet "BAB AL KHIBARH"
 * 2. Copy the Sheet ID from the URL: docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
 * 3. Paste it into the SPREADSHEET_ID variable below
 * 4. Save and redeploy as Web App (New version)
 */

// ============================================================
// ONE-TIME DRIVE AUTHORIZATION FUNCTION
// ============================================================
function testDriveUpload() {
  var DRIVE_FOLDER_ID = "16AXtB_mmPgOTheDrSzS-Pfsk8FbddqJ9";
  var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  var dummyBlob = Utilities.newBlob("Bab Al Khibrah Google Drive test connection.", "text/plain", "TEST_CONNECTION.txt");
  var testFile = folder.createFile(dummyBlob);
  Logger.log("SUCCESS! Test file created: " + testFile.getUrl());
}

// ============================================================
// DIAGNOSTIC TEST - Run this from editor to test doPost flow
// ============================================================
function testFullFlow() {
  var dummyPayload = {
    postData: {
      contents: JSON.stringify({
        formType: "rfq",
        refNum: "RFQ-FULLTEST-001",
        name: "Test Buyer",
        companyName: "Test Steel Co.",
        email: "kaleel@babalkhibrah.com",
        phone: "+971 50 575 1347",
        materialFamily: "Alloy Steels",
        grade: "EN19 / 4140",
        form: "Round bars",
        diameter: "120",
        length: "500",
        quantity: "5",
        unit: "Pieces",
        notes: "Full flow test including file",
        files: [
          {
            filename: "test_drawing.txt",
            mimeType: "text/plain",
            base64: Utilities.base64Encode("This is a test file from Bab Al Khibrah Apps Script")
          }
        ]
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
  lock.tryLock(10000);

  try {
    Logger.log("doPost called at: " + new Date().toString());

    // ---- Parse incoming data ----
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        Logger.log("Parsed JSON successfully. formType=" + data.formType + " files count=" + (data.files ? data.files.length : 0));
      } catch (jsonErr) {
        Logger.log("JSON parse error: " + jsonErr.toString());
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
      Logger.log("Using e.parameter instead of postData");
    } else {
      Logger.log("WARNING: No data received in request");
    }

    var timestamp = new Date();
    var formType = data.formType || "rfq";

    // ---- Access Google Spreadsheet (BAB AL KHIBARH) ----
    var SPREADSHEET_ID = "1e3mlxUpJfsi1vr5JyJzXAfMBBz3qKwbUG8CLtrs19h0";
    var doc = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (formType === "rfq" || formType === "Sheet1") {
      // ---- DRIVE FILE UPLOAD ----
      var DRIVE_FOLDER_ID = "16AXtB_mmPgOTheDrSzS-Pfsk8FbddqJ9";
      var uploadedDriveUrls = [];
      var driveFolder = null;

      Logger.log("Attempting to access Drive folder: " + DRIVE_FOLDER_ID);
      try {
        driveFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        Logger.log("Drive folder accessed successfully: " + driveFolder.getName());
      } catch (fErr) {
        Logger.log("Drive folder access error: " + fErr.toString());
        // Fallback: create/find folder by name
        try {
          var rootFolders = DriveApp.getFoldersByName("Bab Al Khibrah RFQ Uploads");
          driveFolder = rootFolders.hasNext() ? rootFolders.next() : DriveApp.createFolder("Bab Al Khibrah RFQ Uploads");
          Logger.log("Using fallback folder: " + driveFolder.getName());
        } catch (subErr) {
          Logger.log("Fallback folder error: " + subErr.toString());
        }
      }

      Logger.log("Files in payload: " + (data.files ? data.files.length : "none"));

      if (data.files && Array.isArray(data.files) && data.files.length > 0) {
        if (driveFolder) {
          for (var fIdx = 0; fIdx < data.files.length; fIdx++) {
            try {
              var fileDataObj = data.files[fIdx];
              Logger.log("Processing file " + (fIdx + 1) + ": " + fileDataObj.filename + " (" + fileDataObj.mimeType + ") base64 length=" + (fileDataObj.base64 ? fileDataObj.base64.length : 0));
              if (fileDataObj.base64 && fileDataObj.filename) {
                var fileBytes = Utilities.base64Decode(fileDataObj.base64);
                var blob = Utilities.newBlob(
                  fileBytes,
                  fileDataObj.mimeType || "application/octet-stream",
                  (data.refNum ? data.refNum + "_" : "") + fileDataObj.filename
                );
                var createdDriveFile = driveFolder.createFile(blob);
                try { createdDriveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch(shareErr) {}
                uploadedDriveUrls.push(createdDriveFile.getUrl());
                Logger.log("File uploaded to Drive: " + createdDriveFile.getUrl());
              }
            } catch (fileUploadErr) {
              Logger.log("File upload error for " + (data.files[fIdx] ? data.files[fIdx].filename : "unknown") + ": " + fileUploadErr.toString());
              uploadedDriveUrls.push("Upload Error: " + fileUploadErr.toString());
            }
          }
        } else {
          Logger.log("No Drive folder available - cannot upload files");
          uploadedDriveUrls.push("Drive folder not accessible");
        }
      } else {
        Logger.log("No files in payload");
        uploadedDriveUrls.push("No files attached");
      }

      // ---- WRITE TO SPREADSHEET ----
      if (doc) {
        try {
          var sheet1 = doc.getSheetByName("Sheet1");
          if (!sheet1) {
            sheet1 = doc.insertSheet("Sheet1");
          }
          if (sheet1.getLastRow() === 0) {
            sheet1.appendRow(["Timestamp","Reference ID","Contact Name","Company Name","Email","Phone","Material Family","Grade","Shape","Dimensions","Quantity","Unit","Sizing","Certificate","Delivery","Notes","Drive File Links"]);
            sheet1.getRange(1,1,1,17).setFontWeight("bold").setBackground("#1C3B5E").setFontColor("#FFFFFF");
          }
          var dimStr = [];
          if (data.diameter) dimStr.push("Dia: " + data.diameter + "mm");
          if (data.thickness) dimStr.push("Thk: " + data.thickness + "mm");
          if (data.width) dimStr.push("W: " + data.width + "mm");
          if (data.length) dimStr.push("L: " + data.length + "mm");

          sheet1.appendRow([
            timestamp, data.refNum || "RFQ-" + Math.floor(Math.random()*10000),
            data.name || "", data.companyName || data.company || "",
            data.email || "", data.phone || "",
            data.materialFamily || "", data.grade || "", data.form || "",
            dimStr.join(" | "), data.quantity || "", data.unit || "",
            data.cuttingRequirement || "", data.certificateRequirement || "",
            data.deliveryLocation || "", data.notes || data.additionalNotes || "",
            uploadedDriveUrls.join("\n")
          ]);
          Logger.log("Row written to Sheet1 successfully");
        } catch (sheetErr) {
          Logger.log("Sheet write error: " + sheetErr.toString());
        }
      }

      // ---- SEND EMAIL ----
      try {
        var emailBody = [
          "Reference ID: " + (data.refNum || "N/A"),
          "Contact: " + (data.name || "N/A") + " (" + (data.companyName || "N/A") + ")",
          "Email: " + (data.email || "N/A"),
          "Phone: " + (data.phone || "N/A"),
          "Material: " + (data.materialFamily || "N/A") + " | Grade: " + (data.grade || "N/A"),
          "Shape: " + (data.form || "N/A") + " | Qty: " + (data.quantity || "N/A") + " " + (data.unit || ""),
          "Notes: " + (data.notes || data.additionalNotes || "None"),
          "Drive Uploads:\n" + (uploadedDriveUrls.join("\n") || "None")
        ].join("\n");

        MailApp.sendEmail({
          to: "kaleel@babalkhibrah.com",
          subject: "[Website RFQ] " + (data.refNum || "New Inquiry"),
          body: "Bab Al Khibrah - New RFQ Received:\n\n" + emailBody
        });
        Logger.log("Email sent to kaleel@babalkhibrah.com");
      } catch (mailErr) {
        Logger.log("Email error: " + mailErr.toString());
      }

    } else {
      // ---- GENERAL MESSAGE (Sheet2) ----
      if (doc) {
        try {
          var sheet2 = doc.getSheetByName("Sheet2");
          if (!sheet2) sheet2 = doc.insertSheet("Sheet2");
          if (sheet2.getLastRow() === 0) {
            sheet2.appendRow(["Timestamp","Reference ID","Name","Company","Email","Phone","Subject","Message"]);
            sheet2.getRange(1,1,1,8).setFontWeight("bold").setBackground("#D65A24").setFontColor("#FFFFFF");
          }
          sheet2.appendRow([timestamp, data.refNum || "MSG-" + Math.floor(Math.random()*10000), data.name||"", data.company||"", data.email||"", data.phone||"", data.subject||"", data.message||""]);
        } catch(sheetErr2) {
          Logger.log("Sheet2 write error: " + sheetErr2.toString());
        }
      }
      try {
        MailApp.sendEmail({ to: "kaleel@babalkhibrah.com", subject: "[Website Message] " + (data.subject || "General Inquiry"), body: "Name: " + (data.name||"") + "\nEmail: " + (data.email||"") + "\nMessage: " + (data.message||"") });
      } catch(mailErr2) { Logger.log("Email error: " + mailErr2.toString()); }
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success", driveFiles: uploadedDriveUrls || [] })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("FATAL doPost error: " + err.toString() + "\nStack: " + err.stack);
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Bab Al Khibrah Google Sheet Apps Script Service is Active.");
}
