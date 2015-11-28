function CamControls(){


}

CamControls.prototype.init = function( camera, gui ) {

	this.camera = camera;

    this.clock = new THREE.Clock();

    this.camera.position.x = 100;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));



    this.controls = new THREE.FirstPersonControls(camera);
    this.controls.lookSpeed = 0.07;
    this.controls.movementSpeed = 50;
    this.controls.noFly = true;
    this.controls.lookVertical = true;
    this.controls.constrainVertical = true;
    this.controls.verticalMin = 1.0;
    this.controls.verticalMax = 2.0;
    this.controls.lon = -150;
    this.controls.lat = 120;

};

CamControls.prototype.render = function() {
    
    delta = this.clock.getDelta();

    this.controls.update(delta);
};

module.exports = new CamControls();