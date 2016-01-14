var config = require('../utils/config');

function Sound() {
	
	this.ended = this.ended.bind(this);

	this.player = document.getElementById( 'soundPlayer' );
	this.sourceOgg = document.getElementById( 'sourceOgg' );
	this.sourceMp3 = document.getElementById( 'sourceMp3' );
	this.subtitles = null;


}

Sound.prototype.init = function(sound){

		
	this.player.addEventListener('ended', this.ended );

	this.subtitles = document.getElementById( sound + '__subtitles__' + config.gender );

	this.sourceMp3.src = 'sounds/' + sound + '__' + config.gender + '.mp3';

	this.player.load();

	if(sound === 'start')
		setTimeout( this.play(), 1000 );
	else
		this.play();

};

Sound.prototype.play = function() {

	TweenMax.set(this.subtitles, { opacity: 0 } );
	TweenMax.to(this.subtitles, 1, { opacity: 1, display:'block' } );

	this.player.play();

};

Sound.prototype.ended = function() {

	TweenMax.set(this.subtitles, { opacity: 1 } );
	TweenMax.to(this.subtitles, 1, { opacity: 0, display: 'none' } );

};

module.exports = new Sound();