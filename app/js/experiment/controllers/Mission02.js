var scene = require('../controllers/scene');
var sound = require('../controllers/Sound');

var camControls = require('../actions/camControls');
var selector = require('../actions/selector');

var groupLoader = require('../creators/groupLoader');

var mission01 = require('../controllers/mission01');

var raf = require('../utils/raf');
var loader = require('../utils/loader');

function Mission02( ) {

	this.addObjects = this.addObjects.bind(this);

	this.thermalPicked = this.thermalPicked.bind(this);

	this.thermalHover = this.thermalHover.bind(this);

	this.groupName = 'groundfloor';

	this.initialized = false;

	this.jumpToEnd = false;

	this.thermalSubtitles = document.getElementById('thermal__subtitles');

}

Mission02.prototype.init = function(){

	this.initialized = true;

	if ( mission01.initialized === false ) {

		mission01.jumpToEnd = true;

		mission01.init();
	
	}

	this.createObjects();

};


Mission02.prototype.createObjects = function() {

	this.groupLoader = new groupLoader(this.groupName);

	this.groupPromise = this.groupLoader.load();

	this.groupPromise.then(this.addObjects, this.error);

	loader.init(this.groupPromise.length);

};

Mission02.prototype.addObjects = function(geometries) {

	var meshes = null;

	var hitBox = null;

	loader.end();

	meshes = this.groupLoader.createMeshes(geometries);

	scene.addMeshes(meshes);

	hitBox = scene.scene.getObjectByName('HouseMin--groundfloor');

	console.log(scene);

	camControls.setObstacle(hitBox);

	raf.start();

	if ( this.jumpToEnd === false ) {
	
		sound.init('sound__02');

		sound.play();

	}

};

Mission02.prototype.thermal = function() {

	this.thermalObject = scene.scene.getObjectByName('groundfloor__table--lunette');

	this.thermalSelector = new selector(scene.camera, this.thermalObject, this.thermalHover);

	this.thermalSelector.activate();

	window.addEventListener('mousemove', this.thermalSelector.update);

	window.addEventListener('click', this.thermalPicked);

};

Mission02.prototype.thermalHover = function() {

	if ( this.thermalSelector.hover ) {

		console.log(this.thermalSubtitles)

		TweenMax.to(this.thermalSubtitles, 0.5, { opacity: 1, display:'block' } );

	}
	else {

		TweenMax.to(this.thermalSubtitles, 0.5, { opacity: 0, display:'none' } );

	}

};

Mission02.prototype.thermalPicked = function() {

	if( this.hover === false )
		return;

	this.thermalSelector.desactivate();

	scene.scene.remove(this.thermalObject);

};

Mission02.prototype.error = function() {

	console.log('Error.');
	console.log('Not good bro. Not good.');
	alert('Mission 2, aborted.');

};

module.exports = new Mission02();