function thermalVision(objects, coldOnes) {

	this.desactivate = this.desactivate.bind( this );

	this.objects = objects;

	this.objectsRealColor = [];

	this.objectsRealEmissive = [];

	this.coldOnes = coldOnes;


	var current;

	for ( var i = 0 ; i < this.objects.length ; i++ ) {

		current = this.objects[i];

		if ( current.material !== undefined && current.material.color !== undefined ) {

			this.objectsRealColor[i] = current.material.color.clone();

			this.objectsRealEmissive[i] = current.material.emissive.clone();

			current.material.color = new THREE.Color( 0xFFC600 );

			current.material.emissive = new THREE.Color( 0xD46307 );

		}

	}

	for ( var i = 0 ; i < this.coldOnes.length ; i++ ) {

		current = this.coldOnes[i];

		current.material.color = new THREE.Color( 0x3BFFE1 );

		current.material.emissive = new THREE.Color( 0x37A3FF );

	}

}

thermalVision.prototype.desactivate = function() {

	var current;

	for ( var i = 0 ; i < this.objects.length ; i++ ) {

		current = this.objects[i];

		if ( current.material !== undefined && current.material.color !== undefined ) {

			current.material.color = this.objectsRealColor[i];

			current.material.emissive = this.objectsRealEmissive[i];

		}

	}

}

module.exports = thermalVision;