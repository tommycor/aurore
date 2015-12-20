var Emitter = require('../utils/EventEmitter');

function Scene() {

	this.render = this.render.bind(this);
	this.consoleBitch = this.consoleBitch.bind(this);
	this.resize = this.resize.bind(this);
	
	this.container = document.getElementById('exp');

	this.ratio = window.innerWidth / window.innerHeight;

	this.cam = {
		x: 0,
		y: 0,
		z: 0
	};

	console.log('Initialazing draw!');

	Emitter.on('utils:events:resize', this.resize);
}

Scene.prototype.init = function() {

	this.draw();

};

Scene.prototype.draw = function() {


	//// INIT
	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera(60, this.ratio, 0.1, 20000);

	// this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000);

	// this.orbit = new THREE.OrbitControls(this.camera);

	////RENDERER
	this.renderer = new THREE.WebGLRenderer({ antialias: true });
	this.renderer.setClearColor(0x000000, 1.0);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.shadowMapEnabled = true;

	//// AMBIANT LIGHT
	this.ambient = new THREE.AmbientLight( 0x444444 );
	this.scene.add(this.ambient);

    //// SPOTLIGHT
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(10, 1000, 20);
    this.spotLight.shadowCameraNear = 20;
    this.spotLight.intensity = 2;
    this.spotLight.shadowCameraFar = 10000;
    this.spotLight.angle = Math.PI/2;
    this.scene.add(this.spotLight);

	this.addControlGui();

	this.addStatsObject();

	this.composer = new THREE.EffectComposer( this.renderer );
	this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );

	this.depthShader = THREE.ShaderLib[ "depthRGBA" ];
	this.depthUniforms = THREE.UniformsUtils.clone( this.depthShader.uniforms );

	this.depthMaterial = new THREE.ShaderMaterial( {
		fragmentShader: this.depthShader.fragmentShader,
		vertexShader: this.depthShader.vertexShader,
		uniforms: this.depthUniforms
	} );
	this.depthMaterial.blending = THREE.NoBlending;


	this.depthTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );


	this.effect = new THREE.ShaderPass( THREE.SSAOShader );
	this.effect.uniforms[ 'tDepth' ].value = this.depthTarget;
	this.effect.uniforms[ 'size' ].value.set( window.innerWidth, window.innerHeight );
	this.effect.uniforms[ 'cameraNear' ].value = this.camera.near;
	this.effect.uniforms[ 'cameraFar' ].value = this.camera.far;
	this.effect.renderToScreen = true;
	this.composer.addPass( this.effect );


	Emitter.emit('event:scene:ready');
	this.container.appendChild(this.renderer.domElement);


};

Scene.prototype.render = function(){

	this.stats.update();
	// this.renderer.render(this.scene, this.camera);

	this.scene.overrideMaterial = this.depthMaterial;
    this.renderer.render( this.scene, this.camera, this.depthTarget );


    this.scene.overrideMaterial = null;
    this.composer.render(0.01);

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

Scene.prototype.resize = function() {

	this.ratio = window.innerWidth / window.innerHeight;

    this.camera.aspect = this.ratio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

};

Scene.prototype.consoleBitch = function(event) {
	console.log('consoleBitch');
};

module.exports = new Scene();