var Emitter = require('../utils/EventEmitter');
var dataModels = require('../utils/DataModels');
// var promise = require('../utils/Promise');

function groupLoader(groupName){

	this.createPromise = this.createPromise.bind(this);

	this.groupData = this.getElement(groupName, dataModels.group, 'name');
	this.groupCount = dataModels.group.length;
	this.modelsData = this.getElements(groupName, dataModels.models, 'group');
	this.modelsCount = this.modelsData.length;

	this.promises = this.getPromises();


}

groupLoader.prototype.load = function() {

	return Promise.all(this.promises);

};

groupLoader.prototype.createMeshes = function(geometries) {
	this.meshes = [];
	
	var geometry = null;
	var material = null;
	var data = null;
	var mesh = null;

	for ( var i = 0 ; i < this.modelsCount ; i++ ) {

		geometry = geometries[ i ];
		data = this.modelsData[ i ];

		switch(data.material) {
			case 'MeshLambertMaterial':
				material = new THREE.MeshLambertMaterial( {
					color: data.color,
					wireframe: data.wireframe,
					emissive: data.emissive
				});
				break;
			case 'MeshNormalMaterial':
				material = new THREE.MeshNormalMaterial( {
					color: data.color,
					wireframe: data.wireframe,
					emissive: data.emissive
				});
				break;
			default:
				material = new THREE.MeshLambertMaterial( {
					color: data.color,
					wireframe: data.wireframe,
					emissive: data.emissive
				});
		}

		mesh = new THREE.Mesh(geometry, material);
		mesh.name = data.name;
		mesh.visible = data.visible;
		mesh.position.set(data.position.x, data.position.y, data.position.z);
		mesh.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
		mesh.scale.set(data.scale.x, data.scale.y, data.scale.z);

		this.meshes.push(mesh);
	
		geometry = null;
		material = null;
		data = null;
		mesh = null;

	}

	return this.meshes;

};

groupLoader.prototype.getPromises = function() {
	var results = [];

	this.currentModel = null;

	for ( var i = 0 ; i < this.modelsCount ; i++ ) {
		this.currentModel = i;
		results.push( new Promise( this.createPromise ) );
	}

	return results;
};

groupLoader.prototype.createPromise = function(fulfill, reject) {

	var modelData = this.modelsData[ this.currentModel ];
	var url = dataModels.rootModelURL + modelData.modelURL;

	// console.log(url);

	this.loaderObject = new THREE.JSONLoader();
	this.loaderObject.load(url, function(result) {
		fulfill(result);
	});

};


groupLoader.prototype.getElement = function(name, group, property) {
	for( var i = 0 ; i < group.length ; i++ ) {
		if( name === group[ i ][ property ] )
			return group[i];
	}
};

groupLoader.prototype.getElements = function(name, group, property) {
	var result = [];
	for( var i = 0 ; i < group.length ; i++ ) {
		if( name === group[ i ][ property ] )
			result.push(group[i]);
	}
	return result;
};

module.exports = groupLoader;