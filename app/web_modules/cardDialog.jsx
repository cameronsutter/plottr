/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Modal = require('react-modal/dist/react-modal');
var _ = require('lodash');

var CardDialog = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount: function() {
    var card = _.find(this.props.cards, function(c) {
      return c.id === parseInt(this.props.params.cardId);
    }, this);
    this.setState({card: card});
  },

  closeModal: function() {
    this.transitionTo("boardView", {boardId: this.props.params.boardId});
  },

  render: function() {
    return (
      <Modal isOpen={true} onRequesetClose={this.closeModal}>
        <div className="card-dialog">
          <h2 className="card-dialog__title">{this.state.card.title}</h2>
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
