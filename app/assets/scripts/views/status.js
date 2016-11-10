'use strict';
var React = require('react/addons');
var Router = require('react-router');
var moment = require('moment');
var turfCentroid = require('turf-centroid');
var parse = require('wellknown');

var util = require('util');
var url = require('url');
var nets = require('nets');
var apiUrl = require('../config.js').OAMUploaderApi;

function dateFormat (date) {
  // http://momentjs.com/docs/#/displaying/
  return moment(date).format('YYYY-M-D [at] H:mm');
}

module.exports = React.createClass({
  displayName: 'Status',

  mixins: [Router.State],

  getInitialState: function () {
    return {
      loading: true
    };
  },

  componentWillMount: function () {
    var id = this.getParams().id;
    nets(url.resolve(apiUrl, '/uploads/' + id), function (err, resp, body) {
      if (err) {
        return this.setState({
          loading: false,
          errored: true,
          message: err.message,
          data: err
        });
      }

      try {
        var data = JSON.parse(body.toString());
        this.setState({
          loading: false,
          errored: resp.statusCode < 200 || resp.statusCode >= 400,
          message: 'API responded with ' + resp.statusCode,
          data: data
        });
      } catch (err) {
        console.error(err);
        return this.setState({
          loading: false,
          errored: true,
          message: 'Error parsing API response; statusCode: ' + resp.statusCode,
          data: '' + body
        });
      }
    }.bind(this));
  },

  renderScene: function (scene) {
    return (
      <section className='panel status-panel'>
        <header className='panel-header'>
          <div className='panel-headline'>
            <h1 className='panel-title'>Dataset: <span className='given-title'>{scene.title}</span></h1>
          </div>
        </header>
        <div className='panel-body'>
          <dl className='status-details'>
            <dt>Platform</dt>
            <dd>{scene.platform}</dd>
            <dt>Sensor</dt>
            <dd>{scene.sensor || ''}</dd>
            <dt>Provider</dt>
            <dd>{scene.provider}</dd>
            <dt>Acquisition Date</dt>
            <dd>{dateFormat(scene.acquisition_start)} - {dateFormat(scene.acquisition_end)}</dd>
            { scene.tms ? [
              <dt>Tile service</dt>,
              <dd>{scene.tms}</dd>
            ] : '' }
            <dt>Contact</dt>
            <dd><span className='name'>{scene.contact.name}</span> <span className='email'>{scene.contact.email}</span></dd>
          </dl>

          {scene.images.map(this.renderImage.bind(this))}

        </div>
        <footer className='panel-footer'></footer>
      </section>
    );
  },

  renderImage: function (image, i) {
    var status;
    var messages = image.messages.map(function (msg) { return <li>{msg}</li>; });
    if (image.status === 'finished') {
      var footprint = image.metadata.footprint;
      var f = parse(footprint);

      var coords = turfCentroid(f).geometry.coordinates;
      var url = 'https://beta.openaerialmap.org/#/' + coords +',12';

      status = 'status-success';
      messages.unshift(<li><a href={url} title='View image on OpenAerialMap' className='bttn-view-image'>View image</a></li>);
    } else if (image.status === 'processing') {
      status = 'status-processing';
      messages.unshift(<li>Upload in progress.</li>);
    } else if (image.status === 'errored') {
      status = 'status-error';
      messages.unshift(<li><strong>Upload failed: </strong> {image.error.message}</li>);
    }

    status = ' ' + status + ' ';

    var imgStatusMatrix = {
      'initial': 'Pending',
      'processing': 'Processing',
      'finished': 'Finished',
      'errored': 'Errored'
    };

    return (
      <div className={'image-block' + status}>
        <h2 className='image-block-title'>Image {i}</h2>
        <p className={'status' + status}>{imgStatusMatrix[image.status]}</p>
        <dl className='status-details'>
          <dt>Started</dt>
          <dd>{dateFormat(image.startedAt)}</dd>
          { image.stoppedAt ? [
            <dt>{image.status === 'finished' ? 'Finished' : 'Stopped'}</dt>,
            <dd>{dateFormat(image.stoppedAt)}</dd>
          ] : '' }
          <dt>Info</dt>
          <dd className='info-detail'>
            <ul>{messages}</ul>
          </dd>
        </dl>
      </div>
    );
  },

  render: function () {
    if (this.state.loading) {
      return (<div><h1>Loading...</h1></div>);
    }

    if (this.state.errored) {
      return (
        <div className='intro-block'>
          <h2>Status upload</h2>
          <p>There was an error: {this.state.message}.</p>
          <pre>{util.inspect(this.state.data)}</pre>
        </div>
      );
    }

    var data = this.state.data;

    return (
      <div>

        <div className='intro-block'>
          <h2>Status upload</h2>
        </div>

        <section className='panel status-panel'>
          <header className='panel-header'>
            <div className='panel-headline'>
              <h1 className='panel-title'>General</h1>
            </div>
          </header>
          <div className='panel-body'>
            <dl className='status-details'>
              <dt>Uploader</dt>
              <dd><span className='name'>{data.uploader.name}</span> <span className='email'>{data.uploader.email}</span></dd>
              <dt>Date</dt>
              <dd>{dateFormat(data.createdAt)}</dd>
            </dl>
          </div>
          <footer className='panel-footer'></footer>
        </section>

        {data.scenes.map(function (scene) { return this.renderScene(scene); }.bind(this))}

      </div>
    );
  }
});
