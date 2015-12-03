function CamControls(){


}

CamControls.prototype.init = function( camera, gui, obstacle ) {
	this.rayCastFront = this.rayCastFront.bind(this);

	this.camera = camera;
	this.obstacle = [obstacle];
	this.clock = new THREE.Clock();

	this.camera.position.x = 0;
	this.camera.position.y = 0;
	this.camera.position.z = 0;
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));



	this.controls = new THREE.FirstPersonControls(camera);
	this.controls.lookSpeed = 0.1;
	this.controls.movementSpeed = 90;
	this.controls.noFly = true;
	this.controls.lookVertical = true;
	this.controls.constrainVertical = true;
	this.controls.verticalMin = 1.0;
	this.controls.verticalMax = 2.0;
	this.controls.lon = -150;
	this.controls.lat = 120;

	this.rays = [
		new THREE.Vector3(0, 0, 1),
		new THREE.Vector3(1, 0, 0),
		new THREE.Vector3(0, 0, -1),
		new THREE.Vector3(-1, 0, 0)
	];
	this.raybottom = new THREE.Vector3(0,-1,0);
	this.caster = new THREE.Raycaster();

	this.distFront = 15;
	this.distBottom = 50;

	window.addEventListener('click', this.rayCastFront);

};

CamControls.prototype.render = function() {
	
	delta = this.clock.getDelta();

	this.controls.update(delta);

	
	for (var v = 0 ; v < this.rays.length ; v++ ) {

		this.caster.set(this.camera.position, this.rays[v]);

		this.collisions = this.caster.intersectObjects(this.obstacle, false);

		for( var i = 0 ; i < this.collisions.length ; i++ ) {

			if (this.collisions[i].distance < this.distFront)
				console.log(this.collisions[i].distance);
		}

	}

};

CamControls.prototype.rayCastFront = function() {

	this.rayfront = new THREE.Vector3( this.controls.target.x - this.camera.position.x , this.controls.target.y - this.camera.position.y , this.controls.target.z - this.camera.position.z );


};

module.exports = new CamControls();