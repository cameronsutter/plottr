/** @jsx React.DOM */

var React = require('react');

var BeatListView = React.createClass({

  renderBeats: function() {
    var sortedBeats = this.props.beats.slice(0).sort(function(a, b) {
      return a.position - b.position;
    });

    return sortedBeats.map(function(beat) {
      return <li key={beat.id} className="beat-list__item">{beat.title}</li>;
    });
  },

  render: function() {
    return (
      <ul className="beat-list">
        <li className="beat-list__placeholder" />
        {this.renderBeats()}
      </ul>
    );
  },
});

module.exports = BeatListView;
