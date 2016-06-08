// Named scene.js based on original way of referring to how image files are grouped together
// To avoid confusion on frontend, labels have been renamed to datasets
// Continuing to use the term scene for variables and functions

'use strict';
var React = require('react/addons');
var DateTimePicker = require('react-widgets').DateTimePicker;

module.exports = React.createClass({
  displayName: 'Scene',

  propTypes: {
    onValueChange: React.PropTypes.func,
    removeScene: React.PropTypes.func,
    renderErrorMessage: React.PropTypes.func,
    getValidationMessages: React.PropTypes.func,
    handleValidation: React.PropTypes.func,
    index: React.PropTypes.number,
    total: React.PropTypes.number,
    data: React.PropTypes.object
  },

  getName: function (fieldName) {
    return 'scene[' + this.props.index + '][' + fieldName + ']';
  },

  getId: function (fieldName) {
    return 'scene-' + this.props.index + '-' + fieldName;
  },

  getRadioName: function (fieldName) {
    return this.getName(fieldName) + '[]';
  },

  onChange: function (e) {
    var pieces = e.target.name.match(/scene\[([0-9]+)\]\[([a-z0-9-]+)\]/);
    // sceneIndex, fieldName, fieldValue
    this.props.onValueChange(pieces[1], pieces[2], e.target.value);
  },

  onDateChange: function (field, date, dateString) {
    var val = date === null ? null : date.toISOString();
    this.props.onValueChange(this.props.index, field, val);
  },

  getValueForDate: function (field) {
    return this.props.data[field] === null ? null : new Date(this.props.data[field]);
  },

  dateOrUndefined: function (field) {
    // When getting the value for min/max, if we don't want to set one
    // we need to use undefined.
    // Using null results in the date being the epoch time.
    var val = this.getValueForDate(field);
    return val === null ? undefined : val;
  },

  renderRemoveBtn: function () {
    var classes = 'bttn-remove-scene' + (this.props.total <= 1 ? ' disabled' : '');
    return (
      <div className='form-fieldset-actions'>
        <button type='button' className={classes} onClick={this.props.removeScene.bind(null, this.props.index)} title='Remove dataset'><span>Remove dataset</span></button>
      </div>
    );
  },

  renderContact: function () {
    if (this.props.data['contact-type'] !== 'other') {
      return null;
    }

    // Just to shorten.
    var i = this.props.index;
    return (
      <div>
        <div className='form-group'>
          <label className='form-label none' htmlFor={this.getId('contact-name')}><span className='visually-hidden'>Contact name</span></label>
          <div className='form-control-set'>
            <input type='text' className='form-control' placeholder='Name' name={this.getName('contact-name')} id={this.getId('contact-name')} onBlur={this.props.handleValidation('scenes.' + i + '.contact-name')} onChange={this.onChange} value={this.props.data['contact-name']} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.contact-name')[0])}
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label none' htmlFor={this.getId('contact-email')}><span className='visually-hidden'>Contact email</span></label>
          <div className='form-control-set'>
            <input type='email' className='form-control' placeholder='Email' name={this.getName('contact-email')} id={this.getId('contact-email')} onBlur={this.props.handleValidation('scenes.' + i + '.contact-email')} onChange={this.onChange} value={this.props.data['contact-email']} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.contact-email')[0])}
          </div>
        </div>
      </div>
    );
  },

  render: function () {
    // Just to shorten.
    var i = this.props.index;

    return (
      <fieldset className='form-fieldset scene'>
        <legend className='form-legend'>Dataset {i > 0 ? i + 1 : ''}</legend>
        {this.renderRemoveBtn()}
        <div className='form-group'>
          <label className='form-label' htmlFor={this.getId('title')}>Title</label>
          <div className='form-control-set'>
            <input type='text' className='form-control' placeholder='Dataset title' name={this.getName('title')} id={this.getId('title')} onBlur={this.props.handleValidation('scenes.' + i + '.title')} onChange={this.onChange} value={this.props.data.title} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.title')[0])}
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label'>Platform</label>
          <div className='form-options-set'>
            <div className='radio'>
              <label><input type='radio' onChange={this.onChange} name={this.getRadioName('platform-type')} value='satellite' checked={this.props.data['platform-type'] === 'satellite'} /> Satellite</label>
            </div>
            <div className='radio'>
              <label><input type='radio' onChange={this.onChange} name={this.getRadioName('platform-type')} value='aircraft' checked={this.props.data['platform-type'] === 'aircraft'} /> Aircraft</label>
            </div>
            <div className='radio'>
              <label><input type='radio' onChange={this.onChange} name={this.getRadioName('platform-type')} value='uav' checked={this.props.data['platform-type'] === 'uav'} /> UAV</label>
            </div>
            <div className='radio'>
              <label><input type='radio' onChange={this.onChange} name={this.getRadioName('platform-type')} value='ballon' checked={this.props.data['platform-type'] === 'ballon'} /> Ballon</label>
            </div>
            <div className='radio'>
              <label><input type='radio' onChange={this.onChange} name={this.getRadioName('platform-type')} value='kite' checked={this.props.data['platform-type'] === 'kite'} /> Kite</label>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor={this.getId('sensor')}>Sensor</label>
          <div className='form-control-set'>
            <input type='text' className='form-control' placeholder='Type/model (optional)' name={this.getName('sensor')} id={this.getId('sensor')} onBlur={this.props.handleValidation('scenes.' + i + '.sensor')} onChange={this.onChange} value={this.props.data.sensor} aria-describedby={'help-sensor-' + i} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.sensor')[0])}
            <p id={'help-sensor-' + i} className='form-help'>Type or model of image sensor or camera used (ex: Worldview-3).</p>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label'>Date start</label>
          <div className='form-control-set'>

            <DateTimePicker ref='dateStart'
              max={this.dateOrUndefined('date-end')}
              finalView='decade'
              format={'yyyy-MM-dd HH:mm:ss'}
              timeFormat={'HH:mm'}
              value={this.getValueForDate('date-start')}
              onChange={this.onDateChange.bind(null, 'date-start')} />

            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.date-start')[0])}
            <p id={'help-date-start-' + i} className='form-help'>If the exact start time is unknown using 00:00:00 will suffice.</p>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label'>Date end</label>
          <div className='form-control-set'>

            <DateTimePicker ref='dateEnd'
              min={this.dateOrUndefined('date-start')}
              max={new Date()}
              finalView='decade'
              format={'yyyy-MM-dd HH:mm:ss'}
              timeFormat={'HH:mm'}
              value={this.getValueForDate('date-end')}
              onChange={this.onDateChange.bind(null, 'date-end')} />

            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.date-end')[0])}
            <p id={'help-date-end-' + i} className='form-help'>If the exact end time is unknown using 23:59:59 will suffice.</p>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor={this.getId('urls')}>Imagery location</label>
          <div className='form-control-set'>
            <textarea className='form-control' placeholder='One URL per line' id={this.getId('urls')} aria-describedby={'help-img-location-' + i} rows='4' name={this.getName('urls')} onBlur={this.props.handleValidation('scenes.' + i + '.urls')} onChange={this.onChange} value={this.props.data.urls} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.urls')[0])}
            <p id={'help-img-location-' + i} className='form-help'>See URL requirements for more details.</p>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor={this.getId('tile-url')}>Tile service</label>
          <div className='form-control-set'>
            <input type='url' className='form-control' placeholder='URL (optional)' name={this.getName('tile-url')} id={this.getId('tile-url')} onBlur={this.props.handleValidation('scenes.' + i + '.tile-url')} onChange={this.onChange} value={this.props.data['tile-url']} aria-describedby={'help-tile-' + i} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.tile-url')[0])}
            <p id={'help-tile-' + i} className='form-help'>Enter a tile URL template. Valid tokens are {'{z}, {x}, {y} for Z/X/Y, and {u}'} for quadtile scheme.</p>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor={this.getId('provider')}>Provider</label>
          <div className='form-control-set'>
            <input type='text' className='form-control' placeholder='Entity name' name={this.getName('provider')} id={this.getId('provider')} onBlur={this.props.handleValidation('scenes.' + i + '.provider')} onChange={this.onChange} value={this.props.data['provider']} aria-describedby={'help-provider-' + i} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.provider')[0])}
            <p id={'help-provider-' + i} className='form-help'>Name of company or individual that collected or provided the imagery.</p>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label'>Contact</label>
          <div className='form-options-set'>
            <div className='radio'>
              <label><input type='radio' name={this.getRadioName('contact-type')} onChange={this.onChange} value='uploader' checked={this.props.data['contact-type'] === 'uploader'} /> Same as uploader</label>
            </div>
            <div className='radio'>
              <label><input type='radio' name={this.getRadioName('contact-type')} onChange={this.onChange} value='other' checked={this.props.data['contact-type'] === 'other'} /> Other</label>
            </div>
          </div>
        </div>

        {this.renderContact()}

      </fieldset>
    );
  }
});
