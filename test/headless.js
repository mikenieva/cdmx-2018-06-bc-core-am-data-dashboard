global.window = global;
global.assert = require('chai').assert;
global.fixtures = require('../data/laboratoria.json'),
require('../src/datals.js');
require('./data.spec.js');
