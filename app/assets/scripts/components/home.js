'use strict';
var React = require('react/addons');

var Home = module.exports = React.createClass({

  getInitialState: function() {
    return {
      scenes: [
        this.getSceneDataTemplate()
      ]
    };
  },

  getSceneDataTemplate: function() {
    return {
      'platform-type': 'satellite',
      'sensor': null,
      'date-start': null,
      'date-end': null,
      'urls': null,
      'tile-url': null,
      'provider': null,
      'contact-type': 'uploader'
    };
  },

  addScene: function() {
    var scenes = this.state.scenes;
    scenes.push(this.getSceneDataTemplate());
    this.setState({scenes: scenes});
  },

  nhe: function(e) {
    var scenes = this.state.scenes;
    console.log( scenes.shift());
    scenes.unshift();
    this.setState({scenes: scenes});
  },

  onSceneValueChange: function(sceneIndex, fieldName, fieldValue) {
    var scenes = this.state.scenes;
    scenes[sceneIndex][fieldName] = fieldValue;
    this.setState({scenes: scenes});
  },

  render: function() {
    console.log(this.state);
    return (
      <div>
        <header className="site-header" role="banner">
          <div className="inner">
            <div className="site-headline">
              <h1 className="site-title" onClick={this.nhe}><img src="assets/graphics/layout/oam-logo-h-pos.svg" width="167" height="32" alt="OpenAerialMap logo" /><span>OpenAerialMap</span> <small>Uploader</small></h1>
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

                {this.state.scenes.map(function(o, i) {
                  return <Scene index={i} data={o} key={i} onValueChange={this.onSceneValueChange}/>
                }.bind(this))}

                <div className="form-extra-actions">
                  <button type="button" className="bttn-add-scene" onClick={this.addScene}><span>Add another scene</span></button>
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


var Scene = React.createClass({

  getName: function(fieldName) {
    return 'scene[' + this.props.index + '][' + fieldName + ']';
  },

  getRadioName: function(fieldName) {
    return this.getName(fieldName) + '[]';
  },

  onChange: function(e) {
    var pieces = e.target.name.match(/scene\[([0-9]+)\]\[([a-z0-9-]+)\]/);
    // sceneIndex, fieldName, fieldValue
    this.props.onValueChange(pieces[1], pieces[2], e.target.value);
  },

  render: function() {
    return (
      <fieldset className="form-fieldset scene">
        <legend className="form-legend">Scene {this.props.index > 0 ? this.props.index + 1 : ''}</legend>
        <div className="form-group">
          <label className="form-label">Platform</label>
          <div className="form-options-set">
            <div className="radio">
              <label><input type="radio" onChange={this.onChange} name={this.getRadioName('platform-type')} value="satellite" checked={this.props.data['platform-type'] === 'satellite'} /> Satellite</label>
            </div>
            <div className="radio">
              <label><input type="radio" onChange={this.onChange} name={this.getRadioName('platform-type')} value="aircraft" checked={this.props.data['platform-type'] === 'aircraft'} /> Aircraft</label>
            </div>
            <div className="radio">
              <label><input type="radio" onChange={this.onChange} name={this.getRadioName('platform-type')} value="uav" checked={this.props.data['platform-type'] === 'uav'} /> UAV</label>
            </div>
            <div className="radio">
              <label><input type="radio" onChange={this.onChange} name={this.getRadioName('platform-type')} value="ballon" checked={this.props.data['platform-type'] === 'ballon'} /> Ballon</label>
            </div>
            <div className="radio">
              <label><input type="radio" onChange={this.onChange} name={this.getRadioName('platform-type')} value="kite" checked={this.props.data['platform-type'] === 'kite'} /> Kite</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Sensor</label>
          <div className="form-control-set">
            <input type="text" className="form-control" placeholder="Device name/model" name={this.getName('sensor')} onChange={this.onChange} value={this.props.data.sensor} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Date start</label>
          <div className="form-control-set">
            <input type="datetime" className="form-control" placeholder="" name={this.getName('date-start')} onChange={this.onChange} value={this.props.data['date-start']} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Date end</label>
          <div className="form-control-set">
            <input type="datetime" className="form-control" placeholder="" name={this.getName('date-end')} onChange={this.onChange} value={this.props.data['date-end']} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Imagery location</label>
          <div className="form-control-set">
            <textarea className="form-control" placeholder="URL" aria-describedby="help-1" rows="4" name={this.getName('urls')} onChange={this.onChange} value={this.props.data.urls} />
            <p id="help-1" className="form-help">One URL per line.</p>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Tile service</label>
          <div className="form-control-set">
            <input type="url" className="form-control" placeholder="URL" name={this.getName('tile-url')} onChange={this.onChange} value={this.props.data['tile-url']} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Provider</label>
          <div className="form-control-set">
            <input type="text" className="form-control" placeholder="Entity name" name={this.getName('provider')} onChange={this.onChange} value={this.props.data['provider']} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Contact</label>
          <div className="form-options-set">
            <div className="radio">
              <label><input type="radio" name={this.getRadioName('contact-type')} onChange={this.onChange} value="uploader" checked={this.props.data['contact-type'] === 'uploader'} /> Same as uploader</label>
            </div>
            <div className="radio">
              <label><input type="radio" name={this.getRadioName('contact-type')} onChange={this.onChange} value="other" checked={this.props.data['contact-type'] === 'other'} /> Other</label>
            </div>
          </div>
        </div>

      </fieldset>
    );
  }
});