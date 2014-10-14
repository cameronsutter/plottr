/** @jsx React.DOM */

var React = require('react');
var BeatListView = require('beatListView');
var LineListView = require('lineListView');
var $ = require('jquery');


var BoardView = React.createClass({

  getInitialState: function() {
    return {
      board: null,
      beats: null,
      lines: null,
      cards: null
    };
  },

  componentWillMount: function() {
    $.getJSON('/api/boards/' + this.props.params.boardId + '/whole_board')
    .done(this.boardLoaded);
  },

  boardLoaded: function(response) {
    this.setState({
      board: response.board,
      beats: response.beats,
      lines: response.lines,
      cards: response.cards
    });
  },

  render: function() {
    return this.state.board ? this.renderBoard() : this.renderLoading();
  },

  renderBoard: function() {
    return (
      <div>
        <h1>{this.state.board.title}</h1>
        <div>
          <BeatListView beats={this.state.beats}/>
          <LineListView lines={this.state.lines}/>
        </div>
      </div>
    );
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  }

});

module.exports = BoardView;
