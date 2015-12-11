var Emitter = require('./EventEmitter');

function GlobalEvents() {

	window.addEventListener('resize', function(event) {Emitter.emit('utils:events:resize', event);});}

module.exports = new GlobalEvents();