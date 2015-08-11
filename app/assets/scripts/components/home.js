'use strict';
var React = require('react/addons');

var Home = module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <header className="site-header" role="banner">
          <div className="inner">
            <div className="site-headline">
              <h1 className="site-title"><img src="assets/graphics/layout/oam-logo-h-pos.svg" width="167" height="32" alt="OpenAerialMap logo" /><span>OpenAerialMap</span> <small>Uploader</small></h1>
            </div>
            <div className="site-intro">
              <p>Welcome to the <a href="http://openaerialmap.org/" title="Visit OpenAerialMap">OpenAerialMap</a> Imagery Uploader. Use the form below to submit your imagery, if you have a valid upload token. Learn how to contribute with imagery by <a href="https://github.com/hotosm/oam-uploader" title="Go to the GitHub repo">reading the documentation</a>.</p>
            </div>
          </div>
        </header>
        <main className="site-body" role="main">
          <div className="inner">

            <section className="upload-section">
              <h2 className="section-title">Upload</h2>

              <form id="upload-form" className="form-horizontal">

                <fieldset className="form-fieldset general">
                  <legend className="form-legend">General</legend>
                  <div className="form-group">
                    <label className="form-label">Token</label>
                    <div className="form-control-set">
                      <input type="password" className="form-control" placeholder="Key" aria-describedby="help-1" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Uploader <span className="visually-hidden">name</span></label>
                    <div className="form-control-set">
                      <input type="text" className="form-control" placeholder="Name" />
                    </div>
                  </div>
                  <div className="form-group">
                  <label className="form-label none"><span className="visually-hidden">Uploader email</span></label>
                    <div className="form-control-set">
                      <input type="email" className="form-control" placeholder="Email" />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="form-fieldset scene">
                  <legend className="form-legend">Scene</legend>
                  <div className="form-group">
                    <label className="form-label">Platform</label>
                    <div className="form-options-set">
                      <div className="radio">
                        <label><input type="radio" name="platform-type" id="pt1" value="satellite" checked /> Satellite</label>
                      </div>
                      <div className="radio">
                        <label><input type="radio" name="platform-type" id="pt3" value="aircraft" /> Aircraft</label>
                      </div>
                      <div className="radio">
                        <label><input type="radio" name="platform-type" id="pt3" value="uav" /> UAV</label>
                      </div>
                      <div className="radio">
                        <label><input type="radio" name="platform-type" id="pt4" value="ballon" /> Ballon</label>
                      </div>
                      <div className="radio">
                        <label><input type="radio" name="platform-type" id="pt5" value="kite" /> Kite</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sensor</label>
                    <div className="form-control-set">
                      <input type="text" className="form-control" placeholder="Device name/model" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date start</label>
                    <div className="form-control-set">
                      <input type="datetime" className="form-control" placeholder="" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date end</label>
                    <div className="form-control-set">
                      <input type="datetime" className="form-control" placeholder="" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Imagery location</label>
                    <div className="form-control-set">
                      <textarea className="form-control" placeholder="URL" aria-describedby="help-1" rows="4"></textarea>
                      <p id="help-1" className="form-help">One URL per line.</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tile service</label>
                    <div className="form-control-set">
                      <input type="url" className="form-control" placeholder="URL" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Provider</label>
                    <div className="form-control-set">
                      <input type="text" className="form-control" placeholder="Entity name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact</label>
                    <div className="form-options-set">
                      <div className="radio">
                        <label><input type="radio" name="contact-type" value="uploader" checked /> Same as uploader</label>
                      </div>
                      <div className="radio">
                        <label><input type="radio" name="contact-type" value="other" /> Other</label>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="form-extra-actions">
                  <button type="submit" className="bttn-add-scene"><span>Add another scene</span></button>
                </div>

                <div className="form-note">
                  <p>By uploading you agree to Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque facilisis consequat felis, eget blandit augue ullamcorper sit amet.</p>
                </div>

                <div className="form-actions">
                  <button type="submit" className="bttn-submit"><span>Upload</span></button>
                </div>

              </form>

            </section>

          </div>
        </main>
      </div>
    );
  }
});