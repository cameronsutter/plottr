/** @jsx React.DOM */

var React = require('react');
var LineView = require('lineView');
var WholeBoardStore = require('wholeBoardStore');

var LineListView = React.createClass({

  defaults: {
    title: "Click to Edit",
    color: "#aaddff"
  },

  getInitialState: function() {
    return {lines: this.props.lines};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({lines: nextProps.lines});
  },

  render: function() {
    var lineViews = this.state.lines.map(function(line) {
      return <LineView key={line.id} line={line} editing={false} cards={this.findCards(this.props.cards, line.id)} beatMap={this.props.beatMap}/>;
    }, this);

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

  handleNewLineClick: function(e) {
    var lines = this.state.lines;
    lines.push({
      title: this.defaults.title,
      color: this.defaults.color
    });
    this.setState({lines: lines});
    WholeBoardStore.saveLine({
      title: this.defaults.title,
      color: this.defaults.color,
      board_id: this.props.boardId,
      position: this.nextPosition()
    });
  },

  nextPosition: function() {
    var highest = 0;
    this.state.lines.forEach(function(line){
      if(line.position > highest) highest = line.position;
    });
    return highest + 1;
  }

});

module.exports = LineListView;