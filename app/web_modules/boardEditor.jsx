/** @jsx React.DOM */

var React = require('react');
var BoardListStore = require('boardListStore');

var BoardEditor = React.createClass({

  getInitialState: function() {
    return {
      board: null
    };
  },

  componentWillMount: function() {
    BoardListStore.subscribe(this.setBoardState);
  },

  componentWillUnmount: function() {
    BoardListStore.removeChangeListener(this.setBoardState);
  },

  setBoardState: function() {
    this.setState({board: BoardListStore.getBoard(parseInt(this.props.params.boardId))});
  },

  handleChange: function(e) {
    var newBoard = _.cloneDeep(this.state.board);
    newBoard.title = e.target.value;
    this.setState({board: newBoard});
  },

  render: function() {
    return this.state.board ? this.renderEdit() : this.renderLoading();
  },

  renderEdit: function() {
    return (
      <div>
        <h1>Board {this.state.board.title}</h1>
        <input type="text" value={this.state.board.title} onChange={this.handleChange}/>
      </div>
    );
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  }
});

module.exports = BoardEditor;
