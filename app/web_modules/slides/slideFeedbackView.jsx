/** @jsx React.DOM */

var React = require('react');

var RBS = require('react-bootstrap');
var Button = RBS.Button;
var Input = RBS.Input;

var SlideFeedbackView = React.createClass({

  getInitialState: function() {
    return {
      card: this.props.card,
      creating: this.props.creating
    };
  },

  render: function() {
    return (<div className="feedback__container">
      <h6>Feedback setup</h6>
      <div className="feedback__form">

      </div>
    </div>);
  },

});

module.exports = SlideFeedbackView;