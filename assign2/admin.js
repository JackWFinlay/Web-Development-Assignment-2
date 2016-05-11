function getRequests() {
	var xhr = createRequest();
	if(xhr) {
		var responseTargetDiv = document.getElementById("requestsTarget");
		xhr.open("GET", "getRequests.php", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				responseTargetDiv.innerHTML = xhr.responseText;
			} 
		}
		xhr.send(null);
	}
}

function assignCab() {
	var xhr = createRequest();
	if(xhr) {
		var responseTargetDiv = document.getElementById("assignTarget");
		var bookingID = document.getElementById("assignBox").value
		var requestbody ="bookingID=" + encodeURIComponent(bookingID);
		xhr.open("POST", "assignCab.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				responseTargetDiv.innerHTML = xhr.responseText;
			} 
		}
		xhr.send(requestbody);
	}

}