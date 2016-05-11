<?php
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

?>