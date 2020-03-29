const Variable = require('./abstract-variable.js');

/**
 * Переменная-заглушка, которая зависит от одной переменной content, которая может быть определена после
 */
class Stub extends Variable{
	get(){
		if(this.content){
			return this.content.get();
		}
	}
	
	init(content){
		this.content = content;
		content.sub((ev)=>(this.pub(ev)));
	}
}

module.exports = Stub;