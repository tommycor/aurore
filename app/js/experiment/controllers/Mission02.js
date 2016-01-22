var scene = require('../controllers/scene');
var sound = require('../controllers/Sound');

var camControls = require('../actions/camControls');
var selector = require('../actions/selector');
var ThermalVision = require('../actions/thermalVision');

var groupLoader = require('../creators/groupLoader');

var mission01 = require('../controllers/mission01');

var raf = require('../utils/raf');
var loader = require('../utils/loader');

function Mission02( ) {

	this.addObjects = this.addObjects.bind(this);

	this.thermalPicked = this.thermalPicked.bind(this);

	this.thermalHover = this.thermalHover.bind(this);

	this.vision = this.vision.bind(this);

	this.book = this.book.bind(this);

	this.bookHover = this.bookHover.bind(this);

	this.readBook = this.readBook.bind(this);

	this.bookCloser = this.bookCloser.bind(this);


	this.groupName = 'groundfloor';

	this.initialized = false;

	this.thermalSubtitles = document.getElementById('thermal__subtitles');

	this.thermalVision = null;

	this.windows = null;

	this.objectsColors = [];

	this.bookSubtitles = document.getElementById('thermal__subtitles');

	this.jumpToEnd = true;

	this.bookClose = document.getElementById('book__close');

	this.bookPopup = document.getElementById('book__popup');

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

	camControls.setObstacle(hitBox);

	raf.start();

	if ( this.jumpToEnd === false ) {
	
		sound.init('sound__02');

		sound.play();

	}

	else {

		setTimeout( this.vision, 1000);

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

		TweenMax.to(this.thermalSubtitles, 0.5, { opacity: 1, display:'block' } );

	}
	else {

		TweenMax.to(this.thermalSubtitles, 0.5, { opacity: 0, display:'none' } );

	}

};

Mission02.prototype.thermalPicked = function() {

	if( this.thermalSelector.hover === false )
		return;

	this.thermalSelector.desactivate();

	TweenMax.to(this.thermalSubtitles, 0.5, { opacity: 0, display:'none' } );

	window.removeEventListener('mousemove', this.thermalSelector.update);

	window.removeEventListener('click', this.thermalPicked);

	scene.scene.remove(this.thermalObject);

	this.vision();

};

Mission02.prototype.vision = function() {

	this.windows = scene.scene.getObjectByName('garden__allvitresverre--volets');

	this.thermalVision = new ThermalVision(scene.scene.children, [this.windows]);

	sound.init('sound__03');

	setTimeout(sound.play, 2000);

};

Mission02.prototype.book = function() {

	this.thermalVision.desactivate();

	this.bookObject = scene.scene.getObjectByName('groundfloor__blocklivres--3');

	this.bookSelector = new selector(scene.camera, this.bookObject, this.bookHover);

	this.bookSelector.activate();

	window.addEventListener('mousemove', this.bookSelector.update);

	window.addEventListener('click', this.readBook);

};

Mission02.prototype.bookHover = function() {

	if ( this.bookSelector.hover ) {

		TweenMax.to(this.bookSubtitles, 0.5, { opacity: 1, display:'block' } );

	}
	else {

		TweenMax.to(this.bookSubtitles, 0.5, { opacity: 0, display:'none' } );

	}

};

Mission02.prototype.readBook = function() {

	if( this.bookSelector.hover === false )
		return;

	this.bookSelector.desactivate();

	TweenMax.to(this.bookSubtitles, 0.5, { opacity: 0, display:'none' } );
	
	window.removeEventListener('mousemove', this.bookSelector.update);

	window.removeEventListener('click', this.readBook);

	this.popupBook();

};

Mission02.prototype.popupBook = function() {

	TweenMax.to(this.bookPopup, 1, { opacity: 1, display:'block' } );

	this.bookClose.addEventListener('click', this.bookCloser);

	raf.stop();

};

Mission02.prototype.bookCloser = function() {

	this.bookClose.removeEventListener('click', this.bookCloser);

	TweenMax.to(this.bookPopup, 1, { opacity: 0, display:'none', onComplete: this.transition } );

};

Mission02.prototype.transition = function() {

	raf.start();

	location.hash = 'mission03--start'

};

Mission02.prototype.error = function() {

	console.log('Error.');
	console.log('Not good bro. Not good.');
	alert('Mission 2, aborted.');

};

module.exports = new Mission02();