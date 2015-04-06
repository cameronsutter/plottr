/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var Router = require('react-router');

var SlideView = require('slides/slideView');
var SlideFeedbackView = require('slides/slideFeedbackView');
var WholeBoardStore = require('wholeBoardStore');

var RBS = require('react-bootstrap');
var Button = RBS.Button;
var DropdownButton = RBS.DropdownButton;
var MenuItem = RBS.MenuItem;
var Icon = RBS.Glyphicon;


var SlideCreateView = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      board: null,
      beats: null,
      lines: null,
      cards: null,
      currentLineId: null,
      currentBeatId: null,
      lowestBeatId: 0,
      highestBeatId: 1000000000
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
    theLines = WholeBoardStore.getLines();
    this.setState({
      board: WholeBoardStore.getBoard(),
      beats: WholeBoardStore.getBeats(),
      lines: theLines,
      cards: WholeBoardStore.getCards(),
      currentLineId: theLines[0].id
    });
    this.initCurrentBeatId();
  },

  initCurrentBeatId: function() {
    var cards = this.getCardsForLine(this.state.currentLineId);
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

  setCurrentLine: function(lineId) {
    this.setState({currentLineId: lineId});
  },

  getCurrentLine: function() {
    return _.find(this.state.lines, {id: this.state.currentLineId}) || {title: "sorry, no lines", id: 0};
  },

  getCardsForLine: function(lineId) {
    return _.filter(this.state.cards, {line_id: lineId});
  },

  getBeat: function(beatId) {
    return _.find(this.state.beats, {id: beatId});
  },

  increaseBeat: function() {
    this.findNextCardForLine(true);
  },

  decreaseBeat: function() {
    this.findNextCardForLine(false);
  },

  findNextCardForLine: function(increasing) {
    var cards = this.getCardsForLine(this.state.currentLineId);
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
      }
    }
    //now that we've got the right beat, save it
    this.setState({currentBeatId: card.beat_id});
  },

  getCardForBeat: function(cards, beatId) {
    return _.find(cards, {beat_id: beatId});
  },

  goToPresentView: function(e) {
    this.transitionTo("presentSlidesView", {boardId: this.state.board.id, lineId: this.state.currentLineId});
  },

  goToFeedbackView: function(e) {
    return null;
  },

  render: function() {
    return this.state.board ? this.renderBoard() : this.renderLoading();
  },

  renderBoard: function() {
    var currentLine = this.getCurrentLine();
    var board = this.state.board;
    return (
      <div>
        <h1>{board.title} (slides)</h1>
        <div className="slide-create__button-container">
          <div className="card-dialog__line">
            <label className="card-dialog__line-label" htmlFor="line_selector">Line:
              <DropdownButton id="line_selector" className="card-dialog__select-line" title={currentLine.title}>
                {this.renderLineItems()}
              </DropdownButton>
            </label>
          </div>
          <Button onClick={this.goToPresentView}>present {currentLine.title}</Button>
          <Button onClick={this.goToFeedbackView} value={board.id}>feedback</Button>
        </div>
        <div className="slide-create__slide-container">
          {this.renderCardsForLine(currentLine)}
        </div>
      </div>
    );
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  },

  renderLineItems: function() {
    return this.state.lines.reduce(function(elts, line) {
      elts.push(
        <MenuItem
          key={line.id}
          onSelect={this.setCurrentLine.bind(this, line.id)}
          >
          {line.title}
        </MenuItem>
      );
      return elts;
    }.bind(this), []);
  },

  renderCardsForLine: function(line) {
    var cards = this.getCardsForLine(line.id);
    var beatId = this.state.currentBeatId;
    var beat = this.getBeat(beatId);
    var card = this.getCardForBeat(cards, beatId);
    if(beat && card){
      return (<div className="slide-create__slide">
        <h3><Button className="pull-left" onClick={this.decreaseBeat}><Icon glyph='arrow-left' /></Button> {beat.title} <Button className="pull-right" onClick={this.increaseBeat}><Icon glyph='arrow-right' /></Button></h3>
        <div className="slide-create__slide-contents">
          <SlideView key={card.id} card={card} />
          <SlideFeedbackView key={"feedback-" + card.id} cardId={card.id} creating={true} />
        </div>
      </div>)
    } else {
      return <div>Loading...</div>;
    }
  },

});

module.exports = SlideCreateView;

