// Jack Finlay 1399273 - 

function getData(dataSource, responseTarget, name, phone, unit, streetNumber, streetName, pickupSuburb, destinationSuburb, time, date) {
	var xhr = createRequest();
	if(xhr) {
		var responseTargetDiv = document.getElementById(responseTarget);
		var requestbody ="name=" 			   + encodeURIComponent(name)
						+"&phone=" 			   + encodeURIComponent(phone)
						+"&unit="              + encodeURIComponent(unit)
						+"&streetNumber="      + encodeURIComponent(streetNumber)
						+"&streetName="        + encodeURIComponent(streetName)
						+"&pickupSuburb="      + encodeURIComponent(pickupSuburb)
						+"&destinationSuburb=" + encodeURIComponent(destinationSuburb)
						+"&time=" 			   + encodeURIComponent(time)
						+"&date=" 			   + encodeURIComponent(date);
		xhr.open("POST", dataSource, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				responseTargetDiv.innerHTML = xhr.responseText;
				document.getElementById("bookingForm").reset(); // Reset the form on success.
			} 
		}
		xhr.send(requestbody);
	}
}

function submitBooking() {
	document.getElementById("submit").disabled = true; // Disable submit button, so it doesn't fire multiple times.

	var name = document.getElementById("name");
	var phone = document.getElementById("phone");
	var unit = document.getElementById("unit");
	var streetNumber = document.getElementById("streetNumber");
	var streetName = document.getElementById("streetName");
	var pickupSuburb = document.getElementById("pickupSuburb");
	var destinationSuburb = document.getElementById("destinationSuburb");
	var time = document.getElementById("time");
	var date = document.getElementById("date");

	document.getElementById('responseTarget').innerHTML = "";
	if (!validate(name, phone, unit, streetNumber, streetName, pickupSuburb, destinationSuburb, time, date)) {
		document.getElementById("submit").disabled = false; // Re-enable the sumbit button.
		return; // Skip the rest of the function.
	}

	getData("bookingProcess.php"
			,"responseTarget"
			,name.value
			,phone.value
			,unit.value
			,streetNumber.value
			,streetName.value
			,pickupSuburb.value
			,destinationSuburb.value
			,time.value
			,date.value
			);

	document.getElementById("submit").disabled = false; // Re-enable the sumbit button.
}

function validate(name, phone, unit, streetNumber, streetName, pickupSuburb, destinationSuburb, time, date) {

	var valid = true;
	var timeValid = true;
	var dateValid = true;

	if (name.value.length <= 0){ // Check if input has any value.
		valid = false;
		name.classList.add("input-invalid"); // Add "invalid-input" class to input, making it red.
	} else {
		name.classList.remove("input-invalid");
	}

	if (phone.value.length > 0){
		var re = /^\+?\d{9,}$/; //Check if phone number is valid. Can contain "+" symbol for international numbers.
		if (!re.test(phone.value)){
			valid = false;
			phone.classList.add("input-invalid");
		} else {
			phone.classList.remove("input-invalid");
		}
		
	} else {
		valid = false;
		phone.classList.add("input-invalid");
	}

	if (unit.value.length > 0) {
		var re = /^\d+$/;
		if (!re.test(unit.value)) {
			valid = false;
			unit.classList.add("input-invalid");
		} else {
			unit.classList.remove("input-invalid");
		}
	} // Not else on this one as Unit is optional.

	if(streetNumber.value.length > 0 ) {
		var re = /^\d+$/;
		if (!re.test(streetNumber.value)) {
			valid = false;
			streetNumber.classList.add("input-invalid");
		} else {
			streetNumber.classList.remove("input-invalid");
		}
	} else {
		valid = false;
		streetNumber.classList.add("input-invalid");
	}

	if (streetName.value.length <= 0){ // Check if input has any value.
		valid = false;
		streetName.classList.add("input-invalid"); // Add "invalid-input" class to input, making it red.
	} else {
		streetName.classList.remove("input-invalid");
	}

	if (pickupSuburb.value.length <= 0){ 
		valid = false;
		pickupSuburb.classList.add("input-invalid"); 
	} else {
		pickupSuburb.classList.remove("input-invalid");
	}

	if (destinationSuburb.value.length <= 0){ 
		valid = false;
		destinationSuburb.classList.add("input-invalid"); 
	} else {
		destinationSuburb.classList.remove("input-invalid");
	}

	if (time.value.length > 0){
		var re = /^([0-1]?\d|[2][0-3]):[0-5]\d$/; 
		if (!re.test(time.value)){
			valid = false;
			timeValid = false;
			time.classList.add("input-invalid");
		} else {
			time.classList.remove("input-invalid");
		}
		
	} else {
		valid = false;
		timeValid = false;
		time.classList.add("input-invalid");
	}

	if (date.value.length > 0){
		var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/; 
		if (!re.test(date.value)){
			valid = false;
			date.classList.add("input-invalid");
		} else {
			var split = date.value.split('/');
			var year = split[2], month  = split[1], day = split[0];
  			var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
			
			if ( (!(year % 4) && year % 100) || !(year % 400)) {
				daysInMonth[1] = 29; // It is a leap year so February has 29 days.
			}

			if(day > daysInMonth[month - 1]){
				valid = false;
				dateValid = false;
				date.classList.add("input-invalid");
			} else {
				date.classList.remove("input-invalid");
			}
		}
		
	} else {
		valid = false;
		dateValid = false
		date.classList.add("input-invalid");
	}

	if (timeValid && dateValid) {
		if (Date.parse(date.value + " " + time.value + ":00") < Date.now()){ // Check date is in future or now
			valid = false;
			date.classList.add("input-invalid");
			time.classList.add("input-invalid");
			document.getElementById('responseTarget').innerHTML = "<p class=\"warning-text\">Date and time cannot be in the past.</p>";
		} else {
			date.classList.remove("input-invalid");
			time.classList.remove("input-invalid");
		}
	}
		
	if (!valid) {
		document.getElementById('responseTarget').innerHTML += "<p class=\"warning-text\">Invalid form entry.</p>";
	} 
	
	return valid;
}


function resetWarnings() {
	
	var inputs = document.getElementsByTagName('input');

	for (var index = 0; index < inputs.length; index++) {
	    document.getElementsByTagName('input')[index].classList.remove("input-invalid");
	} // Remove the "input-invalid" class from each input element.

	document.getElementById('responseTarget').innerHTML = "";
}