var raf = require('../utils/raf');

function Video() {

	this.next = this.next.bind(this);
	this.done = this.done.bind(this);

	this.video = null;
	this.section = null;
	this.videoName = null;
	this.buttonsNext = null;


}
Video.prototype.init = function(videoName) {

	this.videoName = videoName;

	this.video = document.getElementById(this.videoName);
	this.section = this.video.parentElement;
	this.buttonsNext = document.getElementsByClassName('video__next');

	TweenMax.set(this.section, { opacity: 0 } );
	TweenMax.to(this.section, 1, { opacity: 1, display:'block' } );

	if( raf.running )
		raf.stop();

	this.addListeners();

	this.video.play();
};

Video.prototype.addListeners = function() {

	for( var i = 0 ; i < this.buttonsNext.length ; i++ ) {

		this.buttonsNext[i].addEventListener('click', this.next);

	}

	this.video.addEventListener('ended', this.next);

};

Video.prototype.next = function(){

	TweenMax.set(this.section, { opacity: 1 } );
	TweenMax.to(this.section, 1, { opacity: 0, display: 'none', onComplete: this.done } );

};

Video.prototype.done = function() {

	this.video.pause();

	if ( this.videoName === 'videoIntro__male' || this.videoName === 'videoIntro__female' ){

		location.hash = 'mission01--start';

	}

}

module.exports = new Video();