const Variable = require('./abstract-variable.js');

/**
 * Абстрактный базовый класс для переменной, имеющей внешние зависимости
 * Содержит интерфейс для инвалидации значения, после которой оно должно быть лениво рассчитано при обращении
 */
class Dependenced extends Variable{
	invalidate(ev){
		this._valid = false;
		this.pub(ev);
	}
	get(){
		if(!this._valid){
			this.calculate();
		}
		return this._value;
	}
	calculate(){
		throw new Error('"calculate" is a abstract method');
	}
}

module.exports = Dependenced;