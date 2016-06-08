'use strict';
var React = require('react/addons');

var UhOh = React.createClass({
  render: function () {
    return (
      <div className='intro-block'>
        <h2>404 Not found</h2>
        <p>UhOh that is a bummer.</p>
      </div>
    );
  }
});

module.exports = UhOh;
