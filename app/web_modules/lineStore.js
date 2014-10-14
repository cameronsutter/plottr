var $ = require('jquery');
var _ = require('lodash');
var createStore = require('createStore');

var LineStore = _.extend(createStore(), {
  load: function(lines) {
    this.setState({lines: lines});
  },

  getLine: function(id) {
    var lines = this.getState().lines;
    return _.find(lines, function(line){
      return line.id === id;
    });
  },

  saveLine: function(line) {
    var url, method;
    if (line.id) {
      method = 'PUT';
      url = '/api/lines/' + line.id;
    }
    else {
      method = 'POST';
      url = '/api/lines';
    }

    $.ajax({
      url: url,
      type: method,
      headers: {'X-CSRF-Token': $("meta[name='csrf-token']").attr('content')},
      dataType: 'json',
      data: {line: line},
      context: this,
    }).done(this.lineSaved);
  },

  lineSaved: function(response) {
    this.fetch();
    this.replaceState({});
  },

});

module.exports = LineStore;
