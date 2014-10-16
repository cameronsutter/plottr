/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var BeatView = require('beatView');
var WholeBoardStore = require('wholeBoardStore');

var BeatListView = React.createClass({

  defaults: {
    title: "Click to Edit"
  },

  getInitialState: function() {
    return { beats: this.props.beats };
  },

  renderBeats: function() {
    return this.state.beats.map(function(beat) {
      return <BeatView key={beat.id} beat={beat} editing={false} />;
    });
  },

  render: function() {
    return (
      <ul className="beat-list">
        <li className="beat-list__placeholder" />
        {this.renderBeats()}
        <li className="beat-list__new" onClick={this.handleNewBeatClick} />
      </ul>
    );
  },

  handleNewBeatClick: function() {
    var beats = this.state.beats;
    beats.push({
      id: _.uniqueId("beat-"),
      title: this.defaults.title
    });
    this.setState({beats: beats});
    WholeBoardStore.saveBeat({
      title: this.defaults.title,
      board_id: this.props.boardId,
      position: this.nextPosition()
    });
  },

  nextPosition: function() {
    var highest = 0;
    this.state.beats.forEach(function(beat){
      if(beat.position > highest) highest = beat.position;
    });
    return highest + 1;
  }
});

module.exports = BeatListView;
