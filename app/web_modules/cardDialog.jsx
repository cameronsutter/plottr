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
        <h2>{this.state.card.title}</h2>
        <button className="btn btn-primary" onClick={this.closeModal}>Close</button>
      </Modal>
    );
  },
});

module.exports = CardDialog;
