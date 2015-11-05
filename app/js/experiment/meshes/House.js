function House(){



	this.url = './models/house/House_model.json';

	this.event = new Event('build');
	
	this.createObject = this.createObject.bind(this);

	this.loaderObject = new THREE.JSONLoader();
	this.loaderObject.load(this.url, this.createObject);

}

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

	window.dispatchEvent(this.event);
};

module.exports = House;