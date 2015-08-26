'use strict';
var React = require('react/addons');
var DateTimePicker = require('react-widgets').DateTimePicker;

var Scene = module.exports = React.createClass({
  displayName: 'Scene',

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

  renderRemoveBtn: function() {
    var classes = 'bttn-remove-scene' + (this.props.total <= 1 ? ' disabled' : '');
    return (
      <div className="form-fieldset-actions">
        <button type="button" className={classes} onClick={this.props.removeScene.bind(null, this.props.index)} title="Remove scene"><span>Remove scene</span></button>
      </div>
    );
  },

  renderContact: function() {
    if (this.props.data['contact-type'] != 'other') {
      return null;
    }

    // Just to shorten.
    var i = this.props.index;
    return (
      <div>
        <div className="form-group">
          <label className="form-label none"><span className="visually-hidden">Contact name</span></label>
          <div className="form-control-set">
            <input type="text" className="form-control" placeholder="Name (optional)" name={this.getName('contact-name')} onBlur={this.props.handleValidation('scenes.' + i + '.contact-name')} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.contact-name')[0])}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label none"><span className="visually-hidden">Contact email</span></label>
          <div className="form-control-set">
            <input type="email" className="form-control" placeholder="Email" name={this.getName('contact-email')} onBlur={this.props.handleValidation('scenes.' + i + '.contact-email')} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.contact-email')[0])}
          </div>
        </div>
      </div>
    );
  },

  onDateChange: function(field, date, dateString) {
    var val = date === null ? null : date.toISOString();
    this.props.onValueChange(this.props.index, field, val);
  },

  getValueForDate: function(field) {
    return this.props.data[field] === null ? null : new Date(this.props.data[field]);
  },

  dateOrUndefined: function(field) {
    // When getting the value for min/max, if we don't want to set one
    // we need to use undefined.
    // Using null results in the date being the epoch time.
    var val = this.getValueForDate(field);
    return val === null ? undefined : val;
  },

  render: function() {
    // Just to shorten.
    var i = this.props.index;

    return (
      <fieldset className="form-fieldset scene">
        <legend className="form-legend">Scene {i > 0 ? i + 1 : ''}</legend>
        <div className="form-group">
          <label className="form-label">Title</label>
          <div className="form-control-set">
            <input type="text" className="form-control" placeholder="Scene title" name={this.getName('title')} onBlur={this.props.handleValidation('scenes.' + i + '.title')} onChange={this.onChange} value={this.props.data.title} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.title')[0])}
          </div>
        </div>
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
            <input type="text" className="form-control" placeholder="Device name/model" name={this.getName('sensor')} onBlur={this.props.handleValidation('scenes.' + i + '.sensor')} onChange={this.onChange} value={this.props.data.sensor} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.sensor')[0])}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Date start</label>
          <div className="form-control-set">

            <DateTimePicker ref="dateStart"
              max={this.dateOrUndefined('date-end')}
              finalView="decade"
              format={"yyyy-MM-dd HH:mm:ss"}
              timeFormat={"HH:mm"}
              value={this.getValueForDate('date-start')}
              onChange={this.onDateChange.bind(null, 'date-start')} />

            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.date-start')[0])}

          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Date end</label>
          <div className="form-control-set">

            <DateTimePicker ref="dateEnd"
              min={this.dateOrUndefined('date-start')}
              finalView="decade"
              format={"yyyy-MM-dd HH:mm:ss"}
              timeFormat={"HH:mm"}
              value={this.getValueForDate('date-end')}
              onChange={this.onDateChange.bind(null, 'date-end')} />

            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.date-end')[0])}

          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Imagery location</label>
          <div className="form-control-set">
            <textarea className="form-control" placeholder="URL" aria-describedby="help-1" rows="4" name={this.getName('urls')} onBlur={this.props.handleValidation('scenes.' + i + '.urls')} onChange={this.onChange} value={this.props.data.urls} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.urls')[0])}
            <p id="help-1" className="form-help">One URL per line.</p>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Tile service</label>
          <div className="form-control-set">
            <input type="url" className="form-control" placeholder="URL (optional)" name={this.getName('tile-url')} onBlur={this.props.handleValidation('scenes.' + i + '.tile-url')} onChange={this.onChange} value={this.props.data['tile-url']} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.tile-url')[0])}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Provider</label>
          <div className="form-control-set">
            <input type="text" className="form-control" placeholder="Entity name" name={this.getName('provider')} onBlur={this.props.handleValidation('scenes.' + i + '.provider')} onChange={this.onChange} value={this.props.data['provider']} />
            {this.props.renderErrorMessage(this.props.getValidationMessages('scenes.' + i + '.provider')[0])}
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

        {this.renderContact()}

        {this.renderRemoveBtn()}

      </fieldset>
    );
  }
});
