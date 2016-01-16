var message = require('./modules/Message');
var eventManager = require('./modules/EventManager');
var Experiment = require('./experiment/Experiment');

var fakePath = location.pathname.replace(location.hash, '');

if (fakePath === '/dist/exp.html')
{
	var experiment = new Experiment();
}
