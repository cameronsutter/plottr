/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Modal = require('react-modal/dist/react-modal');
var _ = require('lodash');

var RBS = require('react-bootstrap');
var Button = RBS.Button;
var ButtonToolbar = RBS.ButtonToolbar;
var DropdownButton = RBS.DropdownButton;
var MenuItem = RBS.MenuItem;

var WholeBoardStore = require('wholeBoardStore');
var CardTitleEditor = require('cardTitleEditor');
var CardDescriptionEditor = require('cardDescriptionEditor');

var CardDialog = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      activeEditor: null,
      editedCard: null,
    };
  },

  componentWillMount: function() {
    this.initializeCardState(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.initializeCardState(nextProps);
  },

  initializeCardState: function(nextProps) {
    var initialCard;
    if (nextProps.params.cardId) {
      initialCard = _.find(nextProps.cards, function(c) {
        return c.id === parseInt(nextProps.params.cardId);
      }, this);
    } else {
      initialCard = {
        beat_id: parseInt(nextProps.params.beatId),
        line_id: parseInt(nextProps.params.lineId),
        title: 'New Card',
        description: '',
      };
    }
    this.setState({editedCard: initialCard});
  },

  setEditedCardState: function(nextCardState) {
    var nextCard;
    nextCard = _.clone(this.state.editedCard);
    _.assign(nextCard, nextCardState);
    this.setState({
      editedCard: nextCard,
    }, function() {
      if (this.state.editedCard.id)
        this.saveEditedCard();
    });

  },

  closeModal: function() {
    this.transitionTo("boardView", {boardId: this.props.params.boardId});
  },

  handleCreate: function() {
    this.saveEditedCard().done(this.closeModal);
  },

  openTitle: function() {
    if (!this.state.activeEditor)
      this.setState({activeEditor: "title"});
  },

  closeEditor: function() {
    this.setState({activeEditor: null});
  },

  saveTitle: function(nextTitle) {
    this.setEditedCardState({title: nextTitle});
    this.setState({activeEditor: null});
  },

  isTitleOpen: function() {
    return this.state.activeEditor === "title";
  },

  openDescription: function() {
    if (!this.state.activeEditor)
      this.setState({activeEditor: "description"});
  },

  saveDescription: function(nextDescription) {
    this.setEditedCardState({description: nextDescription});
    this.setState({activeEditor: null});
  },

  isDescriptionOpen: function() {
    return this.state.activeEditor === "description";
  },

  saveEditedCard: function() {
    return WholeBoardStore.saveCard(this.state.editedCard);
  },

  getCurrentBeat: function() {
    return _.find(this.props.beats, function(beat) {
      return beat.id === this.state.editedCard.beat_id;
    }.bind(this));
  },

  getCurrentLine: function() {
    return _.find(this.props.lines, function(line) {
      return line.id === this.state.editedCard.line_id;
    }.bind(this));
  },

  renderButtonBar: function() {
    if (this.state.editedCard.id) {
      return (
        <ButtonToolbar className="card-dialog__button-bar">
          <Button className="card-dialog__close"
            bsStyle="primary"
            onClick={this.closeModal}>
            Close
          </Button>
        </ButtonToolbar>
      );
    } else {
      return (
        <ButtonToolbar className="card-dialog__button-bar">
          <Button className="card-dialog__create" bsStyle="success"
            onClick={this.handleCreate}>
            Create
          </Button>
          <Button className="card-dialog__cancel" bsStyle="danger"
            onClick={this.closeModal}>
            Cancel
          </Button>
        </ButtonToolbar>
      );
    }
  },

  renderBeatItems: function() {
    return this.props.beats.reduce(function(elts, beat) {
      elts.push(
        <MenuItem
          key={beat.id}
          onSelect={this.setEditedCardState.bind(this, {beat_id: beat.id})}
          >
          {beat.title}
        </MenuItem>
      );
      return elts;
    }.bind(this), []);
  },

  renderLineItems: function() {
    return this.props.lines.reduce(function(elts, line) {
      elts.push(
        <MenuItem
          key={line.id}
          onSelect={this.setEditedCardState.bind(this, {line_id: line.id})}
          >
          {line.title}
        </MenuItem>
      );
      return elts;
    }.bind(this), []);
  },

  render: function() {
    var ids = {
      beat: _.uniqueId("select-beat-"),
      line: _.uniqueId("select-line-"),
    };

    return (
      <Modal isOpen={true} onRequestClose={this.closeModal}>
        <div className="card-dialog">
          <div className="card-dialog__header">
            <div className="card-dialog__line">
              <label className="card-dialog__line-label" htmlFor={ids.line}>Select Line</label>
              <DropdownButton id={ids.line} className="card-dialog__select-line" title={this.getCurrentLine().title}>
                {this.renderLineItems()}
              </DropdownButton>
            </div>
            <div className="card-dialog__beat">
              <label className="card-dialog__beat-label" htmlFor={ids.beat}>Select Beat</label>
              <DropdownButton id={ids.beat} className="card-dialog__select-beat" title={this.getCurrentBeat().title}>
                {this.renderBeatItems()}
              </DropdownButton>
            </div>
          </div>
          <div className="card-dialog__title">
            <CardTitleEditor card={this.state.editedCard}
              isOpen={this.isTitleOpen()}
              onRequestOpen={this.openTitle}
              onRequestClose={this.closeEditor}
              onRequestSave={this.saveTitle} />
          </div>
          <div className="card-dialog__description">
            <CardDescriptionEditor card={this.state.editedCard}
              isOpen={this.isDescriptionOpen()}
              onRequestOpen={this.openDescription}
              onRequestClose={this.closeEditor}
              onRequestSave={this.saveDescription} />
          </div>
          {this.renderButtonBar()}
        </div>
      </Modal>
    );
  },
});

module.exports = CardDialog;
