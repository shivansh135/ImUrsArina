/**
 * Search file in drive location
 * @return{obj} data file
 * */

async function searchFile() {
    const {GoogleAuth} = require('google-auth-library');
    const {google} = require('googleapis');
  
    // Get credentials and build service
    // TODO (developer) - Use appropriate auth mechanism for your app
    const auth = new GoogleAuth({
        keyFile: './credentials.json',
        scopes: 'https://www.googleapis.com/auth/drive',
    });
    const service = google.drive({version: 'v3', auth});
    const files = [];
    try {
      const res = await service.files.list({
        q: "'1rw7lkHsNKQCw9Cwa-zDW-Ue4UzJrdJ27' in parents",
        fields: 'nextPageToken, files(id, name, mimeType)',
        spaces: 'drive',

      });
      Array.prototype.push.apply(files, res.files);
      res.data.files.forEach(function(file) {
        console.log('Found file:', file.name, file.id, file.mimeType);
      });
      return res.data.files;
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
  }

  async function searchFiles(id) {
    const {GoogleAuth} = require('google-auth-library');
    const {google} = require('googleapis');
  
    // Get credentials and build service
    // TODO (developer) - Use appropriate auth mechanism for your app
    const auth = new GoogleAuth({
        keyFile: './credentials.json',
        scopes: 'https://www.googleapis.com/auth/drive',
    });
    const service = google.drive({version: 'v3', auth});
    const files = [];
    try {
      const res = await service.files.list({
        q: "'" + id +"' " + "in parents",
        fields: 'nextPageToken, files(id, name, mimeType)',
        spaces: 'drive',

      });
      Array.prototype.push.apply(files, res.files);
      res.data.files.forEach(function(file) {
        console.log('Found file:', file.name, file.id, file.mimeType);
      });
      return res.data.files;
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
  }

/**
 * Downloads a file
 * @param{string} realFileId file ID
 * @return{obj} file status
 * */
async function downloadFile(realFileId) {
    // Get credentials and build service
    // TODO (developer) - Use appropriate auth mechanism for your app
  
    const {GoogleAuth} = require('google-auth-library');
    const {google} = require('googleapis');
  
    const auth = new GoogleAuth({
        keyFile: './credentials.json',
        scopes: 'https://www.googleapis.com/auth/drive',
    });
    const service = google.drive({version: 'v3', auth});
  
    //fileId = realFileId;
    try {
      const file = await service.files.get({
        fileId: realFileId,
        alt: 'media',
      });
      //console.log(ty);
      return file;
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
  }

  async function updateFile(realFileId, newContent) {
    // Get credentials and build service
    // TODO (developer) - Use appropriate auth mechanism for your app
  
    const {GoogleAuth} = require('google-auth-library');
    const {google} = require('googleapis');
  
    const auth = new GoogleAuth({
        keyFile: './credentials.json',
        scopes: 'https://www.googleapis.com/auth/drive',
    });
    const service = google.drive({version: 'v3', auth});
  
    try {
      // convert newContent to a base64 encoded string
  
      // update the file on Google Drive
      const updatedFile = await service.files.update({
        fileId: realFileId,
        media: {
            body: newContent,
            mimeType: 'text/html',
        },
      });
      return updatedFile;
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
  }

  module.exports = { searchFile, downloadFile, searchFiles, updateFile};

  //app.listen(process.env.PORT || 8000);
