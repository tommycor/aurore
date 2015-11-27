var emitterComponent = require('./emitter-component');

function Emitter() {

  emitterComponent.call(this);

}

Emitter.prototype = new emitterComponent;

module.exports = new Emitter();