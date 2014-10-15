/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var Router = require('react-router');

var CardView = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function() {
    return {card: null};
  },

  render: function() {
    return this.props.card ? this.renderCard() : this.renderBlank();
  },

  renderCard: function() {
    return (<div className="card__real" onClick={this.handleClick}>
      <div className="card__title">{this.props.card.title}</div>
    </div>);
  },

  renderBlank: function() {
    return (<div className="card__blank" onClick={this.handleBlankClick}>
      <div className="card__title"></div>
    </div>);
  },

  handleClick: function() {
    this.transitionTo("cardView", {boardId: this.props.boardId, cardId: this.props.card.id});
  },

  handleBlankClick: function() {
    var card = {};
  }

});

module.exports = CardView;