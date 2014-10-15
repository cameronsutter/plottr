/** @jsx React.DOM */

var React = require('react');

var CardTitleEditor = React.createClass({
  handleEdit: function() {
    this.props.onRequestOpen();
  },

  handleCancel: function() {
    this.props.onRequestClose();
  },

  handleSave: function() {
    // TODO: actually save, then request close
    this.props.onRequestClose();
  },

  render: function() {
    return this.props.isOpen ? this.renderEditor() : this.renderPlain();
  },

  renderPlain: function() {
    return (
      <div className="card-title-editor">
        <h2 className="card-title-editor__display"
          onClick={this.handleEdit}>
          {this.props.card.title}
        </h2>
      </div>
    );
  },

  renderEditor: function() {
    return (
      <div className="card-title-editor">
        <input className="card-title-editor__input form-control input-lg"
          type="text" defaultValue={this.props.card.title} />
        <div className="card-title-editor__button-bar">
          <button className="btn btn-success card-title-editor__save"
            onClick={this.handleSave}>
            Save
          </button>
          <button className="btn btn-danger card-title-editor__cancel"
            onClick={this.handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  },
});

module.exports = CardTitleEditor;
