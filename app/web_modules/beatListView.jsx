/** @jsx React.DOM */

var React = require('react');

var BeatListView = React.createClass({

  renderBeats: function() {
    return this.props.beats.map(function(beat) {
      return <li key={beat.id} className="beat-list__item">{beat.title}</li>;
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

  },
});

module.exports = BeatListView;
