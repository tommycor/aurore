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



	this.createObjects();
};

Home.prototype.createObjects = function() {
	$wholeHouse.init();
};

Home.prototype.addObjects = function() {
	console.log('Loaded');

	var obstacle;

	this.children = $wholeHouse.getMeshes();

	console.log(this.children);

	// $scene.scene.add(this.children[1]);
	for( var i = 0 ; i < this.children.length ; i++ ) {

		$scene.scene.add(this.children[i]);

	}

	obstacle = $scene.scene.getObjectByName('HouseMin');
	console.log($scene.scene);

	$camControls.init($scene.camera, $scene.gui, obstacle);

	raf.start();
};


Home.prototype.addListeners = function(){
	Emitter.on('event:creator:wholeHouse', this.addObjects);
};

module.exports = new Home();