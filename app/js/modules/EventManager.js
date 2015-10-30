var message = require('./Message');

function EventManager () {

	window.addEventListener('resize', this.resize, false);

}

EventManager.prototype.resize = function (event) {

	message.display();

}

module.exports = new EventManager();