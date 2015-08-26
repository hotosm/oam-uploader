'use strict';
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = module.exports = React.createClass({
  displayName: 'App',

  mixins: [Router.State],

  renderIntro: function () {
    if (!this.isActive('home')) {
      return '';
    }

    return (
      <div className="site-intro">
        <p>Welcome to the <a href="http://openaerialmap.org/" title="Visit OpenAerialMap">OpenAerialMap</a> Imagery Uploader. Use the form below to submit your imagery, if you have a valid upload token. Learn how to contribute with imagery by <a href="https://github.com/hotosm/oam-uploader" title="Go to the GitHub repo">reading the documentation</a>.</p>
      </div>
    );
  },

  render: function() {
    var isHome = this.isActive('home');
    return (
      <div>
        <header className="site-header" role="banner">
          <div className="inner">
            <div className="site-headline">
              <h1 className="site-title"><img src="assets/graphics/layout/oam-logo-h-pos.svg" width="167" height="32" alt="OpenAerialMap logo" /><span>OpenAerialMap</span> <small>Uploader</small></h1>
            </div>
            {this.renderIntro()}
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
