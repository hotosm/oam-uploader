var logo = require('./logo');
/*
 * App config for production.
 */
module.exports = {
  environment: 'production',
  consoleMessage: logo,
  OAMUploaderApi: 'https://upload-api.openaerialmap.org/',
  googleClient: '36015894456-p23fapcrlb8gu5jso00j69uv1c8861j1.apps.googleusercontent.com',
  googleDeveloperKey: '',
  OAMBrowserUrl: 'https://map.openaerialmap.org'
};
