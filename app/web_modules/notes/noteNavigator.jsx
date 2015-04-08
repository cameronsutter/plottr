/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var NavBar = require('navbar');
var WholeBoardStore = require('wholeBoardStore');
var MarkDown = require("pagedown").getSanitizingConverter();

var RBS = require('react-bootstrap');
var Button = RBS.Button;
var Icon = RBS.Glyphicon;


var NoteNavigator = React.createClass({

  getInitialState: function() {
    var notes = this.makeNoteTrees(this.props.notes);
    return {
      noteTree: notes.tree,
      notesById: notes.byId
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var notes = this.makeNoteTrees(nextProps.notes);
    this.setState({
      noteTree: notes.tree,
      notesById: notes.byId
    });
  },

  newNote: {
    title: "a new note",
    description: "this is going to be good. I can tell",
    parent_id: null
  },

  makeNoteTrees: function(notes) {
    if(!notes) return {tree: null, byId: null};
    var roots = [];
    var notesById = [];
    //to object
    notes.forEach(function(note){
      notesById[note.id] = {
        data: {
          id: note.id,
          title: note.title,
          description: note.description
        },
        children: [],
        parentId: note.parent_id
      };
    });
    var clone = _.cloneDeep(notesById);
    //add to parents
    notesById.forEach(function(note) {
      if(note.parentId != null) {
          notesById[note.parentId].children.push(note);
      }
    });
    //pull out the roots
    roots = notesById.filter(function(note) {
      return note.parentId == null;
    });
    return {tree: roots, byId: clone};
  },

  handleNoteClick: function(e) {
    var id = e.target.parentElement.getAttribute("value");
    var note = this.state.notesById[id];
    this.props.updateCurrentNote(note.data);
  },

  insertNewNote: function() {
    var newNote = _.cloneDeep(this.newNote);
    newNote["board_id"] = this.props.params.boardId;
    WholeBoardStore.saveNote(newNote);
  },

  render: function() {
    return (<div className="note-navigator__box">
      <h2>Notes</h2>
      <hr />
      {this.renderTree(this.state.noteTree)}
      <hr />
      <Button onClick={this.insertNewNote}><Icon glyph="plus"/></Button>
    </div>);
  },

  renderTree: function(tree) {
    if(!tree) return this.renderEmptyTree();

    return tree.map(function(node){
      return this.renderNode(node);
    }.bind(this));
  },

  renderNode: function(node) {
    var children = node.children.length > 0 ? this.renderChildren(node.children) : null;

    return (<div className="note-navigator__node" value={node.data.id}>
      <p className="note-navigator__title" onClick={this.handleNoteClick} >{node.data.title}</p>
      {children}
    </div>);
  },

  renderChildren: function(children) {
    //glpyh could also be chevron-right
    return (<div className="note-navigator__children">
      <div className="note-navigator__placeholder" ><Icon glyph="minus" /></div>
      {this.renderTree(children)}
    </div>);
    },

  renderEmptyTree: function() {
    return <div>No Notes</div>;
  },


});

module.exports = NoteNavigator;


// var notes = [{id: 0, title: "", description: "", parent_id: null}, {id: 1, title: "", description: "", parent_id: 0}, {id: 2, title: "", description: "", parent_id: null}, {id: 3, title: "", description: "", parent_id: 2}, {id: 4, title: "", description: "", parent_id: 3}, {id: 5, title: "", description: "", parent_id: 3}, {id: 6, title: "", description: "", parent_id: 5}, {id: 7, title: "", description: "", parent_id: 3}]