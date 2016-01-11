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

	console.log(this.promises);


}

groupLoader.prototype.load = function() {

	return Promise.all(this.promises);

};

groupLoader.prototype.loaded = function(results) {
	console.log(results);
};

groupLoader.prototype.error = function(error) {
	console.log(error);
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