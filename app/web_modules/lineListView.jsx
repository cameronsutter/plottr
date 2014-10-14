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

    var lineViews = sortedLines.map(function(line) {
      return <LineView key={line.id} line={line}/>;
    });

    return (<div className="line-list">
      {lineViews}
    </div>);
  }

});

module.exports = LineListView;