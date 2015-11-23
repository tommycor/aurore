var $house = require('../meshes/House');

function WholeHouse() {

	this.event = new Event('WholeHouse');
	
	this.createHouse = this.createHouse.bind(this);

	window.addEventListener('build', this.createHouse, false);
}

WholeHouse.prototype.init = function() {

	$house.init();
};

WholeHouse.prototype.createHouse = function() {
	window.dispatchEvent(this.event);
};

module.exports = new WholeHouse();