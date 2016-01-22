var scene = require('../controllers/scene');
var sound = require('../controllers/Sound');

var camControls = require('../actions/camControls');
var selector = require('../actions/selector');

var groupLoader = require('../creators/groupLoader');

var raf = require('../utils/raf');
var loader = require('../utils/loader');

function Mission01(){

	this.addObjects = this.addObjects.bind(this);
	this.introFinished = this.introFinished.bind(this);
	this.hoverPortal = this.hoverPortal.bind(this);
	this.closePortal = this.closePortal.bind(this);
	this.transition = this.transition.bind(this);

	this.movementSpeed = 130;

	this.groupName = 'garden';

	this.section = document.getElementById('webGL');

	this.portalSubtitles = document.getElementById('portal__subtitles');

	this.portalSubtitlesTween = null;

	this.portal = null;

	this.isHoverPortal = false;

	this.jumpToEnd = false;

	this.initialized = false;

}

Mission01.prototype.init = function() {

	scene.init();

	camControls.init(scene.camera, scene.gui);

	this.createObjects();

	this.addListeners();

	this.initialized = true;

};

Mission01.prototype.createObjects = function() {

	this.groupLoader = new groupLoader(this.groupName);

	this.groupPromise = this.groupLoader.load();

	this.groupPromise.then(this.addObjects, this.error);

	loader.init(this.groupPromise.length);

};

Mission01.prototype.addObjects = function(geometries) {

	var meshes = null;

	var hitBox = null;

	loader.end();

	meshes = this.groupLoader.createMeshes(geometries);

	scene.addMeshes(meshes);

	hitBox = scene.scene.getObjectByName('HouseMin--garden');

	TweenMax.set(this.section, { opacity: 0 } );

	TweenMax.to(this.section, 1, { opacity: 1, display:'block' } );

	if ( this.jumpToEnd === false ) {
	
		camControls.controls.movementSpeed = 0;

		sound.init('start');

		sound.play();

		camControls.setObstacle(hitBox);
		
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

Mission01.prototype.getPortal = function() {

	raf.start();

	this.portal = scene.scene.getObjectByName('garden__portail');

	this.portalSelector = new selector(scene.camera, this.portal, this.hoverPortal);

	this.portalSelector.activate();

	window.addEventListener('mousemove', this.portalSelector.update);

	window.addEventListener('click', this.closePortal);

};

Mission01.prototype.hoverPortal = function() {

	if ( this.portalSelector.hover ) {

		TweenMax.to(this.portalSubtitles, 0.5, { opacity: 1, display:'block' } );

	}
	else {

		TweenMax.to(this.portalSubtitles, 0.5, { opacity: 0, display:'none' } );

	}

};

Mission01.prototype.closePortal = function() {

	if( this.portalSelector.hover === false )
		return;

	window.removeEventListener('mousemove', this.portalSelector.update);

	window.removeEventListener('click', this.closePortal);

	this.portalSelector.desactivate();

	this.portalDestinationX = this.portal.position.x + 500;

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