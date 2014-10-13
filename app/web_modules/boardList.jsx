/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;
var BoardListStore = require('boardListStore');

var BoardList = React.createClass({

  getInitialState: function() {
    return {
      boards: null
    };
  },

  componentWillMount: function() {
    BoardListStore.subscribe(this.setBoardListState);
  },

  componentWillUnmount: function() {
    BoardListStore.removeChangeListener(this.setBoardListState);
  },

  setBoardListState: function() {
    this.setState(BoardListStore.getState());
  },

  render: function() {
    return this.state.boards ? this.renderBoards() : this.renderLoading();
  },

  renderBoards: function() {
    var boardsListItems = this.state.boards.map(function(board){
      return (
        <li key={board.id} className="row">
          <Link className="col-md-4" to="boardView" params={{boardId: board.id}}>
            {board.title}
          </Link>
          <Link className="col-md-4" to="boardEditor" params={{boardId: board.id}}>
            Edit
          </Link>
        </li>
      );
    });

    return (
      <div className="board-list">
        <h1>These are your cool boards</h1>
        <Link to="boardEditor" params={{boardId: "new"}}>New Board</Link>
        <ul className="list-unstyled">{boardsListItems}</ul>
      </div>
    );
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  }
});

module.exports = BoardList;
