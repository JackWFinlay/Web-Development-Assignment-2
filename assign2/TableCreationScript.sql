CREATE TABLE fhp0351.taxiBooking (
	bookingID INT NOT NULL AUTO_INCREMENT,
	status VARCHAR(50) NOT NULL,
	customerName VARCHAR(50) NOT NULL,
	customerPhone VARCHAR(15) NOT NULL,
	unitNumber INT,
	streetNumber INT NOT NULL,
	streetName VARCHAR(50) NOT NULL,
	pickupSuburb VARCHAR(50) NOT NULL,
	destinationSuburb VARCHAR(50) NOT NULL,
	pickupTime VARCHAR(5) NOT NULL,
	pickupDate DATE NOT NULL,
	bookingDate DATETIME NOT NULL,
	PRIMARY KEY (bookingID)
)