/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var CardView = require('cardView');
var WholeBoardStore = require('wholeBoardStore');

var LineView = React.createClass({

  getInitialState: function() {
    return {
      title: this.props.line.title,
      color: this.props.line.color,
      height: 113/2,
      editing: false
    };
  },

  findCard: function(cards, beatId) {
    return cards.filter(function(card) {
      return card.beat_id == beatId;
    }).pop();
  },

  lineLength: function() {
    return $(document.body).width() - 180;
  },

  handleStartEdit: function() {
    this.setState({editing: true});
  },

  doneEditing: function() {
    var newColor = this.refs.newColor.getDOMNode().value;
    var newTitle = this.refs.newTitle.getDOMNode().value;
    this.setState({editing: false, color: newColor, title: newTitle});
    WholeBoardStore.saveLine({
      id: this.props.line.id,
      title: newTitle,
      color: newColor
    });
  },

  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },

  render: function() {
    return this.props.line ? this.renderLine() : this.renderLoading();
  },

  renderLine: function() {
    lineLength = this.lineLength();
    title = this.state.editing ? this.renderEditing : this.renderTitle;
    return (<div className="line">
      {title()}
      <div className="line__svg-line-box">
        <svg width={lineLength} >
          <line x1="0" y1={this.state.height} x2={lineLength} y2={this.state.height} className="line__svg-line" style={{stroke: this.state.color}} />
          <line x1={lineLength - 1} y1={this.state.height - 12} x2={lineLength - 1} y2={this.state.height + 12} className="line__svg-line" style={{stroke: this.state.color}} />
        </svg>
      </div>
      <div className="card__box">
        {this.renderCards()}
      </div>
    </div>);
  },

  renderEditing: function() {
    return (<div className="line__title-box__edit input-group input-group-sm" >
      <input type="text" className="form-control" defaultValue={this.state.title} ref="newTitle" /><br/>
      <input type="color" className="form-control" defaultValue={this.state.color} ref="newColor" /><br/>
      <button className="btn btn-primary btn-sm" onClick={this.doneEditing}>done</button>
    </div>);
  },

  renderTitle: function() {
    return (<div className="line__title-box" onClick={this.handleStartEdit}>
      <div className="line__title" style={{backgroundColor: this.state.color, borderColor: this.state.color}}>{this.state.title}</div>
    </div>);
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  },

  renderCards: function() {
    var beatMap = this.props.beatMap;
    var $findCard = this.findCard;
    var $cards = this.props.cards;
    var boardId = this.props.line.board_id;

    return Object.keys(beatMap).map(function(beatPosition){
      var beatId = beatMap[beatPosition];
      var card = $findCard($cards, beatId);
      if(card){
        return <CardView key={card.id} card={card} beatId={beatId} boardId={boardId}/>;
      }else{
        return <CardView key={beatId+beatPosition} card={card} beatId={beatId} boardId={boardId}/>;
      }
    });
  },

});

module.exports = LineView;