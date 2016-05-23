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

					xsl = loadXMLDoc("bookings.xsl"); // Gets the XSL doc from the server.
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

function loadXMLDoc(filename)
{
	if (window.ActiveXObject)
  	{
  		xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} else {
		xhttp = new XMLHttpRequest();
	}

	xhttp.open("GET", filename, false);

	try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
	xhttp.send("");
	return xhttp.responseXML;
}