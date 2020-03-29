const Variable = require('./abstract-variable.js');
const Dependenced = require('./abstract-dependenced.js');

/**
 * Представляет массив зависимостей
 * Результатом является массив значений
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