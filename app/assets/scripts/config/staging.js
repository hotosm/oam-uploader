/*
 * App config overrides for staging.
 */

// set staging-specific options here.
module.exports = {
  environment: 'staging',
  OAMUploaderApi: 'http://52.91.218.109/',
  googleClient: '36015894456-3d5ka80qtpaqcjhco3lsl38s1fj0dr71.apps.googleusercontent.com',
  googleDeveloperKey: ''
};

// copy over any production settings that weren't specifically set above
var production = require('./production');
for (var p in production) {
  if (typeof module.exports[p] === 'undefined') {
    module.exports[p] = production[p];
  }
}