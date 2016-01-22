var config = require('../utils/config');

function Sound() {
	
	this.play = this.play.bind(this);
	this.ended = this.ended.bind(this);
	this.transition = this.transition.bind(this);

	this.player = document.getElementById( 'soundPlayer' );
	this.sourceOgg = document.getElementById( 'sourceOgg' );
	this.sourceMp3 = document.getElementById( 'sourceMp3' );
	this.subtitles = null;
	this.sound = null;


}

Sound.prototype.init = function(sound){

	this.sound = sound;
		
	this.player.addEventListener('ended', this.ended );

	this.subtitles = document.getElementById( this.sound + '__subtitles__' + config.gender );

	this.sourceMp3.src = 'sounds/' + this.sound + '__' + config.gender + '.mp3';

	this.player.load();
};

Sound.prototype.play = function() {

	TweenMax.set(this.subtitles, { opacity: 0 } );
	TweenMax.to(this.subtitles, 1, { opacity: 1, display:'block' } );

	this.player.play();

};

Sound.prototype.ended = function() {

	TweenMax.set(this.subtitles, { opacity: 1 } );
	TweenMax.to(this.subtitles, 1, { opacity: 0, display: 'none', onComplete: this.transition } );

};

Sound.prototype.transition = function() {

	switch(this.sound) {
		
	case 'start':
		location.hash = 'mission01--walk';
		break;

	case 'sound__01':
		if (config.gender === 'male')
			location.hash = 'video01__male';
		else
			location.hash = 'video01__female';
		break;

	case 'sound__02':
		location.hash = 'mission02--thermal';
		break;

	case 'sound__03':
		location.hash = 'mission02--book';
		break;
		
	default:
		// do nothing;
	}

};

module.exports = new Sound();