
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
// var clearButton = document.getElementById('clear');
var createFolderButton = document.getElementById('create_folder');
// var deleteFolderButton = document.getElementById('delete_folder');

//Files
var listSpreadsheetsFilesButton = document.getElementById('list_spread_files');
var listFilesButton = document.getElementById('list_files');
// var getFileButton = document.getElementById('get_file');
var createSheetButton = document.getElementById('create_sheet');
// var deleteSpreadsheetsFilesButton = document.getElementById('delete_spread_file');
// var appendDataToFileButton = document.getElementById('append_data');
// var shareFileButton = document.getElementById('share');
// var unshareFileButton = document.getElementById('unshare');
// var peopleWhoShareFileButton = document.getElementById('people_who_share');
// var updateFileButton = document.getElementById('update');
// var deleteLastRowFileButton = document.getElementById('delete_last_row');



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


        // // Register folder handlers
        listFoldersButton.onclick = handleListFolders;
        // clearButton.onclick = handleClear;
        createFolderButton.onclick = handleCreateFolder;
        // deleteFolderButton.onclick = handleDeleteFolder;

        // // File handlers
        createSheetButton.onclick = handleCreateSpreadsheet;
        // getFileButton.onclick = handleGetSheetData;
        // // getFileButton.onclick = handleGetSpreadsheet;
        listSpreadsheetsFilesButton.onclick = handleListSpreadFiles;
        // deleteSpreadsheetsFilesButton.onclick = handleDeleteSpreadFile;
        // appendDataToFileButton.onclick = handleAppendNewRow;
        // shareFileButton.onclick = handleShareFile;
        // unshareFileButton.onclick = handleUnshare;
        // peopleWhoShareFileButton.onclick = handlePeopleWhoShare;
        // updateFileButton.onclick = handleUpdateRow;
        // deleteLastRowFileButton.onclick = handleDeleteRow;

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
        head_controls.style.display = 'flex';

        listFoldersButton.style.display = 'block';
        // clearButton.style.display = 'block';
        createFolderButton.style.display = 'block';
        // deleteFolderButton.style.display = 'block';
        createSheetButton.style.display = 'block';
        // getFileButton.style.display = 'block';
        listFilesButton.style.display = 'block';
        // deleteSpreadsheetsFilesButton.style.display = 'block';
        listSpreadsheetsFilesButton.style.display = 'block';
        // appendDataToFileButton.style.display = 'block';
        // shareFileButton.style.display = 'block';
        // unshareFileButton.style.display = 'block';
        // peopleWhoShareFileButton.style.display = 'block';
        // updateFileButton.style.display = 'block';
        // deleteLastRowFileButton.style.display = 'block';
        // document.getElementById("folder_name").style.display = 'block';
        // document.getElementById("spreadsheet_name").style.display = 'block';
        // document.getElementById("sheet_name").style.display = 'block';
        // document.getElementById("purchased_section").style.display = 'block';
        // document.getElementById("product_name").style.display = 'block';
        // document.getElementById("prod_table").style.display = 'table';

        // Tables
        document.getElementById("list_files_section").style.display = 'none';
        document.getElementById("file_detail_section").style.display = 'none';



    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        head_controls.style.display = 'none';

        listFoldersButton.style.display = 'none';
        // clearButton.style.display = 'none';
        // createFolderButton.style.display = 'none';
        // deleteFolderButton.style.display = 'none';
        createSheetButton.style.display = 'none';
        listFilesButton.style.display = 'none';
        // getFileButton.style.display = 'none';
        // deleteSpreadsheetsFilesButton.style.display = 'none';
        listSpreadsheetsFilesButton.style.display = 'none';
        // appendDataToFileButton.style.display = 'none';
        // shareFileButton.style.display = 'none';
        // unshareFileButton.style.display = 'none';
        // peopleWhoShareFileButton.style.display = 'none';
        // updateFileButton.style.display = 'none';
        // deleteLastRowFileButton.style.display = 'none';
        // document.getElementById("folder_name").style.display = 'none';
        // document.getElementById("spreadsheet_name").style.display = 'none';
        // document.getElementById("sheet_name").style.display = 'none';
        // document.getElementById("purchased_section").style.display = 'none';
        // document.getElementById("product_name").style.display = 'none';
        // document.getElementById("prod_table").style.display = 'none';


        // Tables
        document.getElementById("list_files_section").style.display = 'none';
        document.getElementById("file_detail_section").style.display = 'none';

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
    document.getElementById("list_files_section").style.display = 'none';
    document.getElementById("list_files_section").style.display = 'flex';

    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files",
        method: "GET",
    }).then(function (response) {
        let files = response.result.files;
        console.log(response)

        let content = ``;
        content += buildListFilesTableHead()

        if (files && files.length <= 0) {
            content += ``;
        } else {

            files = (response.result.files || []).map((file => {
                const { id, name, mimeType } = file;
                let obj = {};
                obj['id'] = id;
                obj['name'] = name;
                obj['mimeType'] = mimeType;
                obj['type'] = mimeType.toLowerCase().includes('folder') ? "🗂️" : "📗 "
                return obj
            }));

            content += buildListTableBody(files)
        }

        buildListTable(content)
    });


}

/**
 * CREATE FOLDER
 */
function handleCreateFolder() {
    const folderName = document.getElementById("resource_name").value
    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files",
        method: "post",
        body: {
            name: `${folderName || "New folder"}`,
            mimeType: "application/vnd.google-apps.folder"
        }
    }).then(function (response) {
        console.log("Created Folder");
        console.log(response);
        handleListFolders()
    });
}




function buildListFilesTableHead() {
    let content = ``;
    content += ` <thead class="thead-dark">`;
    content += `<tr>`;
    content += `<th scope="col">#</th>`;
    content += `<th scope="col">Name</th>`;
    content += `<th scope="col">Id</th>`;
    content += `<th scope="col">Resource Type</th>`;
    content += `<th scope="col">Actions</th>`;
    content += `</tr>`;
    content += `</thead>`;
    return content;
}

function buildListTableBody(files) {
    let content = ``;
    content += ` <tbody>`;
    files.forEach((file, index) => {
        const { name, type, id, mimeType } = file
        content += `<tr>`;
        content += `<th scope="row">${index}</th>`;
        content += `<td>${name}</td>`;
        content += `<td>${id}</td>`;
        content += `<td>${type}</td>`;
        content += `<td style="padding-top: 6px;">`;
        content += `<div class="row" style="flex-wrap: nowrap">`;
        content += `<button type="button" class="btn btn-light btn-sm">Shared with</button>`;
        content += `<button type="button" class="btn btn-light btn-sm ml-2" onclick="getFile('${id}', '${mimeType}')">Display</button>`;
        content += `<button type="button" class="btn btn-light btn-sm ml-2 mr-2" onclick="deleteFile('${id}', '${mimeType}')">Delete file</button>`;
        content += ` </div>`;
        content += `</td>`;
        content += `</tr>`;
    });
    content += ` </tbody>`;

    return content
}

function buildListTable(content) {
    let table = document.getElementById("list_files_table");
    table.innerHTML = content;
}

/**
 * LIST FOLDERS
 */
function handleListFolders() {
    document.getElementById("list_files_section").style.display = 'flex';
    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files?q=mimeType: 'application/vnd.google-apps.folder'",
    }).then(function (response) {
        let files = response.result.files;
        console.log("Folders result")
        console.log(response)

        let content = ``;
        content += buildListFilesTableHead()

        if (files && files.length <= 0) {
            content += ``;
        } else {

            files = (response.result.files || []).map((file => {
                const { id, name, mimeType } = file;
                let obj = {};
                obj['id'] = id;
                obj['name'] = name;
                obj['mimeType'] = mimeType;
                obj['type'] = "🗂️"
                return obj
            }));

            content += buildListTableBody(files)
        }

        buildListTable(content)



    });

}

function displayFolderData(id) {

}

function buildTableHeadForFolderDetails() {
    let content = ``;
    content += ` <thead class="thead-dark">`;
    content += `<tr>`;
    content += `<th scope="col">#</th>`;
    content += `<th scope="col">Name</th>`;
    content += ` <th scope="col">Created at</th>`;
    content += `<th scope="col">Last Modified by</th>`;
    content += `<th scope="col">Modified time</th>`;
    content += `<th scope="col">Owned by me</th>`;
    content += `<th scope="col">Actions</th>`;
    content += `</tr>`;
    content += `</thead>`;
    return content;
}


function buildTableBodyForFolderDetails(file) {
    let content = ``;
    content += ` <tbody>`;

    // files.forEach((file, index) => {
    const { name, createdTime, lastModifyingUser, modifiedTime, ownedByMe } = file
    content += `<tr>`;
    content += `<th scope="row">${1}</th>`;
    content += `<td>${name}</td>`;
    content += `<td>${createdTime}</td>`;
    content += `<td>${lastModifyingUser}</td>`;
    content += `<td>${modifiedTime}</td>`;
    content += `<td>${ownedByMe ? "👍" : "❌ "}</td>`;
    content += `<td style="padding-top: 6px;">`;
    content += `<div class="row" style="flex-wrap: nowrap">`;
    content += `<button type="button" class="btn btn-light btn-sm">Edit Share</button>`;
    content += ` </div>`;
    content += `</td>`;
    content += `</tr>`;
    // });

    content += ` </tbody>`;

    return content
}

function buildFileDetailTable(content) {
    let table = document.getElementById("file_detail_table");
    table.innerHTML = content;
}

/**GET FOLDER  */
function getFolder(id) {
    document.getElementById("file_detail_section").style.display = 'flex';

    gapi.client.request({
        path: `https://www.googleapis.com/drive/v3/files/${id || "1vH-s7vuXt-g2_A2QSPyNSBsOgrdxSDQB"}?fields=*`,
        method: "GET",
    }).then(function (response) {
        console.log('Folder result')
        console.log(response);
        const { createdTime, name, lastModifyingUser, modifiedTime, ownedByMe, owners, permissionIds, permissions } = response.result;
        let content = ``;
        let obj = {};
        obj['name'] = name;
        obj['createdTime'] = createdTime;
        obj['lastModifyingUser'] = lastModifyingUser.displayName
        obj['modifiedTime'] = modifiedTime
        obj['ownedByMe'] = ownedByMe

        content += buildTableHeadForFolderDetails();
        content += buildTableBodyForFolderDetails(obj);
        buildFileDetailTable(content);
    });
}

/**GET ANY FILE */
function getFile(id, mimeType) {
    if (mimeType.toLowerCase().includes('folder')) {
        getFolder(id)
    }

    else {
        handleGetSheetData(id)
        // handleGetSpreadsheet(id)
    }

}

/** DELETE FILE */
function deleteFile(id, mimeType) {
    gapi.client.request({
        path: `https://www.googleapis.com/drive/v3/files/${id}`,
        method: "delete"
    }).then(function (response) {
        console.log(response)
        if (mimeType.toLowerCase().includes('folder')) {
            handleListFolders()
            return
        }

        handleListSpreadFiles()

    });
}




/**
 * Display Sheet data
 */
function handleGetSheetData(id) {

    gapi.client
        .request({
            path: `https://sheets.googleapis.com/v4/spreadsheets/${id || "1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U"}?includeGridData=true`,
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

            // console.log(data)

        });



}


function displaySheetValues(data) {
    let content = ``;
    content += buildTableHeadForSheet(data.headings);
    content += buildTableBodySheet(data.data)
    buildSheetTable(content)
}

function buildTableHeadForSheet(headings) {
    let content = ``;
    content += ` <thead class="thead-dark">`;
    content += `<tr>`;
    content += `<th scope="col">#</th>`;
    (headings || []).forEach((heading => {
        content += ` <th scope="col">${heading}</th>`;
    }));
    content += `<th scope="col">Actions</th>`;
    content += `</tr>`;
    content += `</thead>`;
    return content;
}

function buildTableBodySheet(data) {
    let content = ``;
    content += ` <tbody>`;

    (data || []).forEach((row, index) => {
        content += `<tr>`;

        content += `<td>${index + 1}</td>`;

        for (var key of Object.keys(row)) {
            content += `<td>
                        <input type="text" class="form-control" value="${row[key]}">
                    </td>`;
        }

        // content += `<td style="padding-top: 6px;">`;
        content += `<td >`;
        content += `<div class="row" style="flex-wrap: nowrap">`;
        // content += `<button type="button" class="btn btn-light mr-2">Edit Share</button>`;
        content += `<button type="button" class="btn btn-light mr-2">Save change</button>`;
        content += `<button type="button" class="btn btn-light  mr-2">Remove Row</button>`;
        content += ` </div>`;
        content += `</td>`;

        content += `</tr>`;
    });

    content += ` </tbody>`;

    return content
}

function buildSheetTable(content) {
    document.getElementById("file_detail_section").style.display = 'flex';
    let table = document.getElementById("file_detail_table");
    table.innerHTML = content;
}



/**
 * CREATE SPREADSHEET
 */
function handleCreateSpreadsheet() {
    const docName = document.getElementById("resource_name").value

    gapi.client.request({
        path: "https://sheets.googleapis.com/v4/spreadsheets",
        method: "post",
        body: {
            properties:
            {
                title: `${docName || "Shopping List by you"}`
            },

            sheets: [
                {
                    properties:
                    {
                        title: `${"Products"}`
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
        // body: buildCreateSheet()
    }).then(function (response) {
        console.log("Created Sheet");
        console.log(response);
        handleListSpreadFiles()

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
            path: `https://www.googleapis.com/drive/v3/files/${docId}/permissions/06295840178656814372`,
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



/**UPDATE ROW */
function handleUpdateRow() {
    let docId = document.getElementById("spreadsheet_name").value
    // let sheetName = document.getElementById("sheet_name").value
    let isPurchased = document.getElementById("purchased").checked
    let productName = document.getElementById("product_name").value

    gapi.client
        .request({
            path: `https://sheets.googleapis.com/v4/spreadsheets/1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U/values/Products!A5:B5?valueInputOption=USER_ENTERED`,
            method: "put",
            body: {
                // "range": "Products!A4:B4",
                values: [["Rice", true]],
                // range: "A5:B5",
                // values: [[productName, isPurchased]],
            },
        })
        .then(function (response) {
            console.log(response);
            // appendPre(`Appended data Successfully`);
            handleGetSpreadsheet();
        })
        .catch((error) => {
            appendPre(`Cannot append data to sheet`);
        });
}

/**DELETE ROW */
function handleDeleteRow() {
    let docId = document.getElementById("spreadsheet_name").value
    let isPurchased = document.getElementById("purchased").checked
    let productName = document.getElementById("product_name").value

    gapi.client
        .request({
            // POST https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId:batchUpdate
            path: `https://sheets.googleapis.com/v4/spreadsheets/1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U:batchUpdate`,
            method: "post",
            body: {
                "requests": [
                    {
                        "deleteDimension": {
                            "range": {
                                // A sheet's sheetId can be retrieved using the spreadsheet.get method.
                                "sheetId": 1837341742,
                                "dimension": "ROWS",
                                "startIndex": 3,
                                "endIndex": 4
                            }
                        }
                    }
                ],
            }
        })
        .then(function (response) {
            console.log("DELETED ROW")
            console.log(response);
            // appendPre(`Appended data Successfully`);
            handleGetSheetData();
        })
        .catch((error) => {
            appendPre(`Cannot delete row`);
        });
}


/**
 * LIST ALL SPREAD FILES
 */
function handleListSpreadFiles() {
    document.getElementById("list_files_section").style.display = 'none';
    document.getElementById("list_files_section").style.display = 'flex';

    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files?q=mimeType: 'application/vnd.google-apps.spreadsheet'",
    }).then(function (response) {
        let files = response.result.files;
        console.log(response)

        let content = ``;
        content += buildListFilesTableHead()

        if (files && files.length <= 0) {
            content += ``;
        } else {

            files = (response.result.files || []).map((file => {
                const { id, name, mimeType } = file;
                let obj = {};
                obj['id'] = id;
                obj['name'] = name;
                obj['mimeType'] = mimeType;
                obj['type'] = "📗 "
                return obj
            }));

            content += buildListTableBody(files)
        }

        buildListTable(content)


        // var files = response.result.files;
        // if (files && files.length > 0) {
        //     for (var i = 0; i < files.length; i++) {
        //         var file = files[i];
        //         appendPre(file.name + ' (' + file.id + ')');
        //     }
        // } else {
        //     appendPre('No Spreadsheets found.');
        // }
    });

}


