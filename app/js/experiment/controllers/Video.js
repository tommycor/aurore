function Video() {

	this.next = this.next.bind(this);

	this.video = null;
	this.wrapVideo = null;
	this.section = null;

}

Video.prototype.init = function(videoName) {

	this.video = document.getElementById(videoName);
	this.section = this.video.parentElement;
	this.buttonsNext = document.getElementsByClassName('video__next');


	TweenMax.set(this.section, { opacity: 0 } );
	TweenMax.to(this.section, 1, { opacity: 1, display:'block' } );

	for( var i = 0 ; i < this.buttonsNext.length ; i++ ) {
		console.log(this.buttonsNext[i])
		this.buttonsNext[i].addEventListener('click', this.next);
	}

	this.video.play();
};

Video.prototype.next = function(){

	this.video.pause();

};

module.exports = new Video();