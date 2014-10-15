/** @jsx React.DOM */

var React = require('react');
var LineView = require('lineView');

var LineListView = React.createClass({

  getInitialState: function() {
    return {lines: null};
  },

  render: function() {
    $findCards = this.findCards;
    $beatMap = this.props.beatMap;
    $cards = this.props.cards;

    var lineViews = this.props.lines.map(function(line) {
      return <LineView key={line.id} line={line} cards={$findCards($cards, line.id)} beatMap={$beatMap}/>;
    });

    return (<div className="line-list">
      {lineViews}
      <div className="line-list__new" onClick={this.handleNewLineClick} />
    </div>);
  },

  findCards: function(cards, lineId) {
    return cards.filter(function(card) {
      return card.line_id == lineId;
    });
  },

  handleNewLineClick: function() {

  }

});

module.exports = LineListView;