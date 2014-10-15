/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Modal = require('react-modal/dist/react-modal');
var _ = require('lodash');

var CardTitleEditor = require('cardTitleEditor');

var CardDialog = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      activeEditor: null,
      card: null,
    };
  },

  componentWillMount: function() {
    this.initializeCardState(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.initializeCardState(nextProps);
  },

  initializeCardState: function(nextProps) {
    var card = _.find(nextProps.cards, function(c) {
      return c.id === parseInt(nextProps.params.cardId);
    }, this);
    this.setState({card: card});
  },

  closeModal: function() {
    this.transitionTo("boardView", {boardId: this.props.params.boardId});
  },

  openTitle: function() {
    if (!this.state.activeEditor)
      this.setState({activeEditor: "title"});
  },

  closeTitle: function() {
    if (this.isTitleOpen())
      this.setState({activeEditor: null});
  },

  isTitleOpen: function() {
    return this.state.activeEditor === "title";
  },

  render: function() {
    return (
      <Modal isOpen={true} onRequestClose={this.closeModal}>
        <div className="card-dialog">
          <div className="card-dialog__title">
            <CardTitleEditor card={this.state.card}
              isOpen={this.isTitleOpen()}
              onRequestOpen={this.openTitle}
              onRequestClose={this.closeTitle} />
          </div>
          <p className="card-dialog__description">{this.state.card.description}</p>
          <button className="card-dialog__close btn btn-primary"
            onClick={this.closeModal}>
            Close
          </button>
        </div>
      </Modal>
    );
  },
});

module.exports = CardDialog;
