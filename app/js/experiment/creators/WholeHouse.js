var House = require('../meshes/House');

function WholeHouse() {

	this.event = new Event('WholeHouse');
	
	this.createHouse = this.createHouse.bind(this);

	window.addEventListener('build', this.createHouse, false);

	this.house = new House();
}

WholeHouse.prototype.createHouse = function(){
	window.dispatchEvent(this.event);
};

module.exports = WholeHouse;