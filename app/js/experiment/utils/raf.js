var scene = require('../controllers/scene');
var camControls = require('../actions/camControls');

function raf() {

	this.start = this.start.bind(this);
	this.stop = this.stop.bind(this);
	this.controle = this.controle.bind(this);

	this.running = false;

	window.addEventListener('keydown', this.controle);
}

raf.prototype.start = function() {
	scene.render();
	camControls.render();

	this.running = true;
	this.request = requestAnimationFrame(this.start);
};

raf.prototype.stop = function() {
	cancelAnimationFrame(this.request);

	this.running = false;
	this.request = null;
};

raf.prototype.controle = function(event) {
	if (event.keyCode === 0 || event.keyCode === 32) {

		if (this.request != null)
			this.stop();
		else
			this.start();

	}
};

module.exports = new raf();