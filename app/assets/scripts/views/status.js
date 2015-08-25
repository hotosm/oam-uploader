'use strict';
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = module.exports = React.createClass({
  displayName: 'Status',

  render: function() {
    return (
      <div>
        <section className="status-section">
          <h2 className="section-title">Status</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </section>
      </div>
    );
  }
});