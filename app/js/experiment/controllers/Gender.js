function Gender() {

	this.section = document.getElementById('gender');
	this.buttons = document.getElementById('gender__buttons');

	this.done = this.done.bind(this);
	this.genderSelection = this.genderSelection.bind(this);

}

Gender.prototype.init = function(){

	this.buttons.addEventListener('click', this.genderSelection);

	TweenMax.set(this.section, { opacity: 0 } );
	TweenMax.to(this.section, 1, { opacity: 1, display:'block' } );

};

Gender.prototype.genderSelection = function(event) {
	this.id = event.srcElement.id;

	if( this.id === 'gender__male' || this.id === 'gender__female' ){

		TweenMax.set(this.section, { opacity: 1 } );
		TweenMax.to(this.section, 1, { opacity: 0, display: 'none', onComplete: this.done } );

	}

};

Gender.prototype.done = function() {

	TweenMax.set(gender, { display:'none' });

	if( this.id === 'gender__male' )
		location.search = '?gender=male';

	else if( this.id === 'gender__female' )
		location.search = '?gender=female';

	location.hash = "videoIntro--0";

}

module.exports = new Gender();