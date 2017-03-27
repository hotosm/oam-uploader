'use strict';
var url = require('url');
var React = require('react/addons');
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');
var nets = require('nets');
var Scene = require('../components/scene');
var Dropdown = require('../components/dropdown');
var apiUrl = require('../config.js').OAMUploaderApi;
var AppActions = require('../actions/app-actions');
var $ = require('jquery');

// Sanity note:
// There are some places where the component state is being altered directly.
// This happens because of javascript objects work. Ex:
//   onSceneValueChange: function (sceneIndex, fieldName, fieldValue) {
//     var scenes = this.state.scenes;
//     scenes[sceneIndex][fieldName] = fieldValue;
//     this.setState({scenes: scenes});
//   },
// The solution would be to clone the state every time, but since we're
// ALWAYS calling setState after one of these changes, it's not a problem.
// It's still an antipattern, but I know what I'm doing! :)

module.exports = React.createClass({
  displayName: 'Home',

  mixins: [ValidationMixin],

  validatorTypes: {
    'uploader-name': Joi.string().label('Name').required(),
    'uploader-token': Joi.string().required().hex().length(64).label('Token'),
    'uploader-email': Joi.string().email().label('Email'),

    'scenes': Joi.array().items(
      Joi.object().keys({
        'title': Joi.string().min(1).required().label('Title'),
        'platform-type': Joi.string().required().valid('satellite', 'aircraft', 'uav', 'ballon', 'kite'),
        'sensor': Joi.string().required().label('Sensor'),
        'date-start': Joi.date().required().label('Date start'),
        'date-end': Joi.date().min(Joi.ref('date-start')).max('now').required().label('Date End'),

        'img-loc': Joi.array().min(1).items(
          Joi.object().keys({
            url: Joi.string().required().label('Imagery url'),
            origin: Joi.string().required().label('Imagery file origin')
          })
        ).label('Imagery location'),

        'tile-url': Joi.string().allow('').label('Tile service'),
        'provider': Joi.string().required().label('Provider'),
        'contact-type': Joi.string().required().valid('uploader', 'other'),
        'contact-name': Joi.label('Name').when('contact-type', { is: 'other', then: Joi.string().required() }),
        'contact-email': Joi.label('Email').when('contact-type', { is: 'other', then: Joi.string().email().required() })
      })
    )
  },

  getInitialState: function () {
    if (process.env.DS_DEBUG) {
      return {
        loading: false,

        // Form properties.
        'uploader-token': '',
        'uploader-name': 'Dummy Dum Dum',
        'uploader-email': 'zimmy@fake.com',
        scenes: [
          this.getSceneDataTemplate()
        ]
      };
    }

    return {
      loading: false,

      // Form properties.
      'uploader-token': '',
      'uploader-name': '',
      'uploader-email': '',
      scenes: [
        this.getSceneDataTemplate()
      ]
    };
  },

  getSceneDataTemplate: function () {
    var midnight = new Date();
    midnight.setMilliseconds(0);
    midnight.setSeconds(0);
    midnight.setMinutes(0);
    midnight.setHours(0);
    var now = new Date();

    if (process.env.DS_DEBUG) {
      return {
        'title': 'An imaginary scene',
        'platform-type': 'satellite',
        'sensor': 'x',
        'date-start': midnight.toISOString(),
        'date-end': now.toISOString(),
        'img-loc': [this.getSceneImgLocTemplate()],
        'tile-url': '',
        'provider': 'Mocks R Us',
        'contact-type': 'uploader',
        'contact-name': '',
        'contact-email': ''
      };
    }

    return {
      'platform-type': 'satellite',
      'sensor': '',
      'date-start': midnight.toISOString(),
      'date-end': now.toISOString(),
      'img-loc': [],
      'tile-url': '',
      'provider': '',
      'contact-type': 'uploader',
      'contact-name': '',
      'contact-email': ''
    };
  },

  getSceneImgLocTemplate: function () {
    if (process.env.DS_DEBUG) {
      return {
        url: 'http://fake-imagery.net/fake.tif',
        origin: 'manual'
      };
    }

    return {
      url: '',
      origin: ''
    };
  },

  addScene: function () {
    var scenes = this.state.scenes;
    scenes.push(this.getSceneDataTemplate());
    this.setState({scenes: scenes});
  },

  removeScene: function (sceneIndex) {
    var scenes = this.state.scenes;
    scenes.splice(sceneIndex, 1);
    this.setState({scenes: scenes});
  },

  addImageryLocationToScene: function (sceneIndex, origin) {
    let scenes = this.state.scenes;
    let tmp = this.getSceneImgLocTemplate();
    tmp.origin = origin;
    scenes[sceneIndex]['img-loc'].push(tmp);
    this.setState({scenes: scenes});
  },

  addFileRef: function (sceneIndex, origin, value) {
    let scenes = this.state.scenes;
    let tmp = this.getSceneImgLocTemplate();
    tmp.url = value;
    tmp.origin = origin;
    scenes[sceneIndex]['img-loc'].push(tmp);
    this.setState({scenes: scenes});
  },

  removeImageryLocatioFromScene: function (sceneIndex, imgLocIndex) {
    var scenes = this.state.scenes;
    scenes[sceneIndex]['img-loc'].splice(imgLocIndex, 1);
    this.setState({scenes: scenes});
  },

  onSceneValueChange: function (sceneIndex, fieldName, fieldValue) {
    var scenes = this.state.scenes;
    scenes[sceneIndex][fieldName] = fieldValue;
    this.setState({scenes: scenes});
  },

  onValueChange: function (event) {
    var data = {};
    data[event.target.name] = event.target.value;
    this.setState(data);
  },

  resetForm: function () {
    this.setState({
      'uploader-token': null,
      'uploader-name': null,
      'uploader-email': null,
      scenes: [
        this.getSceneDataTemplate()
      ]
    });
  },

  onSubmit: function (event) {
    event.preventDefault();

    // Warning... Controlled HACK.
    // The state should never be changed in this way as it doesn't trigger
    // a render, however it will be updated by the validate function later on.
    // This is needed to clear previous errors as the plugin doesn't handle
    // arrays of objects specially well.
    this.state.errors = {}; // eslint-disable-line

    this.validate(function (error, validationErrors) {
      if (error) {
        console.log(validationErrors);
        AppActions.showNotification('alert', 'Form contains errors!');
        this.scrollToError();
      } else {
        if (this.state.loading) {
          // Submit already in process.
          return;
        }
        this.setState({loading: true});

        AppActions.clearNotification();

        // All is well.
        // SUBMIT DATA.
        //
        // 1 - Prepare data in state.
        // 2 - Submit.
        // 3 - Set form feedback with -- this.setFormFeedback(type, message);
        //   - TYPE can be: alert success warning info
        // 4 - Hide loading. -- this.setState({loading: false});
        // 5 - Reset form when success. -- this.resetForm();

        var token = this.state['uploader-token'];

        var uploader = {
          name: this.state['uploader-name'],
          email: this.state['uploader-email']
        };
        var data = {
          uploader: uploader,
          scenes: this.state.scenes.map(function (scene) {
            var other = scene['contact-type'] === 'other';
            var contact = {
              name: other ? scene['contact-name'] : uploader.name,
              email: other ? scene['contact-email'] : uploader.email
            };

            var tms = scene['tile-url'].trim();
            tms = tms.length === 0 ? undefined : tms;

            return {
              contact: contact,
              title: scene.title,
              provider: scene.provider,
              platform: scene['platform-type'],
              sensor: scene.sensor,
              acquisition_start: scene['date-start'],
              acquisition_end: scene['date-end'],
              tms: tms,
              urls: scene['img-loc'].map(o => o.url)
            };
          })
        };
        console.log('valid', data);

        nets({
          url: url.resolve(apiUrl, '/uploads?access_token=' + token),
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }, function (err, resp, body) {
          if (err) {
            console.error('error', err);
          }
          this.setState({loading: false});

          if (resp.statusCode >= 200 && resp.statusCode < 400) {
            var id = JSON.parse(body.toString()).upload;

            AppActions.showNotification('success', (
              <span>
                Your upload request was successfully submitted and is being processed. <a href={'#/status/' + id}>Check upload status.</a>
              </span>
            ));

            this.resetForm();
          } else {
            var message = null;
            if (resp.statusCode === 401) {
              message = (
                <span>The provided token is not valid.</span>
              );
            } else {
              message = (
                <span>
                  There was a problem with the request.
                </span>
              );
              console.log(body);
            }

            AppActions.showNotification('alert', message);
          }
        }.bind(this));
      }
    }.bind(this));
  },

  scrollToError: function () {
    var topPos = $('.message-alert').first().offset().top;
    $('html').animate({ scrollTop: topPos - 50 });
  },

  renderErrorMessage: function (message) {
    message = message || '';
    if (message.trim().length === 0) { return null; }

    return (
      <p className='message message-alert'>{message}</p>
    );
  },

  renderScene: function (data, index) {
    return (
      <Scene
        key={index}
        total={this.state.scenes.length}
        index={index} data={data}
        onValueChange={this.onSceneValueChange}
        removeScene={this.removeScene}

        addImageryLocationToScene={this.addImageryLocationToScene}
        removeImageryLocatioFromScene={this.removeImageryLocatioFromScene}

        addFileRef={this.addFileRef}

        addFileReferenceToScene={this.addFileReferenceToScene}

        handleValidation={this.handleValidation}
        getValidationMessages={this.getValidationMessages}
        renderErrorMessage={this.renderErrorMessage} />
    );
  },

  render: function () {
    return (
      <div>

        <div className='intro-block'>
          <p>Welcome to the <a href='http://openaerialmap.org/' title='Visit OpenAerialMap'>OpenAerialMap</a> Imagery Uploader.<br /> Use the form below to submit your imagery - a valid upload token is needed. <a href='https://github.com/hotosm/oam-uploader' title='Go to the GitHub repo'>Read the documentation</a> to learn how to contribute.</p>
          <Dropdown element='div' className='drop dropdown center' triggerTitle='Request a token' triggerClassName='bttn-request-token' triggerText='Request a token'>
            <ul className='drop-menu request-token-menu' role='menu'>
              <li className='github has-icon-bef'><a href='https://github.com/hotosm/oam-uploader-admin/issues/new?title=New%20Token--%5BNAME%5D&body=Name%3A%20%0AEmail%3A%20%0ALocation%20of%20imagery%3A%20%0ASource%20of%20imagery%3A%20%0AShort%20description%20of%20collection%3A%0AHave%20you%20received%20approval%20for%20making%20this%20imagery%20available%20(yes%2Fno)%3F%3A' title='Open GitHub issue'><span>Open GitHub issue</span></a></li>
              <li className='email has-icon-bef'><a href='mailto:info%40openaerialmap.org?subject=New%20Token--%5BNAME%5D&body=Name%3A%20%0AEmail%3A%20%0ALocation%20of%20imagery%3A%20%0ASource%20of%20imagery%3A%20%0AShort%20description%20of%20collection%3A%0AHave%20you%20received%20approval%20for%20making%20this%20imagery%20available%20(yes%2Fno)%3F%3A' title='Send email'><span>Send email</span></a></li>
            </ul>
          </Dropdown>
        </div>

        <section className='panel upload-panel'>
          <header className='panel-header'>
            <div className='panel-headline'>
              <h1 className='panel-title'>Upload</h1>
            </div>
          </header>
          <div className='panel-body'>

            <form id='upload-form' className='form-horizontal'>

              <fieldset className='form-fieldset general'>
                <legend className='form-legend'>General</legend>
                <div className='form-group'>
                  <label className='form-label' htmlFor='uploader-token'>Token</label>
                  <div className='form-control-set'>
                    <input type='password' className='form-control' placeholder='Key' name='uploader-token' id='uploader-token' onBlur={this.handleValidation('uploader-token')} onChange={this.onValueChange} value={this.state['uploader-token']} />
                    {this.renderErrorMessage(this.getValidationMessages('uploader-token')[0])}
                  </div>
                </div>
                <div className='form-group'>
                  <label className='form-label' htmlFor='uploader-name'>Uploader <span className='visually-hidden'>name</span></label>
                  <div className='form-control-set'>
                    <input type='text' className='form-control' placeholder='Name' name='uploader-name' id='uploader-name' onBlur={this.handleValidation('uploader-name')} onChange={this.onValueChange} value={this.state['uploader-name']} />
                    {this.renderErrorMessage(this.getValidationMessages('uploader-name')[0])}
                  </div>
                </div>
                <div className='form-group'>
                <label className='form-label none' htmlFor='uploader-email'><span className='visually-hidden'>Uploader email</span></label>
                  <div className='form-control-set'>
                    <input type='email' className='form-control' placeholder='Email' name='uploader-email' id='uploader-email' onBlur={this.handleValidation('uploader-email')} onChange={this.onValueChange} value={this.state['uploader-email']} />
                    {this.renderErrorMessage(this.getValidationMessages('uploader-email')[0])}
                  </div>
                </div>
              </fieldset>

              {this.state.scenes.map(this.renderScene)}

              <div className='form-extra-actions'>
                <button type='button' className='bttn-add-scene' onClick={this.addScene} title='Add new dataset'><span>New dataset</span></button>
              </div>

              <div className='form-note'>
                <p>By submitting imagery to OpenAerialMap, you agree to place your imagery into the <a href='https://github.com/openimagerynetwork/oin-register#open-imagery-network'>Open Imagery Network (OIN)</a>. All imagery contained in OIN is licensed <a href='https://creativecommons.org/licenses/by/4.0/'>CC-BY 4.0</a>, with attribution as contributors of Open Imagery Network. All imagery is available to be traced in OpenStreetMap.</p>
              </div>

              <div className='form-actions'>
                <button type='submit' className='bttn-submit' onClick={this.onSubmit}><span>Submit</span></button>
              </div>

            </form>

          </div>
          <footer className='panel-footer'></footer>
        </section>

        {this.state.loading ? <p className='loading revealed'>Loading</p> : null}
      </div>
    );
  }
});
