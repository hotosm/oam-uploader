'use strict';
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = module.exports = React.createClass({
  displayName: 'App',

  mixins: [Router.State],

  render: function() {
    var isHome = this.isActive('home');
    return (
      <div>
        <header className="site-header" role="banner">
          <div className="inner">
            <div className="site-headline">
              <h1 className="site-title"><img src="assets/graphics/layout/oam-logo-h-pos.svg" width="167" height="32" alt="OpenAerialMap logo" /><span>OpenAerialMap</span> <small>Uploader</small></h1>
            </div>
          </div>
        </header>
        <main className="site-body" role="main">
          <div className="inner">
            <RouteHandler/>
          </div>
        </main>
      </div>
    )
  }
});
