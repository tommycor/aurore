function selector( camera, target ) {

	this.refresh = this.refresh.bind(this);

	this.camera = camera;

	this.target = [ target ];

	this.targetColor = this.target[0].material.emissive;

	this.activated = false;

	this.vector = null;

	this.caster = new THREE.Raycaster();

	this.mouse = new THREE.Vector2();

}

selector.prototype.activate = function() {

	TweenMax.to(this.targetColor, 1, { r:1, g:1, b:1, yoyo:true, repeat: -1 } );

	this.activated = true;

};

selector.prototype.refresh = function(event) {

	if ( this.activated === false )
		return;

	var intersects;

	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;

	this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	this.caster.setFromCamera( this.mouse, this.camera );

	intersects = this.caster.intersectObjects(this.target, false);

	if( intersects.length > 0 )
		console.log(true);
	else
		console.log(false);

};

module.exports = selector;