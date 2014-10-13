/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;

NavBar = React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="root" className="navbar-brand">Plottr</Link>
        </div>

        <div className="collapse navbar-collapse" id="navbar-collapse-1">
          <ul className="nav navbar-nav">
          </ul>
        </div>
      </nav>
    );
  },
});

module.exports = NavBar;
