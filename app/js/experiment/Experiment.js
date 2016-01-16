var gender = require('./controllers/Gender');
var home = require('./controllers/Home');
var video = require('./controllers/Video');

function Experiment() {
	
	this.router = this.router.bind(this);

	this.expUrl = location.href;	

	window.addEventListener('hashchange', this.router, false);

	this.router();

}

Experiment.prototype.router = function() {

	this.hash = location.hash.replace('#', '');

	console.log(this.hash);

	switch(this.hash) {
	case 'gender':
		gender.init();
		break;
	case 'videoIntro__male--0':
		video.init('videoIntro__male--0');
		break;
	case 'videoIntro__female--0':
		video.init('videoIntro__female--0');
		break;
	case 'home':
		home.init();
		break;
	case 'garden':
		home.garden();
		break;
	default:
		location.hash = 'gender';
	}
};

module.exports = Experiment;