'use strict';
var React = require('react/addons');

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
    var classes = 'btt-remove-scene' + (this.props.total <= 1 ? ' disabled' : '');
    return (
      <div className="form-fieldset-actions">
        <button type="button" className={classes} onClick={this.props.removeScene.bind(null, this.props.index)}><span>Remove scene</span></button>
      </div>
    );
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

        {this.renderRemoveBtn()}

      </fieldset>
    );
  }
});
