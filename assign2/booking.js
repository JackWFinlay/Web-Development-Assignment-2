// file simpleajax.js
// function getData(dataSource, divID, aName, aPwd) {
// 	var xhr = createRequest();
// 	if(xhr) {
// 		var obj = document.getElementById(divID);
// 		var requestbody ="name="+encodeURIComponent(aName)+"&pwd="+encodeURIComponent(aPwd);
// 		xhr.open("POST", dataSource, true);
// 		xhr.setRequestHeader("Content-Type", "application/x-www-formurlencoded");

// 		xhr.onreadystatechange = function() {
// 			//alert(xhr.readyState); // to let us see the state of the computation
// 			if (xhr.readyState == 4 && xhr.status == 200) {
// 			obj.innerHTML = xhr.responseText;
// 			} // end if
// 		} // end anonymous call-back function
// 		xhr.send(requestbody);
// 	} // end if
// } // end function getData() 

function submitBooking() {

	document.getElementById('responseTarget').innerHTML = "";
	validate();

}

function validate() {

	var valid = true;

	// get input objects
	var name = document.getElementById("name");
	var phone = document.getElementById("phone");
	var unit = document.getElementById("unit");
	var streetNumber = document.getElementById("streetNumber");
	var streetName = document.getElementById("streetName");
	var pickupSuburb = document.getElementById("pickupSuburb");
	var destinationSuburb = document.getElementById("destinationSuburb");
	var time = document.getElementById("time");
	var date = document.getElementById("date");

	if (name.value.length <= 0){ // Check if input has any value.
		valid = false;
		name.classList.add("input-invalid"); // Add "invalid-input" class to input, making it red.
	} else {
		name.classList.remove("input-invalid");
	}

	if (phone.value.length > 0){
		var re = /^[\+?]\d{9,}$/; //Check if phone number is valid. Can contain "+" symbol for international numbers.
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

	if(streetNumber.value.length > 0 ) {
		if (!Number.isInteger(streetNumber.value)) {
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
			time.classList.add("input-invalid");
		} else {
			time.classList.remove("input-invalid");
		}
		
	} else {
		valid = false;
		time.classList.add("input-invalid");
	}

	if (date.value.length > 0){
		var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/; 
		if (!re.test(date.value)){
			valid = false;
			date.classList.add("input-invalid");
		} else {
			var split = s.split('/');
			var year = split[2], month  = split[1], day = split[0];
  			var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
			
			if ( (!(year % 4) && year % 100) || !(year % 400)) {
				daysInMonth[1] = 29; // It is a leap year.
			}

			if(day > daysInMonth[--month]){
				valid = false;
				date.classList.add("input-invalid");
			} else {
				date.classList.remove("input-invalid");
			}
		}
		
	} else {
		valid = false;
		date.classList.add("input-invalid");
	}

	if (!valid) {
		document.getElementById('responseTarget').innerHTML = "<p class=\"warning-text\">Invalid form entry.</p>";
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