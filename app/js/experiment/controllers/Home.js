var $scene = require('./scene');

var $camControls = require('../actions/camControls');

var $wholeHouse = require('../creators/WholeHouse');

var $dataModels = require('../utils/DataModels');

var Emitter = require('../utils/EventEmitter');
var raf = require('../utils/raf');

require('../utils/GlobalEvents');

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

	console.log($dataModels);

	var obstacle;

	this.children = $wholeHouse.getMeshes();

	// $scene.scene.add(this.children[1]);
	for( var i = 0 ; i < this.children.length ; i++ ) {

		$scene.scene.add(this.children[i]);

	}

	obstacle = $scene.scene.getObjectByName('HouseMin');

	$camControls.init($scene.camera, $scene.gui, obstacle);

	raf.start();
};


Home.prototype.addListeners = function(){
	Emitter.on('event:creator:wholeHouse', this.addObjects);
};

module.exports = new Home();