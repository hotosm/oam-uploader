'use strict';
var React = require('react/addons');
var Scene = require('../components/scene');

var Home = module.exports = React.createClass({
  displayName: 'Home',

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
      'date-start': new Date().toISOString(),
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

  removeScene: function(sceneIndex) {
    var scenes = this.state.scenes;
    scenes.splice(sceneIndex, 1);
    this.setState({scenes: scenes});
  },

  onSceneValueChange: function(sceneIndex, fieldName, fieldValue) {
    var scenes = this.state.scenes;
    scenes[sceneIndex][fieldName] = fieldValue;
    this.setState({scenes: scenes});
  },

  onSubmit: function(event) {
    event.preventDefault();
    console.log(this.state);
  },

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

                {this.state.scenes.map(function(o, i) {
                  return <Scene total={this.state.scenes.length} index={i} data={o} key={i} onValueChange={this.onSceneValueChange} removeScene={this.removeScene}/>
                }.bind(this))}

                <div className="form-extra-actions">
                  <button type="button" className="bttn-add-scene" onClick={this.addScene}><span>Add another scene</span></button>
                </div>

                <div className="form-note">
                  <p>By uploading you agree to Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque facilisis consequat felis, eget blandit augue ullamcorper sit amet.</p>
                </div>

                <div className="form-actions">
                  <button type="submit" className="bttn-submit" onClick={this.onSubmit}><span>Upload</span></button>
                </div>

              </form>

            </section>

          </div>
        </main>
      </div>
    );
  }
});
