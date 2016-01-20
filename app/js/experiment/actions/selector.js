function selector( camera, target, callback ) {

	this.update = this.update.bind(this);

	this.camera = camera;

	this.callback = callback;

	this.target = [ target ];

	this.targetColor = this.target[0].material.emissive;

	this.baseColor = this.target[0].material.emissive.clone();

	this.tweenColor = null;

	this.activated = false;

	this.vector = null;

	this.caster = new THREE.Raycaster();

	this.mouse = new THREE.Vector2();

	this.hover = false;

	this.lastHover = false;

}

selector.prototype.activate = function() {

	this.tweenColor = TweenMax.to(this.targetColor, 1, { r:1, g:1, b:1, yoyo:true, repeat: -1 } );

	this.activated = true;

};

selector.prototype.desactivate = function() {

	this.tweenColor = TweenMax.to(this.targetColor, 1, { r:this.baseColor.r, g:this.baseColor.g, b:this.baseColor.b } );

	this.activated = false;

};

selector.prototype.update = function(event) {

	if ( this.activated === false )
		return;

	var intersects;

	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;

	this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	this.caster.setFromCamera( this.mouse, this.camera );

	intersects = this.caster.intersectObjects(this.target, false);

	if( intersects.length > 0 )
		this.hover = true;
	else
		this.hover = false;

	if ( this.hover ==! this.lastHover )
		this.callback();

	this.lastHover = this.hover;

};

module.exports = selector;