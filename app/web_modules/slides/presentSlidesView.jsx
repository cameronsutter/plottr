/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');

var SlideView = require('slides/slideView');
var SlideFeedbackView = require('slides/slideFeedbackView');
var WholeBoardStore = require('wholeBoardStore');

var RBS = require('react-bootstrap');
var Button = RBS.Button;
var DropdownButton = RBS.DropdownButton;
var MenuItem = RBS.MenuItem;
var Icon = RBS.Glyphicon;


var PresentSlidesView = React.createClass({

  getInitialState: function() {
    return {
      board: null,
      beats: null,
      lines: null,
      cards: null,
      currentLineId: +this.props.params.lineId,
      currentBeatId: null,
      lowestBeatId: 0,
      highestBeatId: 1000000000,
      finished: false
    };
  },

  componentWillMount: function() {
    WholeBoardStore.addChangeListener(this.boardLoaded);
    WholeBoardStore.load(this.props.params.boardId);
  },

  componentWillUnmount: function() {
    WholeBoardStore.removeChangeListener(this.boardLoaded);
  },

  boardLoaded: function(response) {
    this.setState({
      board: WholeBoardStore.getBoard(),
      beats: WholeBoardStore.getBeats(),
      lines: WholeBoardStore.getLines(),
      cards: WholeBoardStore.getCards()
    });
    this.initCurrentBeatId();
  },

  initCurrentBeatId: function() {
    var cards = this.getCardsForCurrentLine();
    var sorted = _.sortBy(cards, 'beat_id');
    var currentBeatId = 0;
    if(sorted.length > 0){
      currentBeatId = sorted.shift().beat_id;
    }
    this.setState({
      currentBeatId: currentBeatId,
      lowestBeatId: currentBeatId,
      highestBeatId: sorted.pop().beat_id
    });
  },

  getCurrentLine: function() {
    return _.find(this.state.lines, {id: this.state.currentLineId});
  },

  getCardsForCurrentLine: function() {
    return _.filter(this.state.cards, {line_id: this.state.currentLineId});
  },

  getBeat: function(beatId) {
    return _.find(this.state.beats, {id: beatId});
  },

  advanceSlide: function() {
    this.findNextCardForLine(true);
  },

  regressSlide: function() {
    this.findNextCardForLine(false);
  },

  startOver: function() {
    this.setState({currentBeatId: this.state.lowestBeatId, finished: false});
  },

  findNextCardForLine: function(increasing) {
    var cards = this.getCardsForCurrentLine();
    var beatId = this.state.currentBeatId;
    var beat = this.getBeat(beatId);
    var card = null;
    while(!card){
      //TODO: when we care about beat position, this will need to change
      // maybe get an array of beat ids in order (by position)
      if(increasing){
        beatId++;
      }else{
        beatId--;
      }
      if(beatId >= this.state.lowestBeatId && beatId <= this.state.highestBeatId){
        card = this.getCardForBeat(cards, beatId);
      } else {
        //not within allowed beat ids, so kill the loop
        card = this.getCardForBeat(cards, this.state.currentBeatId);
        this.setState({finished: true});
      }
    }
    //now that we've got the right beat, save it
    this.setState({currentBeatId: card.beat_id});
  },

  getCardForBeat: function(cards, beatId) {
    return _.find(cards, {beat_id: beatId});
  },

  handleKeyDown: function(e) {
    console.log(e.which);
  },

  render: function() {
    return this.state.board ? this.renderBoard() : this.renderLoading();
  },

  renderBoard: function() {
    var currentLine = this.getCurrentLine();
    return (
      <div>
        <h1>{this.state.board.title}</h1>
        <h2>{currentLine.title}</h2>
        <div className="slide-create__slide-container">
          {this.renderStartOverButton()}
          {this.renderCardsForLine()}
        </div>
      </div>
    );
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  },

  renderStartOverButton: function() {
    if(this.state.finished){
      return <Button bsSize='large' bsStyle='success' onClick={this.startOver}>Start Over!</Button>;
    }
  },

  renderCardsForLine: function() {
    var cards = this.getCardsForCurrentLine();
    var beatId = this.state.currentBeatId;
    var beat = this.getBeat(beatId);
    var card = this.getCardForBeat(cards, beatId);
    if(beat && card){
      return (<div className="slide-create__slide" onClick={this.advanceSlide} onDoubleClick={this.regressSlide}>
        <h3>{beat.title}</h3>
        <SlideView key={card.id} card={card} />
      </div>)
    } else {
      return <div>Loading...</div>;
    }
  },

});

module.exports = PresentSlidesView;