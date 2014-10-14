/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');

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
    </div>);
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  }

});

module.exports = LineView;