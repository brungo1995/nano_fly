
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
        getFileButton.onclick = handleGetSpreadsheet;
        listSpreadsheetsFilesButton.onclick = handleListSpreadFiles;
        deleteSpreadsheetsFilesButton.onclick = handleDeleteSpreadFile;

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
        document.getElementById("folder_name").style.display = 'block';

        // listFiles();
        appendPre("SIGNED IN")
        // appendPre("SIGNED IN ! YEY!!")
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';

        listFoldersButton.style.display = 'none';
        clearButton.style.display = 'none';
        createFolderButton.style.display = 'none';
        deleteFolderButton.style.display = 'none';
        createFileButton.style.display = 'block';
        listFilesButton.style.display = 'none';
        getFileButton.style.display = 'block';
        document.getElementById("folder_name").style.display = 'none';

    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
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
            name: `${folderName}`,
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
 * CREATE SPREADSHEET
 */
function handleGetSpreadsheet() {
    handleClear()
    let docName = document.getElementById("spreadsheet_name").value;

    console.log(docName)
    gapi.client.request({
        path: `https://sheets.googleapis.com/v4/spreadsheets/${docName}`,
        method: "GET",
    }).then(function (response) {
        var title = response.result.properties.title;
        var id = response.result.spreadsheetId;
        appendPre(`${title} (${id})`);
        console.log(title, id);
    });
}

/**
 * GET SPREADSHEET
 */
function handleCreateSpreadsheet() {
    handleClear()
    let docName = document.getElementById("spreadsheet_name").value
    gapi.client.request({
        path: "https://sheets.googleapis.com/v4/spreadsheets",
        method: "post",
        body: {
            properties: {
                title: `${docName}`
            },
        }
    }).then(function (response) {
        appendPre('Spreadsheet Created ');
        console.log("CREATE SPREADSHEETS RES: ")
        console.log(response);
        var title = response.result.properties.title;
        var id = response.result.spreadsheetId;

        appendPre(`${title} (${id})`);

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


// gapi.client.request({
//     path: "https://www.googleapis.com/drive/v3/files",
//     method: "post",
//     body:{}
// }).then(function (response) {
//     appendPre('Files:');
//     var files = response.result.files;
//     if (files && files.length > 0) {
//         for (var i = 0; i < files.length; i++) {
//             var file = files[i];
//             appendPre(file.name + ' (' + file.id + ')');
//         }
//     } else {
//         appendPre('No files found.');
//     }
// });