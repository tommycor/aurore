function Sound() {
	
	this.player = document.getElementById('soundPlayer');
	this.sourceOgg = document.getElementById('sourceOgg');
	this.sourceMp3 = document.getElementById('sourceMp3');

}

Sound.prototype.init = function(sound){

	this.sourceMp3.src = 'sounds/' + sound + '.mp3';

	this.player.load();

	if(sound === 'start')
		setTimeout( this.player.play(), 1000 );
	else
		this.player.play();


};

module.exports = new Sound();