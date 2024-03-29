<?php
	/*
		ID:1399273
		Gets the bookings for the next two hours and sends them as XML.
	*/

	date_default_timezone_set('Pacific/Auckland');
	header('Content-Type: text/xml'); // Return XML rather than HTML.
	require_once 'settings.php';

	$connection = mysqli_connect($host, $user, $password, $dbname); // Create new DB connection.

	$dateNow    = date('Y-m-d H:i:s');
	$dateFuture = date('Y-m-d H:i:s',strtotime('+2 hours')); // Adds 2 hours to current date.
	

	$query = "SELECT bookingID, customerName, customerPhone, pickupSuburb, destinationSuburb, pickupDateTime
		FROM taxiBooking
		WHERE bookingStatus = 'unassigned'
		AND pickupDateTime BETWEEN '{$dateNow}' AND '{$dateFuture}'";

	$resultSet = mysqli_query($connection, $query);
	
	$doc = new DomDocument('1.0');
    $bookings = $doc->appendChild($doc->createElement('bookings')); // Parent node for all bookings.
	
	if (mysqli_num_rows($resultSet) > 0) {

		

	    while($row = mysqli_fetch_assoc($resultSet)) {
	    	$bookingID = $row['bookingID'];
	    	$customerName = $row['customerName'];
	    	$customerPhone = $row['customerPhone'];
	    	$pickupSuburb = $row['pickupSuburb'];
	    	$destinationSuburb = $row['destinationSuburb'];
	    	$pickupDate = date('d/m/Y', strtotime($row['pickupDateTime']));
	    	$pickupTime = date('H:i', strtotime($row['pickupDateTime']));

	        $booking = $bookings->appendChild($doc->createElement('booking')); // Booking node for each booking.

	        $id = $booking->appendChild($doc->createElement('id'));
	        $id->appendChild($doc->createTextNode($bookingID));

	        $name = $booking->appendChild($doc->createElement('name'));
	        $name->appendChild($doc->createTextNode($customerName));

	        $phone = $booking->appendChild($doc->createElement('phone'));
	        $phone->appendChild($doc->createTextNode($customerPhone));

	        $pickup = $booking->appendChild($doc->createElement('pickup'));
	        $pickup->appendChild($doc->createTextNode($pickupSuburb));

	        $destination = $booking->appendChild($doc->createElement('destination'));
	        $destination->appendChild($doc->createTextNode($destinationSuburb));

	        $date = $booking->appendChild($doc->createElement('date'));
	        $date->appendChild($doc->createTextNode($pickupDate));

	        $time = $booking->appendChild($doc->createElement('time'));
	        $time->appendChild($doc->createTextNode($pickupTime));

	    }

	} 

	mysqli_free_result($resultSet);


	$xml = $doc->saveXML();
	
	echo $xml;

	mysqli_close($connection);
?>