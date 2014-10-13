/** @jsx React.DOM */

var React = require('react');

var BoardList = React.createClass({
  render: function() {
    return (
      <div className="project-list">
        <h1>This is where you would view a list of boards</h1>
        <ul>
          <li>Board Foo</li>
          <li>Board Bar</li>
          <li>Board Baz</li>
        </ul>
      </div>
    );
  }
});

module.exports = BoardList;
