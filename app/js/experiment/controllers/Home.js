var $wholeHouse = require('../creators/WholeHouse');
var Emitter = require('../emitter/EventEmitter');

function Home() {

	this.render = this.render.bind(this);
	this.addObjects = this.addObjects.bind(this);
	this.consoleBitch = this.consoleBitch.bind(this);
	
	this.container = document.getElementById('exp');

	this.ratio = window.innerWidth / window.innerHeight;

	this.cam = {
		x: 0,
		y: 0,
		z: 0
	};

	console.log('Initialazing draw!');
}

Home.prototype.init = function() {

	this.draw();
	this.addListeners();
};

Home.prototype.draw = function() {

	//// INIT
	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera(45, this.ratio, 0.1, 20000);
	this.camera.position.z = -200;
	// this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000);

	this.orbit = new THREE.OrbitControls(this.camera);

	////RENDERER
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setClearColor(0x000000, 1.0);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.shadowMapEnabled = true;

	//// AMBIANT LIGHT
	this.ambient = new THREE.AmbientLight( 0x111111 );
	this.scene.add(this.ambient);

    //// SPOTLIGHT
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(10, 500, 20);
    this.spotLight.shadowCameraNear = 20;
    this.spotLight.shadowCameraFar = 1000;
    this.scene.add(this.spotLight);

	this.addControlGui();

	this.addStatsObject();

	this.createObjects();

	this.render();
	this.container.appendChild(this.renderer.domElement);
};

Home.prototype.render = function(){
	this.orbit.update();

	this.stats.update();
	this.renderer.render(this.scene, this.camera);

	requestAnimationFrame(this.render);
};

Home.prototype.createObjects = function(){
	$wholeHouse.init();
};

Home.prototype.addObjects = function(){
	console.log('Loaded');
	this.scene.add($wholeHouse.getWholeHouse());
};






Home.prototype.addControlGui = function(controlObject){

	// var _this = this;

	// this.control = new function () {
	//	this.mt_0 = 0.7;
	//	this.mt_1 = 0.7;
	//	this.X = 0;
	//	this.Y = _this.camY;
	//	this.Z = 2300;
	//};

	//var gui = new dat.GUI();

	//gui.add(this.control, 'mt_0', 0, 1).step(0.01).listen().onChange(function (a) {
	//	_this.mesh.morphTargetInfluences[0] = a;
	//});
	//gui.add(this.control, 'mt_1', 0, 1).step(0.01).listen().onChange(function (a) {
	//	_this.mesh.morphTargetInfluences[1] = a;
	//});
	//gui.add(this.control, 'X', -200, 200).step(10).listen().onChange(function (a) {
	//	_this.camera.position.x = a;
	//	_this.camera.lookAt( _this.lookAtPosition );
	//});
	//gui.add(this.control, 'Y', -3000, 10000).step(10).listen().onChange(function (a) {
	//	_this.camera.position.y = a;
	//	_this.camera.lookAt( _this.lookAtPosition );
	//});
	//gui.add(this.control, 'Z', -3000, 10000).step(10).listen().onChange(function (a) {
	//	_this.camera.position.z = a;
	//	_this.camera.lookAt( _this.lookAtPosition );
	//});
};

Home.prototype.addStatsObject = function(){
	this.stats = new Stats();
	this.stats.setMode(0);

	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.left = '0px';
	this.stats.domElement.style.top = '0px';

	document.body.appendChild(this.stats.domElement);
};

Home.prototype.consoleBitch = function(event) {
	console.log('consoleBitch');
};

Home.prototype.addListeners = function(){
	// this.container.addEventListener('click', this.consoleBitch, false);
	Emitter.on('event:creator:wholeHouse', this.addObjects);
};

module.exports = new Home();