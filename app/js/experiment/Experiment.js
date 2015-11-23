var $home = require('./controllers/Home');

function Experiment() {

	this.router = this.router.bind(this);
	this.expUrl = location.href;	
	window.addEventListener('hashchange', this.router, false);

	this.router();

}

Experiment.prototype.router = function() {

	this.hash = location.hash.replace('#', '');
	
	switch(this.hash) {
	case 'home':
		$home.init();
		break;
	default:
		location.hash = 'home';
	}
};

module.exports = Experiment;