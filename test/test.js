var Q = require('q');
var S = require('s');

S.q         = require('s.q');
S.q.compose = require('../s.q.compose');

S.q.compose.L( [ 'foo', console.log ] );
