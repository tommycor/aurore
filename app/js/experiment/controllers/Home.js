var $scene = require('./scene');
var $sound = require('./Sound');

var $camControls = require('../actions/camControls');

var $dataModels = require('../utils/DataModels');
var $groupLoader = require('../creators/groupLoader');

var Emitter = require('../utils/EventEmitter');
var raf = require('../utils/raf');

require('../utils/GlobalEvents');

function Home(){

	this.addObjects = this.addObjects.bind(this);
	this.setMouvement = this.setMouvement.bind(this);

	this.movementSpeed = 120;

	this.groupName = 'house';

	this.section = document.getElementById('webGL');


}

Home.prototype.init = function() {

	$scene.init();

	this.createObjects();

	this.addListeners();

};

Home.prototype.createObjects = function() {

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

	TweenMax.set(this.section, { opacity: 0 } );
	TweenMax.to(this.section, 1, { opacity: 1, display:'block' } );

	$camControls.init($scene.camera, $scene.gui, hitBox);

	$camControls.controls.movementSpeed = 0;

	$sound.init('start');

	raf.start();
};

Home.prototype.addListeners = function() {

	$sound.player.addEventListener('ended', this.setMouvement );

};

Home.prototype.setMouvement = function() {
	console.log('mellow');
	$camControls.controls.movementSpeed = this.movementSpeed;
};

Home.prototype.error = function() {

	console.log('Error.');
	console.log('Not good bro. Not good.');

};

module.exports = new Home();