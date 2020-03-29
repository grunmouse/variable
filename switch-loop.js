const Variable = require('./abstract-variable.js');

/**
 * Класс переменной, реализующей альтернативные пути получения данных
 * Предназначена для разрешения кольцевых зависимостей
 * Зависит от нескольких переменных, причём равна той из них, которая обновилась последней
 * Не выполняет кольцевые зависимости
 */
class Switch extends Variable{
	constructor(deps){
		let id = this._switchid = Symbol('switch');
		for(let source of deps){
			source.sub((evname, ev)=>{
				if(ev[id]){
				}
				else{
					ev[id] = source;
					this._value = source.get();
					this.pub(ev);
				}
			});
		}
	}
}

module.exports = Switch;