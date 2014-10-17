/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;
var BoardListStore = require('boardListStore');

var RBS = require('react-bootstrap');
var Button = RBS.Button;
var Icon = RBS.Glyphicon;

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
        <li className="board-list__item" key={board.id}>
          <Link className="board-list__item-link" to="boardView" params={{boardId: board.id}}>
            {board.title}
          </Link>
          <Button bsSize="large" ><Icon glyph="pencil" />
            <Link className="board-list__item-link" to="boardEditor" params={{boardId: board.id}}>
              Edit
            </Link>
          </Button>
        </li>
      );
    });

    return (
      <div className="board-list">
        <h1>Boards</h1>
        <Link to="boardEditor" params={{boardId: "new"}} className="board-list__new-board-link">New Board</Link>
        <ul className="board-list">{boardsListItems}</ul>
      </div>
    );
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  }
});

module.exports = BoardList;
