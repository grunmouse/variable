let Setable = require('./setable.js');
let Stub = require('./stub.js');
let Calculated = require('./calculated.js');
let WrapGetter = require('./wrap-getter.js');
let ManualUpdate = require('./manual-update.js');
let Switch = require('./switch-loop.js');
let ArrayDeps = require('./array-deps.js');

let Dependenced = require('./abstract-dependenced.js');
let Variable = require('./abstract-variable.js');


module.exports = {
	Setable,
	Stub,
	Calculated,
	WrapGetter,
	ManualUpdate,
	Switch,
	ArrayDeps,
	Abstract:{
		Dependenced,
		Variable
	}
}