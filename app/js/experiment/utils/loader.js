function Loader() {

	this.section = document.getElementById( 'loader' );

	this.progressBar = document.getElementById( 'progressBar' );

	this.countElements = 0;

	this.done = 0;

	this.pourcent = 0;

}

Loader.prototype.init = function(countElements) {

	this.countElements = 0;

	this.done = 0;

	this.pourcent = 0;

	TweenMax.set(this.section, { opacity: 0 } );

	TweenMax.to(this.section, 1, { opacity: 1, display:'block' } );

	this.progressBar.style.width = this.pourcent + '%' ;

};

Loader.prototype.update = function(done) {

	this.done = done;

	this.pourcent = this.done / this.countElements;

	this.progressBar.style.width = this.pourcent + '%' ;

};

Loader.prototype.end = function(done) {

	TweenMax.set(this.section, { opacity: 1 } );

	TweenMax.to(this.section, 1, { opacity: 0, display:'none' } );

};

module.exports = new Loader();