var $house = require('../meshes/House');
var $min = require('../meshes/min');
var Emitter = require('../utils/EventEmitter');


function WholeHouse() {

	this.elements = [$house, $min];
	this.totalElements = this.elements.length;
	this.createdElements = 0;
	
	this.createHouse = this.createHouse.bind(this);

	Emitter.on('event:mesh:house', this.createHouse);
	Emitter.on('event:mesh:min', this.createHouse);
}

WholeHouse.prototype.init = function() {
	for( var i = 0 ; i < this.totalElements ; i++ ) {
		this.elements[i].init();
	}
};

WholeHouse.prototype.createHouse = function() {
	this.createdElements++;

	if(this.createdElements === this.totalElements)
		this.built();
};

WholeHouse.prototype.built = function() {
	this.children = [];

	for( var i = 0 ; i < this.totalElements ; i ++ ) {
		this.children[i] = this.elements[i].getMesh();
	}

	Emitter.emit('event:creator:wholeHouse');
};

WholeHouse.prototype.getMeshes = function() {
	return this.children;
};

module.exports = new WholeHouse();