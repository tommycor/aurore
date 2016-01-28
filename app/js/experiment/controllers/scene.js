function Scene() {

	this.render = this.render.bind(this);
	this.consoleBitch = this.consoleBitch.bind(this);
	this.resize = this.resize.bind(this);
	
	this.container = document.getElementById('webGL');

	this.ratio = window.innerWidth / window.innerHeight;

	console.log('Initialazing draw!');
}

Scene.prototype.init = function() {

	this.draw();

	window.addEventListener('resize', this.resize);

};

Scene.prototype.draw = function() {

	//// INIT
	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera(60, this.ratio, 0.1, 20000);

	// this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000);

	////RENDERER
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setClearColor(0x06164A, 1.0);
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


	// this.addControlGui();

	// this.addStatsObject();

	this.composer = new THREE.EffectComposer( this.renderer );

	this.depthTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );

	this.addFXAA();
	this.addSSAO();

	this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );
	this.composer.addPass( this.ssao );
	this.composer.addPass( this.fxaa );

	this.container.appendChild(this.renderer.domElement);
};

Scene.prototype.addFXAA = function() {

	this.dpr = 1;
	// if (window.devicePixelRatio !== undefined) {
	// 	this.dpr = window.devicePixelRatio;
	// }

	this.fxaa = new THREE.ShaderPass( THREE.FXAAShader );
	this.fxaa.uniforms.resolution.value.set(1 / window.innerWidth * this.dpr, 1 / window.innerHeight * this.dpr);
	this.fxaa.renderToScreen = true;

};

Scene.prototype.addSSAO = function() {

	this.depthShader = THREE.ShaderLib[ "depthRGBA" ];
	this.depthUniforms = THREE.UniformsUtils.clone( this.depthShader.uniforms );

	this.depthMaterial = new THREE.ShaderMaterial( {
		fragmentShader: this.depthShader.fragmentShader,
		vertexShader: this.depthShader.vertexShader,
		uniforms: this.depthUniforms
	} );
	this.depthMaterial.blending = THREE.NoBlending;

	this.depthTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );

	this.ssao = new THREE.ShaderPass( THREE.SSAOShader );
	this.ssao.uniforms.tDepth.value = this.depthTarget;
	this.ssao.uniforms.size.value.set( window.innerWidth, window.innerHeight );
	this.ssao.uniforms.cameraNear.value = this.camera.near;
	this.ssao.uniforms.cameraFar.value = this.camera.far;   
	this.ssao.uniforms.onlyAO.value = false;
	this.ssao.uniforms.aoClamp.value = 0.5;
	this.ssao.renderToScreen = false;


};

Scene.prototype.render = function() {

	// this.stats.update();
	// this.renderer.render( this.scene, this.camera );

	this.scene.overrideMaterial = this.depthMaterial;
	this.renderer.render( this.scene, this.camera, this.depthTarget, true );
	this.scene.overrideMaterial = null;
	this.composer.render();

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

Scene.prototype.addMeshes = function(meshes) {
	for( var i = 0 ; i < meshes.length ; i++ ) {
		this.scene.add(meshes[ i ]);
	}
};

Scene.prototype.resize = function() {
	console.log('got resized!');
	this.ratio = window.innerWidth / window.innerHeight;

	this.camera.aspect = this.ratio;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.fxaa.uniforms[ 'resolution' ].value = new THREE.Vector2( 1 / window.innerWidth * this.dpr, 1 / window.innerHeight * this.dpr);

};

Scene.prototype.consoleBitch = function(event) {
	console.log('consoleBitch');
};

module.exports = new Scene();