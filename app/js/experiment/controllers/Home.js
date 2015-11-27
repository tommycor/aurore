var $scene = require('./scene');

var $wholeHouse = require('../creators/WholeHouse');
var Emitter = require('../emitter/EventEmitter');

function Home(){
}

Home.prototype.init = function() {
	this.addListeners();

	$scene.init();
	this.createObjects();	
};

Home.prototype.createObjects = function() {
	$wholeHouse.init();
};

Home.prototype.addObjects = function() {
	console.log('Loaded');
	$scene.scene.add($wholeHouse.getWholeHouse());
};


Home.prototype.addListeners = function(){
	Emitter.on('event:creator:wholeHouse', this.addObjects);
};

module.exports = new Home();