'use strict';
var React = require('react/addons');
var Scene = require('../components/scene');
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');

var Home = module.exports = React.createClass({
  displayName: 'Home',

  mixins: [ValidationMixin],

  validatorTypes:  {
    'uploader-name': Joi.string().allow('').label('Name'),
    'uploader-token': Joi.string().required().hex().length(128).label('Token'),
    'uploader-email': Joi.string().email().label('Email'),

    'scenes': Joi.array().items(
      Joi.object().keys({
        'platform-type': Joi.string().required().valid('satellite', 'aircraft', 'uav', 'ballon', 'kite'),
        'sensor': Joi.string().required().label('Sensor'),
        'date-start': Joi.date().required().label('Date start'),
        // 'date-end': non required,
        'urls': Joi.string().required().label('Imagery location'),
        'tile-url': Joi.string().required().label('Tile service'),
        'provider': Joi.string().required().label('Provider'),
        'contact-type': Joi.string().required().valid('uploader', 'other'),
        'contact-name': Joi.string().allow('').label('Name'),
        'contact-email': Joi.label('Email').when('contact-type', { is: 'other', then: Joi.string().email().required() })
      })
    )
  },

  getInitialState: function() {
    return {
      loading: false,
      feedback: {
        type: null,
        message: null
      },

      // Form properties.
      'uploader-token': '',
      'uploader-name': '',
      'uploader-email': '',
      scenes: [
        this.getSceneDataTemplate()
      ]
    };
  },

  getSceneDataTemplate: function() {
    return {
      'platform-type': 'satellite',
      'sensor': '',
      'date-start': new Date().toISOString(),
      'date-end': null,
      'urls': '',
      'tile-url': '',
      'provider': '',
      'contact-type': 'uploader',
      'contact-name': '',
      'contact-email': ''
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

  onValueChange: function(event) {
    var data = {};
    data[event.target.name] = event.target.value;
    this.setState(data);
  },

  resetForm: function() {
    this.setState({
      'uploader-token': null,
      'uploader-name': null,
      'uploader-email': null,
      scenes: [
        this.getSceneDataTemplate()
      ]
    });
  },

  onSubmit: function(event) {
    event.preventDefault();
    
    // Warning... Controlled HACK.
    // The state should never be changed in this way as it doesn't trigger
    // a render, however it will be updated by the validate function later on.
    // This is needed to clear previous errors as the plugin doesn't handle
    // arrays of objects specially well.
    this.state.errors = {};

    this.validate(function(error, validationErrors) {
      if (error) {
        console.log(validationErrors);
      } else {

        if (this.state.loading) {
          // Submit already in process.
          return;
        }
        this.setState({loading: true});

        // All is well.
        // SUBMIT DATA.
        // 
        // 1 - Prepare data in state.
        // 2 - Submit.
        // 3 - Set form feedback with -- this.setFormFeedback(type, message);
        //   - TYPE can be: alert success warning info
        // 4 - Hide loading. -- this.setState({loading: false});
        // 5 - Reset form when success. -- this.resetForm();

        // Simulation
        setTimeout(function() {
          this.setFormFeedback('success', 'Data successfully submitted');
          this.setState({loading: false});
          this.resetForm();
        }.bind(this), 2000);

        console.log(this.state);

      }
    }.bind(this));
  },

  setFormFeedback: function(type, message) {
    this.setState({feedback: {
      type: type,
      message: message
    }});
  },

  clearFormFeedback: function() {
    this.setState({feedback: {
      type: null,
      message: null
    }});
  },

  renderErrorMessage: function(message) {
    return (
      <p className="message message-alert">{message}</p>
    );
  },

  renderScene: function(data, index) {
    return (
      <Scene
        key={index}
        total={this.state.scenes.length}
        index={index} data={data}
        onValueChange={this.onSceneValueChange}
        removeScene={this.removeScene}

        handleValidation={this.handleValidation}
        getValidationMessages={this.getValidationMessages}
        renderErrorMessage={this.renderErrorMessage} />
    );
  },

  renderFeedback: function() {
    if (this.state.feedback.type === null) {
      return null;
    }
    var classes = "notification notification-" + this.state.feedback.type;

    return (
      <div className={classes}>
        <p>{this.state.feedback.message}</p>
      </div>
    );
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
                      <input type="password" className="form-control" placeholder="Key" aria-describedby="help-1" name="uploader-token" onBlur={this.handleValidation('uploader-token')} onChange={this.onValueChange} value={this.state['uploader-token']} />
                      {this.renderErrorMessage(this.getValidationMessages('uploader-token')[0])}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Uploader <span className="visually-hidden">name</span></label>
                    <div className="form-control-set">
                      <input type="text" className="form-control" placeholder="Name (optional)" name="uploader-name" onBlur={this.handleValidation('uploader-name')} onChange={this.onValueChange} value={this.state['uploader-name']} />
                      {this.renderErrorMessage(this.getValidationMessages('uploader-name')[0])}
                    </div>
                  </div>
                  <div className="form-group">
                  <label className="form-label none"><span className="visually-hidden">Uploader email</span></label>
                    <div className="form-control-set">
                      <input type="email" className="form-control" placeholder="Email" name="uploader-email" onBlur={this.handleValidation('uploader-email')} onChange={this.onValueChange} value={this.state['uploader-email']} />
                      {this.renderErrorMessage(this.getValidationMessages('uploader-email')[0])}
                    </div>
                  </div>
                </fieldset>

                {this.state.scenes.map(this.renderScene)}

                <div className="form-extra-actions">
                  <button type="button" className="bttn-add-scene" onClick={this.addScene} title="Add new scene"><span>New scene</span></button>
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

        {this.renderFeedback()}

        {this.state.loading ? <p className="loading revealed">Loading</p> : null}
      </div>
    );
  }
});
