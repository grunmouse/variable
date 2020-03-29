const Variable = require('./abstract-variable.js');


/**
 * Класс переменной, зависящей от внешнего источника, но не подписанной на него, обновляемой отдельным методом
 */
class ManualUpdate extends Variable{
	constructor(getter){
		super();
		this._getter = getter;
		this.update();
	}
	update(){
		this._value = this._getter();
	}
}

module.exports = ManualUpdate;