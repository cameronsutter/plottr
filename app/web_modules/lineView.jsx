/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var _ = require('lodash');
var CardView = require('cardView');
var WholeBoardStore = require('wholeBoardStore');

var RBS = require('react-bootstrap');
var Button = RBS.Button;
var Icon = RBS.Glyphicon;

var LineView = React.createClass({

  getInitialState: function() {
    return {
      title: this.props.line.title,
      color: this.props.line.color,
      height: 66/2,
      width: 150+25,
      editing: this.props.editing
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      title: nextProps.line.title,
      color: nextProps.line.color,
      editing: nextProps.editing
    });
  },

  findCard: function(cards, beatId) {
    return _.find(cards, function(card) {
      return card.beat_id == beatId;
    });
  },

  lineLength: function() {
    return this.numOfBeats() * this.state.width + 25;
  },

  numOfBeats: function() {
    return Object.keys(this.props.beatMap).length + 1; // + 2 because of the placeholder and the new (hidden) beats
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

  handleDelete: function() {
    if(confirm("Are you sure you want to delete " + this.props.line.title + "?")){
      this.setState({editing: false});
      WholeBoardStore.deleteLine(this.props.line);
    }
  },

  handleFocus: function(e) {
    var val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  },

  render: function() {
    return this.props.line ? this.renderLine() : this.renderLoading();
  },

  renderLine: function() {
    var lineLength = this.lineLength();
    var title = this.state.editing ? this.renderEditor() : this.renderTitle();
    return (<div className="line" style={{width: (lineLength + this.state.width)}}>
      {title}
      <div className="line__svg-line-box">
        <svg width={lineLength} >
          <line x1="0" y1={this.state.height} x2={lineLength} y2={this.state.height} className="line__svg-line" style={{stroke: this.state.color}} />
        </svg>
      </div>
      <div className="card__box">
        {this.renderCards()}
      </div>
    </div>);
  },

  renderEditor: function() {
    return (<div className="line__title-box__edit input-group input-group-sm" >
      <input type="text" className="form-control" defaultValue={this.state.title} ref="newTitle" onFocus={this.handleFocus} autoFocus /><br/>
      <input type="color" className="form-control" defaultValue={this.state.color} ref="newColor" /><br/>

      <Button bsStyle="success" bsSize="small" onClick={this.doneEditing}><Icon glyph="ok" /></Button>
      <Button bsStyle="danger" bsSize="small" onClick={this.handleDelete}><Icon glyph="trash" /></Button>
    </div>);
  },

  renderTitle: function() {
    return (<div className="line__title-box" onClick={this.handleStartEdit}>
      <div className="line__title" >{this.state.title}</div>
    </div>);
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  },

  renderCards: function() {
    var beatMap = this.props.beatMap;

    return Object.keys(beatMap).map(function(beatPosition){
      var beatId = beatMap[beatPosition];
      var card = this.findCard(this.props.cards, beatId);
      var id = card ? card.id : ""+beatId+beatPosition;
      return <CardView key={id} card={card}
        boardId={this.props.line.board_id} beatId={beatId}
        lineId={this.props.line.id} color={this.state.color} />;
    }, this);
  },

});

module.exports = LineView;