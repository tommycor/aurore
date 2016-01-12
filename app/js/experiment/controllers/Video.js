function Video() {

	console.log('video');

}

Video.prototype.init = function(index) {
	console.log(index);
};

module.exports = new Video();