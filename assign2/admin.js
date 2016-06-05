/*
	ID:1399273
	The javascript file for the admin portal page.
	
	Functions:
		getRequests(): Gets the list of taxi bookings as XML and transforms it into a table via XSLT.
		assignCab():   Sends an AJAX request with the bookingID of a booking to mark as assigned.
		loadXSLDoc():  Loads the XSLT stylesheet to the client. 
*/

function getRequests() {
	var xhr = createRequest();
	if(xhr) {
		var responseTargetDiv = document.getElementById("requestsTarget");
		xhr.open("GET", "getXMLRequests.php", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {

				var responseTarget = document.getElementById("requestsTarget");	

				if (window.ActiveXObject)
				{
					var xml = xhr.responseXML; // Load XML.

					var xsl = new ActiveXObject("Microsoft.XMLDOM");
					xsl.async = false;
					xsl.load("bookings.xsl"); // Load XSL.

					
					var transform = xml.transformNode(xsl); // Transform xml to HTML following the XSLT Stylesheet.
					responseTarget.innerHTML = transform; 

				} else {
					var xsltProcessor = new XSLTProcessor();

					xsl = loadXSLDoc("bookings.xsl"); // Gets the XSL doc from the server.
					xsltProcessor.importStylesheet(xsl);

					xml = xhr.responseXML;

					var fragment = xsltProcessor.transformToFragment(xml, document); // Transform xml to HTML following the XSLT Stylesheet.
					responseTarget.innerHTML = new XMLSerializer().serializeToString(fragment);
				}
			} 
		}
		xhr.send(null);
	}
}

function assignCab(bookingID) {
	if (bookingID == ""){ // Check the value is not blank.
		return;
	}

	var xhr = createRequest();
	if(xhr) {
		var responseTargetDiv = document.getElementById("assignTarget");
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
	getRequests();
}

function loadXSLDoc(filename)
{
	var xhr = createRequest();

	xhr.open("GET", filename, false);

	xhr.send(null);
	
	return xhr.responseXML;
}