/** @jsx React.DOM */

var React = require('react');

var BoardView = React.createClass({
  render: function() {
    return (
      <h1>This is where you would view board {this.props.params.boardId}</h1>
    );
  },
});

module.exports = BoardView;
