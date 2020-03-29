let Dependenced = require('./abstract-dependenced.js');
let Variable = require('./abstract-variable.js');

/**
 * Класс переменной, которая зависит от других переменных и вычисляется из их значений с помощью функции
 */
class Calculated extends Dependenced{
	/**
	 * @param {Object<HRK.Variable>} deps - плоский объект, содержащий ссылки на переменные, служащие источниками входных значений
	 * @param {Function<object=>any>} func - функция, которая принимает плоский объект с входными значениями, имена свойств совпадают с ключами в deps
	 */
	constructor(deps, func){
		super();
		this._deps = deps;
		this._func = func;
		this._valid = false;
		for(let key in deps){
			let dep = deps[key];
			if(dep instanceof Variable){
				dep.sub((ev, data)=>{this.invalidate(data)});
			}
		}
	}
	calculate(){
		let args = {};
		let deps = this._deps;
		for(let key in deps){
			let dep = deps[key];
			args[key] = dep.get();
		}
		this._value = this._func(args);
		this._valid = true;
	}
}

module.exports = Calculated;