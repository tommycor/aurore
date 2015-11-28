var $scene = require('./scene');

var $camControls = require('../actions/camControls');

var $wholeHouse = require('../creators/WholeHouse');

var Emitter = require('../utils/EventEmitter');
var raf = require('../utils/raf');

function Home(){
}

Home.prototype.init = function() {
	this.addListeners();

	$scene.init();

	$camControls.init($scene.camera, $scene.gui);

	this.createObjects();
};

Home.prototype.createObjects = function() {
	$wholeHouse.init();
};

Home.prototype.addObjects = function() {
	console.log('Loaded');
	$scene.scene.add($wholeHouse.getWholeHouse());

	raf.start();
};


Home.prototype.addListeners = function(){
	Emitter.on('event:creator:wholeHouse', this.addObjects);
};

module.exports = new Home();