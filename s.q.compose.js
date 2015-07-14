var S  = require('s');
var Q  = require('q');

S.q = require('s.q');

var compose = {
  L: function( list ) {
    var first;
  
    if ( typeof list[0] === 'function' ) {
      first = Q.fcall( list[0] );
    } else if ( Q.isPromise( list[0] ) ) {
      first = list[0];
    } else {
      first = Q( list[0] );
    }
  
    var next = first;
    for (var i=1;i<list.length;i++) {
      var fn;
      if ( typeof list[i] === 'function' ) {
        fn = list[i];
      } else if ( Q.isPromise( list[0] ) ) {
        fn = function() { return list[i]; };
      } else {
        fn = function() { return Q( list[i] ); };
      }
  
      if ( list[i].hasOwnProperty('catch') ) {
        next = next.catch( fn );
      } else if ( list[i].hasOwnProperty('done') ) {
        next = next.done( fn );
      } else {
        next = next.then( fn );
      }
    }
    return first;
  },
};

exports = module.exports = compose;
