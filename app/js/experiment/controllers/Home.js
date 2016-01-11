var $scene = require('./scene');

var $camControls = require('../actions/camControls');

var $wholeHouse = require('../creators/WholeHouse');

var $dataModels = require('../utils/DataModels');
var $groupLoader = require('../creators/groupLoader');

var Emitter = require('../utils/EventEmitter');
var raf = require('../utils/raf');

require('../utils/GlobalEvents');

function Home(){
	this.addObjects = this.addObjects.bind(this);
}

Home.prototype.init = function() {
	// this.addListeners();

	$scene.init();

	this.groupName = 'house';


	this.createObjects();
};

Home.prototype.createObjects = function() {
	// $wholeHouse.init();

	this.groupLoader = new $groupLoader(this.groupName);

	this.groupPromise = this.groupLoader.load();

	this.groupPromise.then(this.addObjects, this.error);
};

Home.prototype.addObjects = function(geometries) {
	var meshes = null;
	var hitbox = null;

	meshes = this.groupLoader.createMeshes(geometries);

	$scene.addMeshes(meshes);

	hitBox = $scene.scene.getObjectByName('HouseMin');

	console.log($scene.scene);

	$camControls.init($scene.camera, $scene.gui, hitBox);

	raf.start();
};

Home.prototype.error = function() {
	console.log('Error.');
	console.log('Not good bro. Not good.');
};

// Home.prototype.addObjects = function() {
// 	console.log('Loaded');

// 	var obstacle;

// 	this.children = $wholeHouse.getMeshes();

// 	$scene.scene.add(this.children[1]);
// 	for( var i = 0 ; i < this.children.length ; i++ ) {

// 		$scene.scene.add(this.children[i]);

// 	}

// 	obstacle = $scene.scene.getObjectByName('HouseMin');

// 	$camControls.init($scene.camera, $scene.gui, obstacle);

// 	raf.start();
// };


// Home.prototype.addListeners = function(){
// 	Emitter.on('event:creator:wholeHouse', this.addObjects);
// };

module.exports = new Home();