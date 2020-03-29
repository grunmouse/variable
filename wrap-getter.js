let Dependenced = require('./abstract-dependenced.js');


/**
 * Класс переменной, зависящей от объекта другого типа, 
 * использует переданные функции binder и getter соответственно для подписки на изменение источника и получения его значения
 */
class WrapGetter extends Dependenced{
	constructor(binder, getter){
		super();
		binder(()=>{this.invalidate()});
		this._getter = getter || binder;
	}
	calculate(){
		this._value = this._getter();
		this._valid = true;
	}
}

module.exports = WrapGetter;