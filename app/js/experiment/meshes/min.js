var Emitter = require('../utils/EventEmitter');

function HouseMin(){

	this.url = './models/house/mini__2.json';
	
	this.createMesh = this.createMesh.bind(this);
}

HouseMin.prototype.init = function() {


	this.loaderObject = new THREE.JSONLoader();
	this.loaderObject.load(this.url, this.createMesh);
};

HouseMin.prototype.createMesh = function(geometry){
	this.geometry = geometry;
	this.material = new THREE.MeshNormalMaterial({color: 0x7777ff});
	// this.material = new THREE.MeshLambertMaterial( {
	// 	color: 0x2194ce,
	// 	emissive: 0x000000
	// });

	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.name = 'HouseMin';
	this.mesh.visible = false;

	Emitter.emit('event:mesh:min');
};

HouseMin.prototype.getMesh = function() {
	return this.mesh;
}

module.exports = new HouseMin();