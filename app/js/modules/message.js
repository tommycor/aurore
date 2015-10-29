function Message(text) {
	
	this.text = text;

}

Message.prototype.display = function() {

	console.log(this.text);

};

module.exports = Message;