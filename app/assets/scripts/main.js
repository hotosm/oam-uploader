'use strict';
var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./views/app');
var Home = require('./views/home');

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.querySelector('.site-canvas'));
});