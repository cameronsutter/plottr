/** @jsx React.DOM */

var React = require('react');
var LineView = require('lineView');

var LineListView = React.createClass({

  getInitialState: function() {
    return {lines: null};
  },

  render: function() {
    var lineViews = this.props.lines.map(function(line) {
      return <LineView key={line.id} line={line}/>;
    });

    return (<div className="line-list">
      {lineViews}
    </div>);
  }

});

module.exports = LineListView;