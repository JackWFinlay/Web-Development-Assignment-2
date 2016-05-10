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