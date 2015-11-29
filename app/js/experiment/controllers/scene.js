function Scene() {

	this.render = this.render.bind(this);
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

Scene.prototype.init = function() {

	this.draw();

};

Scene.prototype.draw = function() {


	//// INIT
	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera(55, this.ratio, 0.1, 20000);

	// this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000);

	// this.orbit = new THREE.OrbitControls(this.camera);

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

	this.render();
	this.container.appendChild(this.renderer.domElement);

};

Scene.prototype.render = function(){

	// this.orbit.update();

	this.stats.update();
	this.renderer.render(this.scene, this.camera);

	// requestAnimationFrame(this.render);

};

Scene.prototype.addStatsObject = function(){
	this.stats = new Stats();
	this.stats.setMode(0);

	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.left = '0px';
	this.stats.domElement.style.top = '0px';

	document.body.appendChild(this.stats.domElement);
};


Scene.prototype.addControlGui = function(controlObject){

	var _this = this;

	// this.control = new function () {
	// 	this.camFOV = 45;
	// };

	gui = new dat.GUI();

	// gui.add(this.control, 'camFOV', 30, 60).step(1).listen().onChange(function (a) {
	// 	_this.camera.fov = a;
	// 	_this.camera.updateProjectionMatrix();
	// });
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

Scene.prototype.consoleBitch = function(event) {
	console.log('consoleBitch');
};

module.exports = new Scene();