'use strict';
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var util = require('util');
var url = require('url');
var nets = require('nets');
var apiUrl = require('../config.js').OAMUploaderApi;

var App = module.exports = React.createClass({
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
        return this.setState({
          loading: false,
          errored: true,
          message: 'Error parsing API response; statusCode: ' + resp.statusCode,
          data: body
        })
      }
    }.bind(this));
  },

  render: function() {
    if (this.state.errored) {
      console.log(this.state);
      return (
        <div>
          <h1>There was an error.</h1>
          <div>{this.state.message}</div>
          <pre>{util.inspect(this.state.data)}</pre>
        </div>
      );
    }

    return (
      <div>

        <section className="panel status-panel">
          <header className="panel-header">
            <div className="panel-headline">
              <h1 className="panel-title">General</h1>
            </div>
          </header>
          <div className="panel-body">
            <dl className="status-details">
              <dt>Token</dt>
              <dd>120a81d1a235c3512fb85ab4fe67acb4e9cb8b0590789cc034d0da140a4a8ea8636f4788c4609c9bc727d5a91b1eabb31ff8b2a72d60354bf3d9d842e5f08e6b</dd>
              <dt>Uploader</dt>
              <dd><span className="name">Lady Stardust</span> <span className="email">lady@stardust.xyz</span></dd>
              <dt>When</dt>
              <dd>August 14, 2015 at 4:30AM</dd>
            </dl>
          </div>
          <footer className="panel-footer"></footer>
        </section>

        <section className="panel status-panel">
          <header className="panel-header">
            <div className="panel-headline">
              <h1 className="panel-title">Scene</h1>
              <p className="panel-subtitle">Talisay Tanauan</p>
            </div>
          </header>
          <div className="panel-body">
            <dl className="status-details">
              <dt>Platform</dt>
              <dd>UAV</dd>
              <dt>Sensor</dt>
              <dd>Blue Bird Drone 4K</dd>
              <dt>Provider</dt>
              <dd>SkyEye Inc.</dd>
              <dt>Date</dt>
              <dd>2015-08-25 12:19:21 - 2015-08-25 12:19:21</dd>
              <dt>Tile service</dt>
              <dd>http://a.tiles.mapbox.com/v4/openroads.n6p4np8h</dd>
              <dt>Contact</dt>
              <dd><span>Edgar Ilaga</span> <span>edgarilaga@skyeyeproject.com</span></dd>
            </dl>

            <div>
              <h2>Image 1.1</h2>
              <dl>
                <dt>Status</dt>
                <dd>Initial</dd>
                <dt>Started</dt>
                <dd>2015-08-24T21:08:44.108Z</dd>
              </dl>
            </div>

          </div>
          <footer className="panel-footer"></footer>
        </section>

      </div>
    );
  }
});
