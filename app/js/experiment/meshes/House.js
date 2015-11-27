var Emitter = require('../emitter/EventEmitter');

function House(){

	this.url = './models/house/House_model.json';
	
	this.createObject = this.createObject.bind(this);
}

House.prototype.init = function() {


	this.loaderObject = new THREE.JSONLoader();
	this.loaderObject.load(this.url, this.createObject);
};

House.prototype.createObject = function(geometry){
	this.geometry = geometry;
	this.material = new THREE.MeshLambertMaterial( {
		color: 0x2194ce,
		emissive: 0x000000
	});

	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.name = 'house';
	this.mesh.position.y = -100;
	this.mesh.scale.set(0.5,0.5,0.5);

	Emitter.emit('event:mesh:house');
};

House.prototype.getHouse = function() {
	return this.mesh;
}

module.exports = new House();