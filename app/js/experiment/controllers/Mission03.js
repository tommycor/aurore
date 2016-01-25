var mission02 = require('../controllers/mission02');
var scene = require('../controllers/scene');
var sound = require('../controllers/Sound');

var raf = require('../utils/raf');
var config = require('../utils/config');
var hasInTab = require('../utils/hasInTab');

var selector = require('../actions/selector');

function Mission03() {

	this.createSelectors = this.createSelectors.bind(this);

	this.updateSelectors = this.updateSelectors.bind(this);

	this.objectsHover = this.objectsHover.bind(this);

	this.clickSelectors = this.clickSelectors.bind(this);

	this.windows = this.windows.bind(this);

	this.windowsHover = this.windowsHover.bind(this);

	this.windowsClick = this.windowsClick.bind(this);

	this.glovesSubtitles = document.getElementById('gloves__subtitles');

	this.meterSubtitles = document.getElementById('meter__subtitles');

	this.windowSubtitles = document.getElementById('window__subtitles');

	this.windowsSubtitles = document.getElementById('windows__subtitles');

	this.meterObject = null;

	this.meterSelector = null;

	this.windowObject = null;

	this.windowSelector = null;

	this.glovesObject = null;

	this.glovesSelector = null;

	this.jumpToEnd = true;

}

Mission03.prototype.init = function() {

	this.initialized = true;

	if ( mission02.initialized === false ) {

		mission02.jumpToEnd = true;

		mission02.init();
	
	}

	if( this.jumpToEnd )
		setTimeout(this.windows, 4000);
	else
		this.createSelectors();

};

Mission03.prototype.createSelectors = function() {

	this.meterObject = scene.scene.getObjectByName('groundfloor__metre');

	this.meterSelector = new selector(scene.camera, this.meterObject, this.objectsHover);

	this.meterSelector.activate();


	this.windowObject = scene.scene.getObjectByName('garden__cabane--vitres');

	this.windowSelector = new selector(scene.camera, this.windowObject, this.objectsHover);
	
	this.windowSelector.activate();


	this.glovesObject = scene.scene.getObjectByName('garden__gants');

	this.glovesSelector = new selector(scene.camera, this.glovesObject, this.objectsHover);

	this.glovesSelector.activate();

	window.addEventListener('mousemove', this.updateSelectors);

	window.addEventListener('click', this.clickSelectors);

};

Mission03.prototype.updateSelectors  = function( event ) {

	this.meterSelector.update(event);

	this.windowSelector.update(event);

	this.glovesSelector.update(event);

};

Mission03.prototype.objectsHover = function() {

	if ( this.meterSelector.hover ) {

		TweenMax.to(this.meterSubtitles, 0.5, { opacity: 1, display:'block' } );

	}
	else {

		TweenMax.to(this.meterSubtitles, 0.5, { opacity: 0, display:'none' } );

	}

	if ( this.windowSelector.hover ) {

		TweenMax.to(this.windowSubtitles, 0.5, { opacity: 1, display:'block' } );

	}
	else {

		TweenMax.to(this.windowSubtitles, 0.5, { opacity: 0, display:'none' } );

	}

	if ( this.glovesSelector.hover ) {

		TweenMax.to(this.glovesSubtitles, 0.5, { opacity: 1, display:'block' } );

	}
	else {

		TweenMax.to(this.glovesSubtitles, 0.5, { opacity: 0, display:'none' } );

	}

};

Mission03.prototype.clickSelectors = function() {

	if ( this.meterSelector.hover ) {

		scene.scene.remove(this.meterObject);
		TweenMax.to(this.meterSubtitles, 0.5, { opacity: 0, display:'none' } );
		config.backpack.push('meter');

	}

	if ( this.windowSelector.hover ) {

		scene.scene.remove(this.windowObject);
		TweenMax.to(this.windowSubtitles, 0.5, { opacity: 0, display:'none' } );
		config.backpack.push('windows');

	}

	if ( this.glovesSelector.hover ) {

		scene.scene.remove(this.glovesObject);
		TweenMax.to(this.glovesSubtitles, 0.5, { opacity: 0, display:'none' } );
		config.backpack.push('gloves');

	}

	if ( hasInTab('meter', config.backpack) && hasInTab('windows', config.backpack) && hasInTab('gloves', config.backpack) ) {

		this.meterSelector.desactivate();

		this.windowSelector.desactivate();

		this.glovesSelector.desactivate();

		window.removeEventListener('mousemove', this.updateSelectors);

		window.removeEventListener('click', this.clickSelectors);

	
		sound.init('sound__04');

		sound.play();

	}
		
};

Mission03.prototype.windows = function() {

	this.windowsObject = scene.scene.getObjectByName('garden__allvitresverre--volets');

	this.windowsSelector = new selector(scene.camera, this.windowsObject, this.windowsHover);

	this.windowsSelector.activate();


	window.addEventListener('mousemove', this.windowsSelector.update);

	window.addEventListener('click', this.windowsClick);

};

Mission03.prototype.windowsHover = function() {

	if ( this.windowsSelector.hover ) {

		TweenMax.to(this.windowsSubtitles, 0.5, { opacity: 1, display:'block' } );

	}
	else {

		TweenMax.to(this.windowsSubtitles, 0.5, { opacity: 0, display:'none' } );

	}
	
};

Mission03.prototype.windowsClick = function() {

	if( this.windowsSelector.hover === false )
		return;

	this.windowsSelector.desactivate();
	
	TweenMax.to(this.windowsSubtitles, 0.5, { opacity: 0, display:'none' } );

	window.removeEventListener('mousemove', this.windowsSelector.update);

	window.removeEventListener('click', this.windowsClick);

};

module.exports = new Mission03();