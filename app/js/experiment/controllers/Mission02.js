var scene = require('../controllers/scene');
var sound = require('../controllers/Sound');

var mission01 = require('../controllers/mission01');

function Mission02( ) {

	this.groupName = 'groundfloor';

}

Mission02.prototype.init = function(){

	if ( mission01.initialized === false ) {

		mission01.jumpToEnd = true;

		mission01.init();
	
	}

};

module.exports = new Mission02();