
// nanosoft Account
var CLIENT_ID = '268533544506-b9ebe7rme4t6c99jbksi03gb3fc5iu7h.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBbwCP7WsVophZAYHOH2oVw3pqUY9Xzklw';


// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// var SCOPES = 'https://www.googleapis.com/auth/drive.file';
var SCOPES = 'https://www.googleapis.com/auth/drive';
// var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';


var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

// Folders
var listFoldersButton = document.getElementById('list_folders');
var clearButton = document.getElementById('clear');
var createFolderButton = document.getElementById('create_folder');
var deleteFolderButton = document.getElementById('delete_folder');

//Files
var createFileButton = document.getElementById('create_file');
var listFilesButton = document.getElementById('list_files');
var getFileButton = document.getElementById('get_file');
var listSpreadsheetsFilesButton = document.getElementById('list_spread_files');
var deleteSpreadsheetsFilesButton = document.getElementById('delete_spread_file');
var appendDataToFileButton = document.getElementById('append_data');
var shareFileButton = document.getElementById('share');
var unshareFileButton = document.getElementById('unshare');
var peopleWhoShareFileButton = document.getElementById('people_who_share');



/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        listFilesButton.onclick = listFiles;


        // Register folder handlers
        listFoldersButton.onclick = handleListFolders;
        clearButton.onclick = handleClear;
        createFolderButton.onclick = handleCreateFolder;
        deleteFolderButton.onclick = handleDeleteFolder;

        // File handlers
        createFileButton.onclick = handleCreateSpreadsheet;
        getFileButton.onclick = handleGetSheetData;
        // getFileButton.onclick = handleGetSpreadsheet;
        listSpreadsheetsFilesButton.onclick = handleListSpreadFiles;
        deleteSpreadsheetsFilesButton.onclick = handleDeleteSpreadFile;
        appendDataToFileButton.onclick = handleAppendNewRow;
        shareFileButton.onclick = handleShareFile;
        unshareFileButton.onclick = handleUnshare;
        peopleWhoShareFileButton.onclick = handlePeopleWhoShare;

    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';

        listFoldersButton.style.display = 'block';
        clearButton.style.display = 'block';
        createFolderButton.style.display = 'block';
        deleteFolderButton.style.display = 'block';
        createFileButton.style.display = 'block';
        getFileButton.style.display = 'block';
        listFilesButton.style.display = 'block';
        deleteSpreadsheetsFilesButton.style.display = 'block';
        listSpreadsheetsFilesButton.style.display = 'block';
        appendDataToFileButton.style.display = 'block';
        shareFileButton.style.display = 'block';
        unshareFileButton.style.display = 'block';
        peopleWhoShareFileButton.style.display = 'block';
        document.getElementById("folder_name").style.display = 'block';
        document.getElementById("spreadsheet_name").style.display = 'block';
        document.getElementById("sheet_name").style.display = 'block';
        document.getElementById("purchased_section").style.display = 'block';
        document.getElementById("product_name").style.display = 'block';
        document.getElementById("prod_table").style.display = 'table';


    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';

        listFoldersButton.style.display = 'none';
        clearButton.style.display = 'none';
        createFolderButton.style.display = 'none';
        deleteFolderButton.style.display = 'none';
        createFileButton.style.display = 'none';
        listFilesButton.style.display = 'none';
        getFileButton.style.display = 'none';
        deleteSpreadsheetsFilesButton.style.display = 'none';
        listSpreadsheetsFilesButton.style.display = 'none';
        appendDataToFileButton.style.display = 'none';
        shareFileButton.style.display = 'none';
        unshareFileButton.style.display = 'none';
        peopleWhoShareFileButton.style.display = 'none';
        document.getElementById("folder_name").style.display = 'none';
        document.getElementById("spreadsheet_name").style.display = 'none';
        document.getElementById("sheet_name").style.display = 'none';
        document.getElementById("purchased_section").style.display = 'none';
        document.getElementById("product_name").style.display = 'none';
        document.getElementById("prod_table").style.display = 'none';


    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    handleClear()
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    handleClear()
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function handleClear() {
    var pre = document.getElementById('content');
    pre.innerText = "";
}

/**
 * Print files.
 */
function listFiles() {
    handleClear()
    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files",
        method: "GET",
    }).then(function (response) {
        appendPre('Files:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No files found.');
        }
    });


}

/**
 * CREATE FOLDER
 */
function handleCreateFolder() {
    handleClear()
    const folderName = document.getElementById("folder_name").value
    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files",
        method: "post",
        body: {
            name: `${folderName || "New folder"}`,
            mimeType: "application/vnd.google-apps.folder"
        }
    }).then(function (response) {
        appendPre('Created Folder:');
        handleListFolders();
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No files found.');
        }
    });
}


/**
 * DELETE FOLDER
 */
function handleDeleteFolder() {
    handleClear()
    const folderName = document.getElementById("folder_name").value

    gapi.client.request({
        path: `https://www.googleapis.com/drive/v3/files/${folderName}`,
        method: "delete"
    }).then(function (response) {
        console.log(response)
        appendPre('DELETED Folder:');
        handleListFolders();
    });
}


/**
 * LIST FOLDERS
 */
function handleListFolders() {
    handleClear()
    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files?q=mimeType: 'application/vnd.google-apps.folder'",
    }).then(function (response) {
        appendPre('Files:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No Folders found.');
        }
    });

}


/**
 * GET SPREADSHEET
 */
function handleGetSpreadsheet() {
    handleClear()
    let docName = document.getElementById("spreadsheet_name").value;

    console.log(docName)
    gapi.client.request({
        // path: `https://sheets.googleapis.com/v4/spreadsheets/1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U`,
        path: `https://sheets.googleapis.com/v4/spreadsheets/${docName}`,
        method: "GET",
    }).then(function (response) {
        var title = response.result.properties.title;
        var id = response.result.spreadsheetId;
        console.log(response)

        appendPre(`${title} (${id})`);
        console.log(title, id);
    });
}


/**
 * Display Sheet data
 */
function handleGetSheetData() {
    let docId = document.getElementById("spreadsheet_name").value

    console.log("fetching data")
    gapi.client
        .request({
            path: `https://sheets.googleapis.com/v4/spreadsheets/${docId}?includeGridData=true`,
            // path: `https://sheets.googleapis.com/v4/spreadsheets/1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U?includeGridData=true`,
        })
        .then(function (response) {
            console.log(response);
            let sheetValues = response.result.sheets[0].data[0].rowData.map(
                (row, rowIndex) =>
                    row.values.map((column, columnIndex) => column.formattedValue)
            );
            const headings = sheetValues.shift();
            console.log(headings);

            let data = (sheetValues || []).map((row) => {
                let obj = {};
                row.forEach((colData, colIndex) => {
                    obj = { ...obj, [`${headings[colIndex]}`]: colData }
                })

                return obj
            });


            let obj = {
                headings: headings,
                data: data
            }

            displaySheetValues(obj)

            console.log(data)

        });

    // displaySheetValues({
    //     headings: ["Product Name", "Purchased"],
    //     data: [
    //         { "Product Name": "Mango", "Purchased": "TRUE" },
    //         { "Product Name": "Tuna", "Purchased": "FALSE" },
    //         { "Product Name": "Bread", "Purchased": "TRUE" }
    //     ]
    // })

}


function displaySheetValues(data) {
    let content = ``;
    let table = document.getElementById("prod_table");

    // Add headings
    content += "<tr>";
    (data.headings || []).forEach(heading => {
        content += `<th>${heading}</th>`
    });
    content += `</tr>`;

    // Adding rows
    (data.data || []).forEach(row => {
        content += "<tr>"
        for (var key of Object.keys(row)) {
            content += `<td>${row[key]}</td>`
            // console.log(key + " -> " + row[key])
        }
        content += "</tr>"
    })

    table.innerHTML = content;

}

function buildCreateSheet() {
    let docName = document.getElementById("spreadsheet_name").value
    let sheetName = document.getElementById("sheet_name").value
    let purchased = document.getElementById("purchased").checked

    let obj = {
        properties:
        {
            title: `${docName || "Shopping list"}`
        },

        sheets: [
            {
                properties:
                {
                    title: `${sheetName || "Products"}`
                },

                data: [
                    {
                        "startRow": 0, // 1st row
                        "startColumn": 0, // column 0
                        "rowData": [
                            {
                                values: [
                                    {
                                        userEnteredValue: {
                                            stringValue: "Product Name"
                                        }

                                    },
                                    {
                                        userEnteredValue: {
                                            stringValue: "Purchased"
                                        }

                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    // console.log(docName, sheetName, purchased)


    return obj
}

/**
 * CREATE SPREADSHEET
 */
function handleCreateSpreadsheet() {
    // console.log(buildCreateSheet())
    handleClear()
    gapi.client.request({
        path: "https://sheets.googleapis.com/v4/spreadsheets",
        method: "post",
        body: buildCreateSheet()
    }).then(function (response) {
        appendPre('Spreadsheet Created ');
        console.log("CREATE SPREADSHEETS RES: ")
        console.log(response);
        var title = response.result.properties.title;
        var id = response.result.spreadsheetId;

        appendPre(`${title} (${id})`);

    });
}

/** APPEND ROW */
function handleAppendNewRow() {
    let docId = document.getElementById("spreadsheet_name").value
    // let sheetName = document.getElementById("sheet_name").value
    let isPurchased = document.getElementById("purchased").checked
    let productName = document.getElementById("product_name").value


    // POST https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId/values/Sheet1!A1:E1:append?valueInputOption=USER_ENTERED
    gapi.client
        .request({
            // path: `https://sheets.googleapis.com/v4/spreadsheets/1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U/values/Products!A1:B1:append?valueInputOption=USER_ENTERED`,
            path: `https://sheets.googleapis.com/v4/spreadsheets/${docId}/values/Products!A1:B1:append?valueInputOption=USER_ENTERED`,
            method: "post",
            body: {
                // values: [["Tuna", false]],
                values: [[productName, isPurchased]],
            },
        })
        .then(function (response) {
            appendPre(`Appended data Successfully`);
            handleGetSpreadsheet();
            // console.log(response);
            // reRenderTable2();
        })
        .catch((error) => {
            appendPre(`Cannot append data to sheet`);
        });
}

/** SHARE SHEET */
function handleShareFile() {
    let docId = document.getElementById("spreadsheet_name").value;
    gapi.client
        .request({
            // path: `https://www.googleapis.com/drive/v3/files/1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U/permissions?emailMessage='Hey Jason did you get the invitation'`,
            path: `https://www.googleapis.com/drive/v3/files/${docId}/permissions?emailMessage='Hey Jason did you get the invitation'`,
            method: "post",
            body: {
                role: "writer",
                type: "user",
                // emailAddress: "jason@nanosoft.co.za",
                emailAddress: "brungo1995@gmail.com",
            },
        })
        .then((response) => {
            console.log("Shared filed")
            console.log(response);
        });
}


/** UNSHARE FILE */
function handleUnshare() {
    let docId = document.getElementById("spreadsheet_name").value;

    gapi.client
        .request({
            path: `https://www.googleapis.com/drive/v3/files/1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U/permissions/06295840178656814372`,
            // path: `https://www.googleapis.com/drive/v3/files/1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U/permissions/13934111265224148781`,
            method: "delete",
        })
        .then((response) => {
            console.log(response);
        });
}


/**HANDLE PEOPLE LIST OF SHARED PEOPLE */
function handlePeopleWhoShare() {
    let docId = document.getElementById("spreadsheet_name").value;
    gapi.client
        .request({
            // path: `https://www.googleapis.com/drive/v3/files/1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U?fields=*`,
            path: `https://www.googleapis.com/drive/v3/files/${docId}?fields=*`,
        })
        .then(function (response) {
            console.log(response)
            handleClear();
            (response.result.permissions || []).forEach(permission => {
                appendPre(`Name: ${permission.displayName} PermissionId: ${permission.id}`)
            })
            // console.log(response.result.permissions.map((perm) => perm.displayName));
        });
}


/**
 * LIST ALL SPREAD FILES
 */
function handleListSpreadFiles() {

    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files?q=mimeType: 'application/vnd.google-apps.spreadsheet'",
    }).then(function (response) {
        handleClear()
        appendPre('Spreadsheets:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No Spreadsheets found.');
        }
    });




}


/**
 * DELETE SPREADSHEET
 */
function handleDeleteSpreadFile() {
    handleClear()
    let docName = document.getElementById("spreadsheet_name").value

    gapi.client.request({
        path: `https://www.googleapis.com/drive/v3/files/${docName}`,
        method: "delete"
    }).then(function (response) {
        console.log(response)
        appendPre('DELETED File:');
        handleListSpreadFiles();
    });
}
