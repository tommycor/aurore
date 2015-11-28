var $house = require('../meshes/House');
var Emitter = require('../utils/EventEmitter');


function WholeHouse() {

	this.elements = [$house];
	this.totalElements = this.elements.length;
	this.createdElements = 0;
	
	this.createHouse = this.createHouse.bind(this);

	Emitter.on('event:mesh:house', this.createHouse);
}

WholeHouse.prototype.init = function() {
	$house.init();
};

WholeHouse.prototype.createHouse = function() {
	this.createdElements++;

	if(this.createdElements === this.totalElements)
		this.built();
};

WholeHouse.prototype.built = function() {
	Emitter.emit('event:creator:wholeHouse');
};

WholeHouse.prototype.getWholeHouse = function() {
	return $house.getHouse();
};

module.exports = new WholeHouse();