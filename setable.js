const Variable = require('./abstract-variable.js');

/**
 * Класс переменной, значение которой может быть выставлено вручную
 * Содержит интерфейс для присвоения значения
 */
class Setable extends Variable{
	constructor(value){
		super();
		this._value = value;
	}
	set(value){
		this._value = value;
		this.pub();
	}
}

module.exports = Setable;