/** @jsx React.DOM */

var React = require('react');

var LineView = React.createClass({

  getInitialState: function() {
    return {line: null};
  },

  render: function() {
    return this.props.line ? this.renderLine() : this.renderLoading();
  },

  renderLine: function() {
    console.log(this.props.line);
    return (<div className="stuff">
      <div className="line__title">{this.props.line.title}</div>
      <div className="line__svg-line">
        <svg height="150" width="1000">
          <line x1="0" y1="0" x2="200" y2="200" style={{stroke:"rgb(255,0,0)",strokeWidth:"2"}} />
        </svg>
      </div>
    </div>);
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  }

});

module.exports = LineView;