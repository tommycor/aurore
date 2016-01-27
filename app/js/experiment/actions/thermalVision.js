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

			current.material.color = new THREE.Color( 0xE24A00 );

			current.material.emissive = new THREE.Color( 0xFF2020 );

		}

	}

	for ( var i = 0 ; i < this.coldOnes.length ; i++ ) {

		current = this.coldOnes[i];

		current.material.color = new THREE.Color( 0x2951FF );

		current.material.emissive = new THREE.Color( 0x002AFF );

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