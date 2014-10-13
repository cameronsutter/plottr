/** @jsx React.DOM */

var React = require('react');

var BoardEditor = React.createClass({
  render: function() {
    return (
      <h1>This is where you would edit board {this.props.params.boardId}</h1>
    );
  },
});

module.exports = BoardEditor;
