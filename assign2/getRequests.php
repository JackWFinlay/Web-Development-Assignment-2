<?php
	require_once 'settings.php';

	$connection = mysqli_connect($host, $user, $password, $dbname); // Create new DB connection.

	$dateNow = date('Y-m-d H:m:s',strtotime('-2 hours'));
	$date    = Date('Y-m-d H:m:s');

	$query = "SELECT bookingID, customerName, customerPhone, pickupSuburb, destinationSuburb, pickupDateTime
		FROM taxiBooking
		WHERE bookingStatus = 'unassigned'
		AND pickupDateTime BETWEEN '{$date}' AND '{$dateNow}'";

	$resultSet = mysqli_query($connection, $query);

	if (mysqli_num_rows($resultSet) > 0) {

	    while($row = mysqli_fetch_assoc($resultSet)) {
	    	$bookingID = $row['bookingID'];
	    	$customerName = $row['customerName'];
	    	$customerPhone = $row['customerPhone'];
	    	$pickupSuburb = $row['pickupSuburb'];
	    	$destinationSuburb = $row['destinationSuburb'];
	    	$pickupDate = date_format('d/m/Y', $row['pickupDateTime']);
	    	$pickupTime = date_format('H:m', $row['pickupDateTime']);


	        echo "<div class='requests'>
        			<p>Booking ID: $bookingID</p>
        			<p>
        			Customer Name: $customerName<br/>
        			Customer Phone: $customerPhone<br/>
        			Pickup Suburb: $pickupSuburb<br/>
        			Destination Suburb: $destinationSuburb        			
        			</p>
        			<p>
        			Date: $pickupDate<br/>
        			Time: $pickupTime
        			</p>
	        	 </div>";
	    }

	    mysqli_free_result($resultSet);
	}
?>