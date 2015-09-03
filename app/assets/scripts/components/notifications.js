'use strict';
var React = require('react/addons');

var Notifications = React.createClass({

  dismissNotification: function(e) {
    e.preventDefault();
    this.props.onNotificationDismiss();
  },

  render: function() {
    if (this.props.type === null) {
      return null;
    }

    var classes = 'notification notification-' + this.props.type;
    return (
      <div className={classes} role="alert">
        <p>{this.props.children}</p>
        <a href="#" className="notification-dismiss" title="Dismiss notification" onClick={this.dismissNotification}><span>Dismiss</span></a>
      </div>
    );
  }
});

module.exports = Notifications;