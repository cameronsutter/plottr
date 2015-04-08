/** @jsx React.DOM */

var React = require('react');
var NavBar = require('navbar');
var WholeBoardStore = require('wholeBoardStore');
var NoteNavigator = require('notes/noteNavigator');
var NoteView = require('notes/noteView');


var NoteViewerView = React.createClass({

  getInitialState: function() {
    return {
      board: null,
      notes: null,
      currentNote: {title: "This pane is intentionally left blank", description: "click a note to the left to see it"},
    };
  },

  componentWillMount: function() {
    WholeBoardStore.addChangeListener(this.boardLoaded);
    WholeBoardStore.load(this.props.params.boardId);
  },

  componentWillUnmount: function() {
    WholeBoardStore.removeChangeListener(this.boardLoaded);
  },

  boardLoaded: function(response) {
    this.setState({
      board: WholeBoardStore.getBoard(),
      notes: WholeBoardStore.getNotes()
    });
  },

  updateCurrentNote: function(note) {
    this.setState({currentNote: note});
  },

  render: function() {
    return (<div>
        <NavBar />
        <div className="col-xs-3">
          <NoteNavigator notes={this.state.notes} updateCurrentNote={this.updateCurrentNote} />
        </div>
        <div className="col-xs-9">
          <NoteView note={this.state.currentNote} />
        </div>
    </div>);
  }

});

module.exports = NoteViewerView;