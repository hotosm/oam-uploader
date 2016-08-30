/* global Dropbox */
var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'ImageryLocation',

  propTypes: {
    onValueChange: React.PropTypes.func,
    removeImageryLocation: React.PropTypes.func,
    renderErrorMessage: React.PropTypes.func,
    getValidationMessages: React.PropTypes.func,
    handleValidation: React.PropTypes.func,
    sceneName: React.PropTypes.string,
    sceneId: React.PropTypes.string,
    index: React.PropTypes.number,
    validationName: React.PropTypes.string,
    total: React.PropTypes.number,
    data: React.PropTypes.object
  },

  getName: function (fieldName) {
    return `${this.props.sceneName}[${this.props.index}][${fieldName}]`;
  },

  getId: function (fieldName) {
    return `${this.props.sceneId}-${this.props.index}-${fieldName}`;
  },

  onChange: function (fieldName, e) {
    // fieldIndex, fieldName, fieldValue
    this.props.onValueChange(this.props.index, fieldName, e.target.value);
  },

  importDropboxClick: function () {
    this.props.onValueChange(this.props.index, 'origin', 'dropbox');
    // Next tick.
    setTimeout(() => {
      Dropbox.choose({
        success: (files) => {
          this.props.onValueChange(this.props.index, 'url', files[0].link);
        },

        cancel: () => {
          this.props.onValueChange(this.props.index, 'origin', '');
        },

        // Optional. "preview" (default) is a preview link to the document for sharing,
        // "direct" is an expiring link to download the contents of the file. For more
        // information about link types, see Link types below.
        linkType: 'direct',

        // Optional. A value of false (default) limits selection to a single file, while
        // true enables multiple file selection.
        multiselect: false
      });
    }, 1);
  },

  renderRemoveBtn: function () {
    var classes = 'bttn-remove-imagery' + (this.props.total <= 1 ? ' disabled' : '');
    return (
      <div className='form-img-actions'>
        <button type='button' className={classes} onClick={this.props.removeImageryLocation.bind(null, this.props.index)} title='Remove dataset'><span>Remove dataset</span></button>
      </div>
    );
  },

  renderInputOption: function () {
    if (this.props.data.origin === '') {
      return (
        <div className='imagery-location-import'>
          <button type='button' className='bttn-imagery-manual' onClick={() => this.props.onValueChange(this.props.index, 'origin', 'manual')} title='Input url manually'><span>Manual</span></button>
          <button type='button' className='bttn-imagery-dropbox' onClick={this.importDropboxClick} title='Import file from dropbox'><span>Dropbox</span></button>
          <p className='form-help'>Select file source location.</p>
        </div>
      );
    }
  },

  renderInput: function () {
    // Just to shorten.
    var i = this.props.index;
    let opts = {};
    let validationName = this.props.validationName + '.' + i + '.url';
    switch (this.props.data.origin) {
      case 'manual':
        opts = {
          name: this.getName('url'),
          id: this.getId('url'),
          onBlur: this.props.handleValidation(validationName),
          onChange: this.onChange.bind(null, 'url'),
          value: this.props.data.url
        };
        return (
          <div>
            <input type='url' className='form-control' placeholder='Imagery url' {...opts} />
            {this.props.renderErrorMessage(this.props.getValidationMessages(validationName)[0])}
          </div>
        );
      case 'dropbox':
        if (this.props.data.url === '') {
          return <p>Loading file selector. Please wait...</p>;
        }

        opts = {
          name: this.getName('url'),
          id: this.getId('url'),
          readOnly: true,
          value: this.props.data.url
        };
        return (
          <input type='url' className='form-control' {...opts} />
        );
      default:
        // More generic error.
        let err = this.props.getValidationMessages(validationName)[0] && this.props.index === 0
          ? 'At least one image is needed'
          : null;
        return this.props.renderErrorMessage(err);
    }
  },

  render: function () {
    // Just to shorten.
    return (
      <div className='imagery-location-fieldset'>
        {this.renderRemoveBtn()}
        <div className='imagery-location'>
          {this.renderInputOption()}
          {this.renderInput()}
        </div>
      </div>
    );
  }
});
