/** @jsx React.DOM */

var React = require('react');
var WholeBoardStore = require('wholeBoardStore');
var MarkDown = require("pagedown").getSanitizingConverter();

var CardDescriptionEditor = React.createClass({
  getInitialState: function() {
    return {
      editedDescription: this.props.card.description,
    };
  },

  handleEdit: function() {
    this.props.onRequestOpen();
  },

  handleCancel: function() {
    this.props.onRequestClose();
  },

  handleSave: function() {
    WholeBoardStore.saveCard({
      id: this.props.card.id,
      description: this.state.editedDescription,
    });
    this.props.onRequestClose();
  },

  handleDescriptionChanged: function(e) {
    this.setState({editedDescription: e.target.value});
  },

  render: function() {
    return this.props.isOpen ? this.renderEditor() : this.renderPlain();
  },

  renderPlain: function() {
    return (
      <div className="card-description-editor">
        <div
          className="card-description-editor__display"
          onClick={this.handleEdit}
          dangerouslySetInnerHTML={{__html: MarkDown.makeHtml(this.props.card.description)}} >
        </div>
      </div>
    );
  },

  renderMarkDownDescription: function() {
    return this.dangerouslySetInnerHTML();
  },

  renderEditor: function() {
    return (
      <div className="card-description-editor">
        <textarea className="form-control"
          rows="13" value={this.state.editedDescription}
          onChange={this.handleDescriptionChanged} />
        <div className="card-description-editor__button-bar">
          <button className="btn btn-success card-description-editor__save"
            onClick={this.handleSave}>
            Save
          </button>
          <button className="btn btn-danger card-description-editor__cancel"
            onClick={this.handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  },
});

module.exports = CardDescriptionEditor;
