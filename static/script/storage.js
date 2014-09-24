function get_Storage(place,key) {
	// body...
	var value;
	if (place="local") {
		value=localStorage.getItme(key);
	}
	else if(place=="session"){
		value=SessionStorage.getItme(key);
	}
	else{
		return;
	}
	if(value!=null){
			return value;
		}
	else{
			return;
		}
	return true;
}

function set_Storage(place,key,value) {
	if (place="local") {
		localStorage.setItme(key,value);
	}
	else if(place=="session"){
		SessionStorage.setItme(key,value);
	}
	else{
		return;
	}
}