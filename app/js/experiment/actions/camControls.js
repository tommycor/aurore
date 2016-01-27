function CamControls(){


}

CamControls.prototype.init = function( camera, gui ) {
	this.consoleMeAThing = this.consoleMeAThing.bind(this);

	this.camera = camera;
	this.obstacle = null;
	this.clock = new THREE.Clock();

	this.camera.position.x = 850;
	this.camera.position.y = 121;
	this.camera.position.z = 900;
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));



	this.controls = new THREE.FirstPersonControls(camera);
	this.controls.lookSpeed = 0.15;
	this.controls.movementSpeed = 300;
	this.controls.noFly = true;
	this.controls.lookVertical = true;
	this.controls.constrainVertical = true;
	this.controls.verticalMin = 1.0;
	this.controls.verticalMax = 2.0;
	this.controls.lon = -150;
	this.controls.lat = 120;

	this.rayBottom = new THREE.Vector3(0,-1,0);

	this.frontRay = new THREE.Vector3(0, 0, 0);
	this.leftRay = new THREE.Vector3(0, 0, 0);
	this.rightRay = new THREE.Vector3(0, 0, 0);
	this.backRay = new THREE.Vector3(0, 0, 0);

	this.caster = new THREE.Raycaster();
	this.distHorizontal = 15;
	this.distMinBottom = 120;
	this.distMaxBottom = this.distMinBottom + 10;

	// window.addEventListener('click', this.consoleMeAThing);
	window.addEventListener('resize', this.controls.handleResize);

};

CamControls.prototype.render = function() {
	
	delta = this.clock.getDelta();

	this.controls.update(delta);

	this.getCollisions();
	this.getHeight();
};

CamControls.prototype.setObstacle = function(obstacle) {

	this.obstacle = [obstacle];

};

CamControls.prototype.getCollisions = function() {

	this.frontRay.subVectors(this.controls.target, this.camera.position);
	this.frontRay.normalize();

	this.backRay.x = - this.frontRay.x;
	this.backRay.z = - this.frontRay.z;
	this.rightRay.x = - this.frontRay.z;
	this.rightRay.z = this.frontRay.x;
	this.leftRay.x = - this.rightRay.x;
	this.leftRay.z = - this.rightRay.z;

	if( this.getWall(this.frontRay, this.distHorizontal) )
		this.controls.canMoveForward = false;
	else
		this.controls.canMoveForward = true;		

	if( this.getWall(this.backRay, this.distHorizontal) )
		this.controls.canMoveBackward = false;
	else
		this.controls.canMoveBackward = true;	

	if( this.getWall(this.leftRay, this.distHorizontal) )
		this.controls.canMoveLeft = false;
	else
		this.controls.canMoveLeft = true;	

	if( this.getWall(this.rightRay, this.distHorizontal) )
		this.controls.canMoveRight = false;
	else
		this.controls.canMoveRight = true;	

};

CamControls.prototype.getHeight = function() {

	this.caster.set(this.camera.position, this.rayBottom);
	var collisions = this.caster.intersectObjects(this.obstacle, false);

	// just test collision[0]: it's the closest object captured by the raycast and it's better for performances
	// IF CLIMB
	if ( collisions[0].distance < this.distMinBottom ) {
		this.controls.moveUp = true;
		this.controls.moveDown = false;
	}
	// IF FALL
	else if ( collisions[0].distance > this.distMaxBottom ) {
		this.controls.moveDown = true;
		this.controls.moveUp = false;
	}
	// IF NORMAL WALK
	else{
		this.controls.moveUp = false;
		this.controls.moveDown = false;
	}

};

CamControls.prototype.getWall = function(ray, minDist) {

	this.caster.set(this.camera.position, ray);
	var collisions = this.caster.intersectObjects(this.obstacle, false);

	for( var i = 0 ; i < collisions.length ; i++ ) {
		if ( collisions[i].distance < minDist ) {
			return true;
		}
		else{	
			return false;
		}
	}
};

CamControls.prototype.consoleMeAThing = function() {

	console.log('consoleMeAThing');
	console.log(this.camera.position);

};

module.exports = new CamControls();