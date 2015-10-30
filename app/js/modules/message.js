function Message() {
	
	this.text = null;

}

Message.prototype.setText = function (text) {

	this.text = text;

};

Message.prototype.display = function() {

	if ( typeof this.text !== null )
		console.log(this.text);

};

module.exports = new Message();