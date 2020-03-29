const Variable = require('./abstract-variable.js');
const Dependenced = require('./abstract-dependenced.js');

/**
 * Представляет массив зависимостей
 * Результатом является массив значений
 *
 * Реализует методы изменения массива, которые применяются к массиву зависимостей,
 * при этом происходит подписка на добавляемые зависимости и отписка от удаляемых.
 * При любых изменениях (в т.ч. сортировке) значение инвалидируется
 */
class ArrayDeps extends Dependenced{
	
	constructor(deps){
		super();
		this.deps = deps || [];
		this._unbinders = new WeakMap();
		
		this._bind(deps);
	}
	
	calculate(){
		this._value = this.deps.map((dep)=>(dep.get()));
		this._valid = true;
	}
	
	_bind(deps){
		for(let dep of deps){
			let unbinder = dep.sub((ev, data)=>{this.invalidate(data)});
			this._unbinders.set(dep, unbinder);
		}
	}
	
	_unbind(deps){
		for(let dep of deps){
			let unbinder = this._unbinders.get(dep);
			if(unbinder){
				unbinder();
			}
		}
	}
	
	sort(cb){
		this.deps.sort(cb);
		this.invalidate();
	}
	
	splice(...arr){
		let dep = this.deps.splice(...arr);
		this._unbind(dep);
		if(arr.length>2){
			this._bind(arr.slice(2));
		}
		this.invalidate();
		return dep;
	}
	
}

let proto = ArrayDeps.prototype;

['push', 'unshift'].forEach((name)=>{
	proto[name] = function(...arr){
		this.deps[name](...arr);
		this._bind(arr);
		this.invalidate();
	}
});

['pop', 'shift'].forEach((name)=>{
	proto[name] = function(...arr){
		let dep = this.deps[name]();
		this._unbind([dep]);
		this.invalidate();
		return dep;
	}
});


module.exports = ArrayDeps;