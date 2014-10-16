var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var WholeBoardStore = {
  load: function(boardId) {
    if (boardId === this._state.board.id) {
      this.emitChange();
    }
    else {
      $.getJSON('/api/boards/' + boardId + '/whole_board')
        .done(this._handleWholeBoardResponse.bind(this));
    }
  },

  getWholeBoard: function() {
    return this._state;
  },

  getBoard: function() {
    return this._state.board;
  },

  getBeats: function() {
    return this._sortByPosition(this._getValues(this._state.beats));
  },

  getLines: function() {
    return this._sortByPosition(this._getValues(this._state.lines));
  },

  getCards: function() {
    return this._getValues(this._state.cards);
  },

  setBoard: function(nextBoard) {
    this._state.board = nextBoard;
    this.emitChange();
  },

  setBeat: function(nextBeat) {
    if (!nextBeat.id) return;
    this._state.beats[nextBeat.id] = nextBeat;
    this.emitChange();
  },

  setLine: function(nextLine) {
    if (!nextLine.id) return;
    this._state.beats[nextLine.id] = nextLine;
    this.emitChange();
  },

  getCard: function(nextCard) {
    if (!nextCard.id) return;
    this._state.beats[nextCard.id] = nextCard;
    this.emitChange();
  },

  saveBoard: function(board) {
    if (board.id !== this._state.board.id)
      throw new Error("tried to save a non-matching board id using WholeBoardStore");
    return this._saveObject(board, 'board', '/api/boards', this._boardSaved);
  },

  saveBeat: function(beat) {
    return this._saveObject(beat, 'beat', '/api/beats', this._beatSaved);
  },

  saveLine: function(line) {
    return this._saveObject(line, 'line', '/api/lines', this._lineSaved);
  },

  saveCard: function(card) {
    return this._saveObject(card, 'card', '/api/cards', this._cardSaved);
  },

  addChangeListener: function (listener) {
    this._events.on('change', listener);
  },

  removeChangeListener: function (listener) {
    this._events.removeListener('change', listener);
  },

  emitChange: function() {
    this._events.emit('change');
  },


  _handleWholeBoardResponse: function(response) {
    this._state = {
      board: response.board,
      beats: this._convertToIdMap(response.beats),
      lines: this._convertToIdMap(response.lines),
      cards: this._convertToIdMap(response.cards),
    }
    this.emitChange();
  },

  _convertToIdMap: function(collection) {
    return collection.reduce(function(result, elt) {
      result[elt.id] = elt;
      return result;
    }, {});
  },

  _getValues: function(collection) {
    return Object.keys(collection).map(function(key) {
      return collection[key];
    });
  },

  _sortByPosition: function(collection) {
    return collection.sort(function(a, b) {
      return a.position - b.position;
    });
  },

  _saveObject: function(object, key, baseUrl, done, fail) {
    var data = {};
    data[key] = object;

    var options = {
      headers: {'X-CSRF-Token': $("meta[name='csrf-token']").attr('content')},
      dataType: 'json',
      data: data,
      context: this,
    };

    if (object.id) {
      options.type = 'PUT';
      options.url = baseUrl + '/' + object.id;
    }
    else {
      options.type = 'POST';
      options.url = baseUrl;
    }
    var promise = $.ajax(options);
    if (done) promise.done(done);
    if (fail) promise.fail(fail);
    return promise;
  },

  _boardSaved: function(response) {
    this._state.board = response;
    this.emitChange();
  },

  _beatSaved: function(response) {
    this._state.beats[response.id] = response;
    this.emitChange();
  },

  _lineSaved: function(response) {
    this._state.lines[response.id] = response;
    this.emitChange();
  },

  _cardSaved: function(response) {
    this._state.cards[response.id] = response;
    this.emitChange();
  },

  _state: {board: {}, beats: {}, lines: {}, cards: {}},
  _events: new EventEmitter(),
};

module.exports = WholeBoardStore;
