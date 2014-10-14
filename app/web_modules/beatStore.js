var $ = require('jquery');
var _ = require('lodash');
var createStore = require('createStore');

var BeatStore = _.extend(createStore(), {
  load: function(beats) {
    this.setState({beats: beats});
  },

  getBeat: function(id) {
    var beats = this.getState().beats;
    return _.find(beats, function(beat){
      return beat.id === id;
    });
  },

  saveBeat: function(beat) {
    var url, method;
    if (beat.id) {
      method = 'PUT';
      url = '/api/beats/' + beat.id;
    }
    else {
      method = 'POST';
      url = '/api/beats';
    }

    $.ajax({
      url: url,
      type: method,
      headers: {'X-CSRF-Token': $("meta[name='csrf-token']").attr('content')},
      dataType: 'json',
      data: {beat: beat},
      context: this,
    }).done(this.beatSaved);
  },

  beatSaved: function(response) {
    this.fetch();
    this.replaceState({});
  },

});

module.exports = BeatStore;
