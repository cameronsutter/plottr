/** @jsx React.DOM */

var React = require('react');
var LineView = require('lineView');

var LineListView = React.createClass({

  getInitialState: function() {
    return {lines: null};
  },

  render: function() {
    var sortedLines = this.props.lines.slice(0).sort(function(a, b) {
      return a.position - b.position;
    });

    $findCards = this.findCards;
    $beatMap = this.props.beatMap;
    $cards = this.props.cards;

    var lineViews = sortedLines.map(function(line) {
      return <LineView key={line.id} line={line} cards={$findCards($cards, line.id)} beatMap={$beatMap}/>;
    });

    return (<div className="line-list">
      {lineViews}
    </div>);
  },

  findCards: function(cards, lineId) {
    return cards.filter(function(card) {
      return card.line_id == lineId;
    });
  }

});

module.exports = LineListView;