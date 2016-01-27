var config = require('../utils/config');

function Gender() {

	this.done = this.done.bind(this);
	this.genderSelection = this.genderSelection.bind(this);

	this.section = document.getElementById('gender');
	this.buttons = document.getElementById('gender__buttons');

}

Gender.prototype.init = function(){

	this.buttons.addEventListener('click', this.genderSelection);

	TweenMax.set(this.section, { opacity: 0 } );
	TweenMax.to(this.section, 1, { opacity: 1, display:'block' } );

};

Gender.prototype.genderSelection = function(event) {

	this.id = event.target.id;

	console.log(this.id);

	if( this.id === 'gender__male' || this.id === 'gender__female' ){

		TweenMax.set(this.section, { opacity: 1 } );
		TweenMax.to(this.section, 1, { opacity: 0, display: 'none', onComplete: this.done } );

	}

};

Gender.prototype.done = function() {

	switch( this.id ) {
	case 'gender__male':
		config.gender = 'male';
		location.hash = 'videoIntro__male';
		break;
	case 'gender__female':
		config.gender = 'female';
		location.hash = 'videoIntro__female';
		break;
	default:
		location.hash = 'gender';
	}

};

module.exports = new Gender();