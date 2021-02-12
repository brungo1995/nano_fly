
var CLIENT_ID = '268533544506-b9ebe7rme4t6c99jbksi03gb3fc5iu7h.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBbwCP7WsVophZAYHOH2oVw3pqUY9Xzklw';


// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// var SCOPES = 'https://www.googleapis.com/auth/drive.file';
var SCOPES = 'https://www.googleapis.com/auth/drive';


var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

// Folders
var listFoldersButton = document.getElementById('list_folders');
var createFolderButton = document.getElementById('create_folder');

//Files
var listSpreadsheetsFilesButton = document.getElementById('list_spread_files');
var listFilesButton = document.getElementById('list_files');
var createSheetButton = document.getElementById('create_sheet');


let fileId = "";

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
        createFolderButton.onclick = handleCreateFolder;

        // // File handlers
        createSheetButton.onclick = handleCreateSpreadsheetInsideFolder;
        listSpreadsheetsFilesButton.onclick = handleListSpreadFiles;

        populateFolderSelect()
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
        document.getElementById("share_file_section").style.display = 'none';



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
        document.getElementById("share_file_section").style.display = 'none';

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

function populateFolderSelect() {
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

            buildFolderSelectOptions(files);
        }
    });
}


function buildFolderSelectOptions(files) {
    let content = ``;
    content += `<option value="">Select Folder to create file in</option>`;
    (files || []).forEach(file => {
        content += `<option value="${file.id}">${file.name}</option>`
    });

    let folderSelect = document.getElementById("folder_names");
    folderSelect.innerHTML = content;
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
        content += `<th scope="row">${index + 1}</th>`;
        content += `<td>${name}</td>`;
        content += `<td>${id}</td>`;
        content += `<td>${type}</td>`;
        content += `<td style="padding-top: 6px;">`;
        content += `<div class="row" style="flex-wrap: nowrap">`;
        content += `<button type="button" class="btn btn-light btn-sm" onclick="handlePeopleWhoShare('${id}')">Shared with</button>`;
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
    fileId = id;

    gapi.client
        .request({
            path: `https://sheets.googleapis.com/v4/spreadsheets/${id || "1wQBMLcxyyIX8H6zTKPGf2F5jzVkdmkvZoAS4yVOMm3U"}?includeGridData=true`,
        })
        .then(function (response) {
            console.log(response);

            let sheetValues = (response.result.sheets[0].data[0].rowData || []).map(
                (row, rowIndex) =>
                    (row.values || []).map((column, columnIndex) => column.formattedValue)
            );

            // this sheetId must go inside the loop to extra the data otherwhite you can read sheet id from difference  pages
            let sheetId = response.result.sheets[0].properties.sheetId
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

            displaySheetValues(obj, id, sheetId)

            // console.log(data)

        });



}


function displaySheetValues(data, id, sheetId) {
    let content = ``;
    if (!data.headings || data.headings.length <= 0) {
        content += `<h3>No Data found</h3>`
    } else {
        content += buildSheetTableHead(data.headings);
        content += buildSheetTableBody(data.data, id, sheetId)

    }
    buildSheetTable(content)
}

function buildSheetTableHead(headings) {
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

function buildSheetTableBody(data, id, sheetId) {

    let content = ``;
    content += ` <tbody>`;

    (data || []).forEach((row, rowIndex) => {
        content += `<tr>`;

        content += `<td>${rowIndex + 1}</td>`;
        let ids = []
        for (var key of Object.keys(row)) {
            ids.push(`${key}_${rowIndex + 1}`);
            content += `<td>
                        <input type="text" class="form-control" value="${row[key]}" id="${key}_${rowIndex + 1}">
                    </td>`;
        }

        content += `<td >`;
        content += `<div class="row" style="flex-wrap: nowrap">`;


        content += `<button type="button" class="btn btn-light mr-2" onclick="handleUpdateRow('${id}', '${sheetId}', '${rowIndex + 1}','${rowIndex + 2}' ,'${ids}')">Save change</button>`;

        content += `<button type="button" class="btn btn-light  mr-2" onclick="handleDeleteRow('${rowIndex + 1}', '${sheetId}', '${id}')">Remove Row</button>`;
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
function handleCreateSpreadsheetInsideFolder() {
    const docName = document.getElementById("resource_name").value;
    let folderId = document.getElementById("folder_names").value;

    if (!folderId || folderId === "" || !docName || docName === "") {
        return
    }

    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files",
        method: "post",
        body: {
            parents: ["1dbdEe_502FizNHlH2N6yygoePi67WsBC"],
            name: `${docName || "Shopping List by you"}`,
            mimeType: "application/vnd.google-apps.spreadsheet",
        }
    }).then(function (response) {
        console.log("Created File Inside folder");
        console.log(response);
        const { id, name } = response.result
        let obj = {};
        obj.id = id
        obj.name = name;

        return obj
        // handleListSpreadFiles()
    }).then(result => {
        // cal create sheet
        handleCreateSheet(result)
    }).catch(error => {
        console.log("Failde to create file")
        console.log(error)
    });

}


function handleCreateSheet(createdSpreadsheetFileRes) {
    const docName = document.getElementById("resource_name").value
    const { id, name } = createdSpreadsheetFileRes;


    gapi.client
        .request({
            path: `https://sheets.googleapis.com/v4/spreadsheets/${id}:batchUpdate`,
            method: "post",
            body: {
                "requests": [
                    {
                        "updateCells": {
                            "range": {
                                "sheetId": 0,
                                "startRowIndex": 0,
                                "endRowIndex": 1
                            },
                            "rows": [
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
                            ],
                            "fields": "*"
                        }
                    }
                ]
            }

        }).then(function (response) {
            console.log("Created Sheet");
            console.log(response);
            handleListSpreadFiles()

        });

}

function handleCreateSpreadsheetCopy() {
    const docName = document.getElementById("resource_name").value

    gapi.client.request({
        path: "https://sheets.googleapis.com/v4/spreadsheets",
        method: "post",
        body: {
            // 1dbdEe_502FizNHlH2N6yygoePi67WsBC
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
    let isPurchased = document.getElementById("purchased").checked
    let productName = document.getElementById("product_name").value;

    gapi.client
        .request({
            path: `https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/Products!A1:B1:append?valueInputOption=USER_ENTERED`,
            method: "post",
            body: {
                values: [[productName, isPurchased]],
            },
        })
        .then(function (response) {
            console.log("Created Row");
            console.log(response);
            handleGetSheetData(fileId)
        })

}

/** SHARE SHEET */
function handleShareFile() {
    let email = document.getElementById("user_email").value
    let role = document.getElementById("roles").value
    gapi.client
        .request({
            path: `https://www.googleapis.com/drive/v3/files/${fileId}/permissions?emailMessage='Hey please accept my invitation to colaborate'`,
            method: "post",
            body: {
                role: role,
                type: "user",
                emailAddress: email,
            },
        })
        .then((response) => {
            console.log("Shared filed with " + email)
            console.log(response);
            handlePeopleWhoShare(fileId)
        });
}


/** UNSHARE FILE */
function handleUnshare(permissionId, fileId) {
    gapi.client
        .request({
            path: `https://www.googleapis.com/drive/v3/files/${fileId}/permissions/${permissionId}`,
            method: "delete",
        })
        .then((response) => {
            console.log("Removed share")
            console.log(response);
            handlePeopleWhoShare(fileId)
        });
}

/** UPDATE SHARE SHEET */
function handleUpdateShareFile(permissionId) {
    let role = document.getElementById(`role_${permissionId}`).value
    const path = `https://www.googleapis.com/drive/v3/files/${fileId}/permissions/${permissionId}?transferOwnership=${role === 'owner' ? true : false}`;
    console.log(path)
    gapi.client
        .request({
            path: path,
            method: "PATCH",
            body: {
                role: role,
            },
        })
        .then((response) => {
            // console.log("Shared filed with " + email)
            console.log(response);
            handlePeopleWhoShare(fileId)
        });
}


/**HANDLE PEOPLE LIST OF SHARED PEOPLE */
function handlePeopleWhoShare(id) {
    fileId = id;
    gapi.client
        .request({
            path: `https://www.googleapis.com/drive/v3/files/${id}?fields=*`,
        })
        .then(function (response) {
            console.log(response);
            let content = ``;
            content += buildTableHeadShareFile();
            content += buildTableBodyShareFile(response.result.permissions, id)
            buildShareFileTable(content)
        });
}

function buildTableHeadShareFile() {
    let content = ``;
    content += ` <thead class="thead-dark">`;
    content += `<tr>`;
    content += `<th scope="col">#</th>`;
    content += ` <th scope="col">Name</th>`;
    content += ` <th scope="col">Email</th>`;
    content += ` <th scope="col">Type</th>`;
    content += ` <th scope="col">Role</th>`;
    content += `<th scope="col">Actions</th>`;
    content += `</tr>`;
    content += `</thead>`;
    return content;
}

function buildTableBodyShareFile(data, fileId) {
    let content = ``;
    content += ` <tbody>`;

    (data || []).forEach((permission, index) => {
        const { displayName, emailAddress, role, type, id } = permission;

        content += `<tr>`;

        content += `<td>${index + 1}</td>`;
        content += `<td>${displayName}</td>`;
        content += `<td>${emailAddress}</td>`;
        content += `<td>${type}</td>`;

        if (role === 'owner') {
            content += `<td>Owner</td>`;
        } else {
            content += `<td>
            <select name="cars" id="role_${id}" onchange="handleChangeRole('${id}', this)">
                <option value="owner" ${role === "owner" ? "selected" : ""}>Owner</option>
                <option value="writer" ${role === "writer" ? "selected" : ""}>Writer</option>
                <option value="reader" ${role === "reader" ? "selected" : ""}>Reader</option>
            </select>            
        </td>`;
        }


        content += `<td style="padding-top: 6px;">`;
        content += `<div class="row" style="flex-wrap: nowrap">`;
        content += `<button type="button" class="btn btn-light btn-sm" onclick="handleUpdateShareFile('${id}'
        )" >Update</button>`;
        content += `<button type="button" class="btn btn-light btn-sm ml-2 mr-2" onclick="handleUnshare('${id}', '${fileId}')">Unshare</button>`;
        content += ` </div>`;
        content += `</td>`;

        content += `</tr>`;
    });

    content += ` </tbody>`;

    return content
}

function handleChangeRole(permissionId, role) {
    // console.log(" Changing")
    // console.log(permissionId, role)
}


function buildShareFileTable(content) {
    document.getElementById("share_file_section").style.display = 'flex';
    let table = document.getElementById("share_file__table");
    table.innerHTML = content;
}


/**UPDATE ROW */
function handleUpdateRow(fileId, sheetId, startRowIndex, endRowIndex, inputIds) {
    inputIds = inputIds.split(",");
    let values = (inputIds || []).map(inputId => {
        let value = document.getElementById(inputId).value;
        // can be better improved by instead of just receive an array from th click event, receive an obect
        // with the type of the property too, to use other user values not only stringValue, boolean as well
        // numbers
        return {
            "userEnteredValue": {
                "stringValue": value
            }
        }
    });

    gapi.client
        .request({
            path: `https://sheets.googleapis.com/v4/spreadsheets/${fileId}:batchUpdate`,
            method: "post",
            body: {
                "requests": [
                    {
                        "updateCells": {
                            "range": {
                                "sheetId": sheetId,
                                "startRowIndex": startRowIndex,
                                "endRowIndex": endRowIndex
                            },
                            "rows": [
                                {
                                    "values": values
                                }
                            ],
                            "fields": "*"
                        }
                    }
                ]
            }

        })
        .then(function (response) {
            console.log("UPDATED ROW")
            console.log(response);
            handleGetSheetData(fileId);
        })
}



/**DELETE ROW */
function handleDeleteRow(rowIndexStart, sheetId, fileId) {

    gapi.client
        .request({
            path: `https://sheets.googleapis.com/v4/spreadsheets/${fileId}:batchUpdate`,
            method: "post",
            body: {
                "requests": [
                    {
                        "deleteDimension": {
                            "range": {
                                "sheetId": sheetId,
                                "dimension": "ROWS",
                                "startIndex": rowIndexStart,
                                "endIndex": rowIndexStart + 1
                            }
                        }
                    }
                ],
            }
        })
        .then(function (response) {
            console.log("DELETED ROW")
            console.log(response);
            handleGetSheetData(fileId);
        })

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

    });

}


