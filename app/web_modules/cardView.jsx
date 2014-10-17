/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var Router = require('react-router');

var WholeBoardStore = require('wholeBoardStore');

var CardView = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      color: this.props.color,
      dragging: false,
      dropping: false,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({color: nextProps.color});
  },

  render: function() {
    return this.props.card ? this.renderCard() : this.renderBlank();
  },

  renderCard: function() {
    var cardStyle = {
      borderColor: this.state.color,
    };
    if (this.state.dragging)
      cardStyle.opacity = "0.5";

    return (
      <div className="card__real" style={cardStyle}
        draggable={true}
        onClick={this.handleClick}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd} >
      <div className="card__title">{this.props.card.title}</div>
    </div>);
  },

  renderBlank: function() {
    var cardClass = "card__blank"
    if (this.state.dropping)
      cardClass += " card__hover";

    return (
      <div className={cardClass}
        style={{borderColor: this.state.color}}
        onClick={this.handleBlankClick}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      ></div>
    );
  },

  handleClick: function() {
    this.transitionTo("cardView", {boardId: this.props.boardId, cardId: this.props.card.id});
  },

  handleBlankClick: function() {
    this.transitionTo("newCard", {boardId: this.props.boardId, beatId: this.props.beatId, lineId: this.props.lineId});
  },

  handleDragStart: function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/json', JSON.stringify(this.props.card));
    this.setState({dragging: true});
  },

  handleDragEnd: function() {
    this.setState({dragging: false});
  },

  handleDragEnter: function(e) {
    this.setState({dropping: true});
  },

  handleDragOver: function(e) {
    e.preventDefault();
    return false;
  },

  handleDragLeave: function(e) {
    this.setState({dropping: false});
  },

  handleDrop: function(e) {
    e.stopPropagation();
    this.handleDragLeave();

    var json = e.dataTransfer.getData('text/json');
    var droppedCard = JSON.parse(json);
    if (!droppedCard.id) return;

    droppedCard.line_id = this.props.lineId;
    droppedCard.beat_id = this.props.beatId;
    WholeBoardStore.saveCard(droppedCard);
  },

});

module.exports = CardView;
