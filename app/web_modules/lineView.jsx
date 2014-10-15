/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var CardView = require('cardView');

var LineView = React.createClass({

  getInitialState: function() {
    return {line: null};
  },

  render: function() {
    return this.props.line ? this.renderLine() : this.renderLoading();
  },

  renderLine: function() {
    return (<div className="line">
      <div className="line__title">{this.props.line.title}</div>
      <div className="line__svg-line-box">
        <svg width={$(document.body).width() - 120}>
          <line x1="0" y1="0" x2={$(document.body).width() - 120} y2="0" className="line__svg-line" />
        </svg>
      </div>
      <div className="card__box">
        {this.renderCards()}
      </div>
    </div>);
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  },

  renderCards: function() {
    var beatMap = this.props.beatMap;
    var $findCard = this.findCard;
    var $cards = this.props.cards;
    var boardId = this.props.line.board_id;

    return Object.keys(beatMap).map(function(beatPosition){
      var beatId = beatMap[beatPosition];
      var card = $findCard($cards, beatId);
      if(card){
        return <CardView key={card.id} card={card} beatId={beatId} boardId={boardId}/>;
      }else{
        return <CardView key={beatId+beatPosition} card={card} beatId={beatId} boardId={boardId}/>;
      }
    });
  },

  findCard: function(cards, beatId) {
    return cards.filter(function(card) {
      return card.beat_id == beatId;
    }).pop();
  }

});

module.exports = LineView;