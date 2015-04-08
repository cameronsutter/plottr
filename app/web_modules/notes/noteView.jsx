/** @jsx React.DOM */

var React = require('react');
var NavBar = require('navbar');
var WholeBoardStore = require('wholeBoardStore');
var MarkDown = require("pagedown").getSanitizingConverter();

var RBS = require('react-bootstrap');
var Button = RBS.Button;
var Icon = RBS.Glyphicon;


var NoteView = React.createClass({

  getInitialState: function() {
    return {
      title: this.props.note.title,
      description: this.props.note.description,
      editing: false,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      title: nextProps.note.title,
      description: nextProps.note.description
    });
  },

  render: function() {
    return (<div className="note">
      <h3>{this.state.title}</h3>
      <div
        className="note__description"
        dangerouslySetInnerHTML={{__html: MarkDown.makeHtml(this.state.description)}} >
      </div>
    </div>);
  }

});

module.exports = NoteView;