function hasInTab( object, tab ){

	for( var i = 0 ; i < tab.length ; i++ ) {

		if( tab[ i ] === object )
			return true;

	}

	return false;

}

module.exports = hasInTab;