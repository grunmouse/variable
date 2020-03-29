let Hub = require('@rakov/hub');

/**
 * Абстрактный базовый класс переменной,  
 * Содержит интерфейс для подписки внешних потребителей данных на изменение значения переменной и метод получения её значения
 */
class Variable extends Hub{
	bindSetter(setter){
		return this.sub(()=>{
			setter(this.get());
		});
	}
	get(){
		return this._value;
	}
	pub(ev){
		ev = ev || {target:this};
		super.pub('change', ev);
	}
	sub(callback){
		super.sub('change', callback);
	}
}

module.exports = Variable;