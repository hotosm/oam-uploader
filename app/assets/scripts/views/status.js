'use strict';
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = module.exports = React.createClass({
  displayName: 'Status',

  render: function() {
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

            <div className="image-block">
              <h2 className="image-block-title">Image 1</h2>
              <dl className="status-details">
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