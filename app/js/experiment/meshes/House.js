var Emitter = require('../utils/EventEmitter');

function House(){

	this.url = './models/house/batiment_bepos_test--rescale.json';
	// this.url = './models/house/House_model-v2.json';
	
	this.createMesh = this.createMesh.bind(this);
}

House.prototype.init = function() {


	this.loaderObject = new THREE.JSONLoader();
	this.loaderObject.load(this.url, this.createMesh);
};

House.prototype.createMesh = function(geometry){
	this.geometry = geometry;
	this.geometry.computeFaceNormals();
	this.geometry.computeVertexNormals();
	this.material = new THREE.MeshNormalMaterial({color: 0x7777ff});
	// this.material = new THREE.MeshLambertMaterial( {
	// 	color: 0x2194ce,
	// 	// wireframe: true,
	// 	emissive: 0x000000
	// });
 
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.name = 'house';
	// this.mesh.scale.set(0.5,0.5,0.5);

	Emitter.emit('event:mesh:house');
};

House.prototype.getMesh = function() {
	return this.mesh;
};

module.exports = new House();