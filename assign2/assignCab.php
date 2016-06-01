<?php
	/*
		ID:1399273
		This file updates the booking specified by the bookingID passed to it by the assignCab() method in admin.js

	*/

	require_once 'settings.php';

	$connection = mysqli_connect($host, $user, $password, $dbname);

	$bookingID = mysqli_escape_string($connection, $_POST["bookingID"]); //Get booking ID from post request, sanitising it first.

	$query = "UPDATE taxiBooking 
				SET bookingStatus = 'assigned' 
				WHERE bookingID = $bookingID";

	if (mysqli_query($connection, $query)) {
		echo "<p>The booking request $bookingID has been properly assigned.</p>";
	} else {
		echo "<p>Booking ID not found.</p>";
	}

	mysqli_close($connection);

?>