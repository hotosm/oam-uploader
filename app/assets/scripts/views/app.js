'use strict';
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = module.exports = React.createClass({
  displayName: 'App',

  render: function() {
    return (<RouteHandler/>)
  }
});