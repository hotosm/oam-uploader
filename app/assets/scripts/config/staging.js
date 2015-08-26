/*
 * App config overrides for staging.
 */

// set staging-specific options here.
module.exports = {
  environment: 'staging',
  OAMUploaderApi: 'http://52.11.15.48/'
};

// copy over any production settings that weren't specifically set above
var production = require('./production');
for (var p in production) {
  if (typeof module.exports[p] === 'undefined') {
    module.exports[p] = production[p];
  }
}
