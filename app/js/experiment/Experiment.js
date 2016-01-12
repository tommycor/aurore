var $gender = require('./controllers/Gender');
var $home = require('./controllers/Home');
var $video = require('./controllers/Video');

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
		$gender.init();
		break;
	case 'videointro--0':
		$video.init(0);
		break;
	case 'home':
		$home.init();
		break;
	default:
		location.hash = 'gender';
	}
};

module.exports = Experiment;