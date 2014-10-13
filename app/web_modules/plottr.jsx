/** @jsx React.DOM */

var React = require('react');
var NavBar = require('navbar');

var Plottr = React.createClass({
  render: function() {
    return (
      <div className="main">
        <NavBar />
        <this.props.activeRouteHandler />
      </div>
    );
  },
});

module.exports = Plottr;
