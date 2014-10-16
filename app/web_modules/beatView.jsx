/** @jsx React.DOM */

var React = require('react');
var BeatView = require('beatView');
var WholeBoardStore = require('wholeBoardStore');

var BeatView = React.createClass({

  getInitialState: function() {
    return {
      title: this.props.beat.title,
      editing: this.props.editing
    };
  },

  render: function() {
    return this.state.editing ? this.renderEditor() : this.renderBeat();
  },

  renderBeat: function() {
    return <li className="beat-list__item" onClick={this.startEditing}>{this.state.title}</li>;
  },

  renderEditor: function() {
    return (
      <li className="beat-list__item__editing">
        <div className="input-group input-group-sm" onBlur={this.finishEditing}>
          <input type="text" className="form-control" defaultValue={this.state.title} ref="newTitle" onKeyUp={this.handleEdit} autoFocus/>
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button" onClick={this.finishEditing}>save</button>
          </span>
        </div>
      </li>
    );
  },

  startEditing: function() {
    this.setState({editing: true});
  },

  handleEdit: function(e) {
    if(e.keyCode == 13){
      this.finishEditing();
    }
  },

  finishEditing: function() {
    this.saveBeat();
    this.setState({editing: false});
  },

  saveBeat: function() {
    var newTitle = this.refs.newTitle.getDOMNode().value;
    var newBeat = {
      id: this.props.beat.id,
      title: newTitle
    };
    this.setState({title: newTitle});
    WholeBoardStore.saveBeat(newBeat);
  }
});

module.exports = BeatView;
