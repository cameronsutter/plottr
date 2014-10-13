var $ = require('jquery');
var _ = require('lodash');
var createStore = require('createStore');

var BoardList = _.extend(createStore(), {
  load: function() {
    $.getJSON('/api/boards')
    .done(this.boardsLoaded.bind(this));
  },

  boardsLoaded: function(response) {
    this.setState({boards: response});
  }

});

module.exports = BoardList;