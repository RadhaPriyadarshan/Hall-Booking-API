# **Hall Booking API Documentation**


## **Overview**

This project provides a simple API for managing hall bookings, including creating rooms, booking rooms, and retrieving booking information.


## **Links**



* **GitHub Repository**:[ Hall Booking API GitHub](https://github.com/RadhaPriyadarshan/Hall-Booking-API.git)
* **Deployed API**:[ Hall Booking API on Render](https://hall-booking-api-nves.onrender.com)
* **Postman Documentation**:[ Hall Booking API Postman Documentation](https://documenter.getpostman.com/view/22447139/2sA3Qwb9cP)


## **Features**



* **Create Hall**: Creates a hall with specified details.
* **Create Booking**: Books a room for a customer.
* **List All Rooms with Booking Data**: Retrieves a list of all rooms and their bookings.
* **List All Customers with Booking Data**: Retrieves a list of all customers and their bookings.
* **List Bookings of a Customer**: Retrieves all bookings for a specific customer.


## **API Endpoints**


### **1. Create Hall**



* **Method**: POST
* **URL**: https://hall-booking-api-nves.onrender.com/createHall
* **Description**: Creates a hall with specified details.

**Example Request**:


```
{
  "name": "Conference Room B",
  "seats": 30,
  "amenities": ["Television", "Speaker"],
  "pricePerHour": 150
}
```


**Example Response**


```
{
  "id": 2,
  "name": "Conference Room B",
  "seats": 30,
  "amenities": ["Television", "Speaker"],
  "pricePerHour": 150,
  "bookings": []
}
```



### **2. Create Booking**



* **Method**: POST
* **URL**: https://hall-booking-api-nves.onrender.com/createBooking
* **Description**: Books a room for a customer.

**Example Request**:


```
{
  "customerName": "Bob Johnson",
  "date": "2024-06-03",
  "startTime": "09:00",
  "endTime": "11:00",
  "roomId": 1
}
```


**Example Response**


```
{
  "id": 3,
  "customerName": "Bob Johnson",
  "date": "2024-06-03",
  "startTime": "09:00",
  "endTime": "11:00",
  "roomId": 1,
  "status": "Booked",
  "bookingDate": "2024-05-31T17:00:00.000Z"
}
```



### **3. List All Rooms with Booking Data**



* **Method**: GET
* **URL**: https://hall-booking-api-nves.onrender.com/rooms/booking
* **Description**: Retrieves a list of all rooms and their bookings.

**Example Response**:


```
[
  {
	"roomName": "Conference Room A",
	"bookings": [
  	{
    	"customerName": "John Doe",
    	"date": "2024-06-01",
    	"startTime": "10:00",
    	"endTime": "12:00",
    	"status": "Booked"
  	},
  	{
    	"customerName": "Alice Smith",
    	"date": "2024-06-02",
    	"startTime": "13:00",
    	"endTime": "15:00",
    	"status": "Booked"
  	},
  	{
    	"customerName": "Bob Johnson",
    	"date": "2024-06-03",
    	"startTime": "09:00",
    	"endTime": "11:00",
    	"status": "Booked"
  	}
	]
  }
]
```



### **4. List All Customers with Booking Data**



* **Method**: GET
* **URL**: https://hall-booking-api-nves.onrender.com/customers/booking
* **Description**: Retrieves a list of all customers and their bookings.

**Example Response**:


```
[
  {
	"customerName": "John Doe",
	"roomName": "Conference Room A",
	"date": "2024-06-01",
	"startTime": "10:00",
	"endTime": "12:00"
  },
  {
	"customerName": "Alice Smith",
	"roomName": "Conference Room A",
	"date": "2024-06-02",
	"startTime": "13:00",
	"endTime": "15:00"
  },
  {
	"customerName": "Bob Johnson",
	"roomName": "Conference Room A",
	"date": "2024-06-03",
	"startTime": "09:00",
	"endTime": "11:00"
  }
]
```



### **5. List Bookings of a Customer**



* **Method**: GET
* **URL**: https://hall-booking-api-nves.onrender.com/bookings?customerId=1
* **Description**: Retrieves all bookings for a specific customer.

**Example Response**:


```
[
  {
	"customerName": "John Doe",
	"roomName": "Conference Room A",
	"date": "2024-06-01",
	"startTime": "10:00",
	"endTime": "12:00",
	"bookingId": 1,
	"bookingDate": "2024-05-31T15:30:00.000Z",
	"status": "Booked"
  }
]
```


 
