var $ = require('jquery');
var _ = require('lodash');
var createStore = require('createStore');

var CardStore = _.extend(createStore(), {
  load: function(cards) {
    this.setState({cards: cards});
  },

  getCard: function(id) {
    var cards = this.getState().cards;
    return _.find(cards, function(card){
      return card.id === id;
    });
  },

  saveCard: function(card) {
    var url, method;
    if (card.id) {
      method = 'PUT';
      url = '/api/cards/' + card.id;
    }
    else {
      method = 'POST';
      url = '/api/cards';
    }

    $.ajax({
      url: url,
      type: method,
      headers: {'X-CSRF-Token': $("meta[name='csrf-token']").attr('content')},
      dataType: 'json',
      data: {card: card},
      context: this,
    }).done(this.cardSaved);
  },

  cardSaved: function(response) {
    this.fetch();
    this.replaceState({});
  },

});

module.exports = CardStore;
