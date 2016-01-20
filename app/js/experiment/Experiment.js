var gender = require('./controllers/Gender');
var mission01 = require('./controllers/Mission01');
var mission02 = require('./controllers/Mission02');
var video = require('./controllers/Video');

function Experiment() {
	
	this.router = this.router.bind(this);

	this.expUrl = location.href;	

	window.addEventListener('hashchange', this.router, false);

	this.router();

}

Experiment.prototype.router = function() {

	this.hash = location.hash.replace('#', '');

	switch(this.hash) {
	case 'gender':
		gender.init();
		break;
	case 'videoIntro__male':
		video.init('videoIntro__male');
		break;
	case 'videoIntro__female':
		video.init('videoIntro__female');
		break;
	case 'mission01--start':
		mission01.init();
		break;
	case 'mission01--walk':
		mission01.walk();
		break;
	case 'video01__male':
		video.init('video01__male');
		break;
	case 'video01__female':
		video.init('video01__female');
		break;
	case 'mission01--portal':
		mission01.getPortal();
		break;
	case 'mission02--start':
		mission02.init();
		break;
	default:
		location.hash = 'gender';
	}
};

module.exports = Experiment;