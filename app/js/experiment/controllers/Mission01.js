var scene = require('../controllers/scene');
var sound = require('../controllers/Sound');

var camControls = require('../actions/camControls');
var selector = require('../actions/selector');

var groupLoader = require('../creators/groupLoader');

var raf = require('../utils/raf');
var loader = require('../utils/loader');

function Mission01(){

	// BINDING FUNCTIONS
	this.addObjects = this.addObjects.bind(this);
	this.introFinished = this.introFinished.bind(this);
	this.hoverPortal = this.hoverPortal.bind(this);
	this.closePortal = this.closePortal.bind(this);
	this.transition = this.transition.bind(this);

	// DECLARING VARIABLES
	// Deplacement speed
	this.movementSpeed = 230;

	// group to load
	this.groupName = 'garden';

	// webGL section
	this.section = document.getElementById('webGL');

	// sound subititle
	this.portalSubtitles = document.getElementById('portal__subtitles');

	// tween sound subtitle
	this.portalSubtitlesTween = null;

	// portal 3D object
	this.portal = null;

	// state mouse over portal
	this.isHoverPortal = false;

	// if true, just load the objects and initialise the 3D scene
	this.jumpToEnd = false;

	// current state letting know if need to be initialize
	this.initialized = false;

}

// INITIALISING CLASS
Mission01.prototype.init = function() {

	this.initialized = true;

	scene.init();

	// Send the object needed to the control controller
	camControls.init(scene.camera, scene.gui);

	this.createObjects();

	this.addListeners();

};

// LOAD OBJECTS NEEDED
Mission01.prototype.createObjects = function() {

	this.groupLoader = new groupLoader(this.groupName);

	this.groupPromise = this.groupLoader.load();

	this.groupPromise.then(this.addObjects, this.error);

	loader.init(this.groupPromise.length);

};

// ADD OBJECTS TO SCENE
Mission01.prototype.addObjects = function(geometries) {

	var meshes = null;

	var hitBox = null;

	// remove loading section
	loader.end();

	// create the meshes from dataModels and loaded geometries
	meshes = this.groupLoader.createMeshes(geometries);

	scene.addMeshes(meshes);

	// Collisions are calculated with a minified version of the house for better performance created in a signle object.
	hitBox = scene.scene.getObjectByName('minHouse--mission01');

	TweenMax.set(this.section, { opacity: 0 } );

	TweenMax.to(this.section, 1, { opacity: 1, display:'block' } );

	if ( this.jumpToEnd === false ) {
	
		camControls.controls.movementSpeed = 0;

		this.portal = scene.scene.getObjectByName('garden__portail');

		this.portal.position.x = 500;

		sound.init('start');

		sound.play();

		camControls.setObstacle(hitBox);
		
		if (raf.running === false)
			raf.start();

	}

};

Mission01.prototype.addListeners = function() {

	if ( this.jumpToEnd === false )

		sound.player.addEventListener('ended', this.introFinished );

};

Mission01.prototype.introFinished = function() {

	camControls.controls.movementSpeed = this.movementSpeed;

};

// INITIALISATION OF PORTAL SELECTOR
Mission01.prototype.getPortal = function() {

	raf.start();

	this.portal = scene.scene.getObjectByName('garden__portail');

	this.portalSelector = new selector(scene.camera, this.portal, this.hoverPortal);

	this.portalSelector.activate();

	window.addEventListener('mousemove', this.portalSelector.update);

	window.addEventListener('click', this.closePortal);

};

// FONCTION CALLED WHEN STATE OF SELECTOR.HOVER CHANGE
Mission01.prototype.hoverPortal = function() {

	if ( this.portalSelector.hover ) {

		TweenMax.to(this.portalSubtitles, 0.5, { opacity: 1, display:'block' } );

	}
	else {

		TweenMax.to(this.portalSubtitles, 0.5, { opacity: 0, display:'none' } );

	}

};

// FONCTION CALLED WHEN PORTAL IS CLICKED TO BE CLOSED
Mission01.prototype.closePortal = function() {

	if( this.portalSelector.hover === false )
		return;

	window.removeEventListener('mousemove', this.portalSelector.update);

	window.removeEventListener('click', this.closePortal);

	TweenMax.to(this.portalSubtitles, 0.5, { opacity: 0, display:'none' } );

	this.portalSelector.desactivate();

	this.portalDestinationX = 0;

	TweenMax.to( this.portal.position, 4, { x: this.portalDestinationX, onComplete: this.transition, ease: Power1.easeInOut } );

};

Mission01.prototype.transition = function() {

	location.hash = "mission02--start";

};

Mission01.prototype.walk = function() {

	sound.init('sound__01');

	setTimeout(sound.play, 20000);

};

Mission01.prototype.error = function() {

	console.log('Error.');
	console.log('Not good bro. Not good.');

};

module.exports = new Mission01();