var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
//var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
//**********************************
var SCOPES = ['https://www.googleapis.com/auth/drive'];
//**********************************
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';


// Get /login   -- Formulario de login
exports.new = function(req, res) {
  

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Drive API.
  authorize(JSON.parse(content), listFiles);
  //authorize(JSON.parse(content), uploadFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
 /* var clientSecret = 'e8TVUMbIRnk08qze1p0rea5K';
  var clientId =  '810646783029-qp2npnrgip07a1espoefcbs9cl84m62p.apps.googleusercontent.com';
  var redirectUrl = 'https://www.googleapis.com/drive/v2';
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);*/
  

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  var drive = google.drive('v3');
var folderId = '0B6hXLRUckkIFOHVnNzBqT0hWMzQ';
// insertion example
/*drive.files.create({
  resource: {
    title: 'Test',
    mimeType: 'text/plain'
  },
  media: {
    mimeType: 'text/plain',
    body: 'Hello World updated with metadata'
  },
  auth: auth
});*/
 var path = require("path");
 var mime = require('mime');
 console.log('CARPETA UPLOADS:');
var p = "./uploads"


fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }

    files.map(function (file) {
        return path.join(p, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile();
    }).forEach(function (file) {
      var DriveName=path.basename(file);
      var DriveMime=mime.lookup(file);
      var DrivePath="./"+file;
      console.log("%s (%s)", file, path.extname(file));
        console.log("NOmbre: %s (%s)", path.basename(file));
        console.log("mimeType: %s (%s)", mime.lookup(file));
        
     drive.files.create({
 resource: {
        name: DriveName,
        mimeType: DriveMime,
        parents: [ folderId ]
      },
      media: {
        mimeType: DriveMime,
        body: fs.createReadStream(DrivePath) // read streams are awesome!
      },
  auth: auth
});
  
      
        
    });
});




  
  console.log('aaaaaaa:');
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  },
  /*service.files.create({
      resource: {
        title: 'testimage.png',
        mimeType: 'image/png'
      },
      media: {
        mimeType: 'image/png',
        body: fs.createReadStream('./uploads/0acfc8c6670f0acc3126fe710963f7a4') // read streams are awesome!
      }
      },*/ function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.name, file.id);
      }
    }
  });
  
//  var fs = require('fs');
//var drive = google.drive({ version: 'v2', auth: oauth2Client });
function uploadFiles(auth) {
    var service = google.drive('v3');
  service.files.insert({
      resource: {
        title: 'testimage.png',
        mimeType: 'image/png'
      },
  media: {
    mimeType: 'image/png',
    body: fs.createReadStream('0acfc8c6670f0acc3126fe710963f7a4') // read streams are awesome!
  }
});
}
  
  
};

return;

}

// GET /quizes/statistics
exports.show = function(req, res) {
  res.render('photos');
}; 
/*
exports.show = function(req, res) {
  res.render('quizes/statistics', { statistics: statistics, errors: []});
}; */