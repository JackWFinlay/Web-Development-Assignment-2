<?php 
	require_once 'settings.php';

	$bookingStatus     = "unassigned";
	$customerName      = $_POST["name"];
	$customerPhone     = $_POST["phone"];
	$unitNumber        = (isset($_POST["unit"])) ? $_POST["unit"] : null;
	$streetNumber      = $_POST["streetNumber"];
	$streetName        = $_POST["streetName"];
	$pickupSuburb      = $_POST["pickupSuburb"];
	$destinationSuburb = $_POST["destinationSuburb"];
	$time              = $_POST["time"];
	$date              = $_POST["date"];
	$pickupDateTime    = date_format(date_create_from_format('d/m/Y H:i', ($date . " " . $time)), 'Y-m-d H:i:s');
	$bookingDate       = date('Y-m-d H:i:s');

	$connection = mysqli_connect($host, $user, $password, $dbname); // Create new DB connection.

	$insertSQL = "INSERT INTO taxiBooking 
							(bookingStatus
							,customerName
							,customerPhone
							,unitNumber
							,streetNumber
							,streetName
							,pickupSuburb
							,destinationSuburb
							,pickupDateTime
							,bookingDate
							) VALUES (
							 '{$bookingStatus}'
							,'{$customerName}'
							,'{$customerPhone}'
							,'{$unitNumber}'
							,'{$streetNumber}'
							,'{$streetName}'
							,'{$pickupSuburb}'
							,'{$destinationSuburb}'
							,'{$pickupDateTime}'
							,'{$bookingDate}'
							)";
	
	if(!mysqli_query($connection, $insertSQL)) {
		echo mysqli_error($connection);
	}
	
	$bookingID = mysqli_insert_id($connection);

	echo "<p>Thank you! Your booking reference number is $bookingID. You will be picked up in front of your provided address at $time on $date.</p>";



	
?>