const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

let rooms = [];
let bookings = [];
let bookingIdCounter = 1;

// Load sample data from JSON file
const rawData = fs.readFileSync('sample_data.json');
const sampleData = JSON.parse(rawData);
rooms = sampleData.rooms;

// Initialize bookings from rooms data
rooms.forEach(room => {
    room.bookings.forEach(booking => {
        booking.roomId = room.id;
        bookings.push(booking);
        if (booking.id >= bookingIdCounter) {
            bookingIdCounter = booking.id + 1;
        }
    });
});

// Endpoint to create a hall (room)
app.post('/createHall', (req, res) => {
    const { name, seats, amenities, pricePerHour } = req.body;
    const room = { id: rooms.length + 1, name, seats, amenities, pricePerHour, bookings: [] };
    rooms.push(room);
    res.status(201).json(room);
});

// Endpoint to create a booking
app.post('/createBooking', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    // Check if the room is already booked for the given date and time
    const isBooked = room.bookings.some(b => b.date === date &&
        ((startTime >= b.startTime && startTime < b.endTime) || 
         (endTime > b.startTime && endTime <= b.endTime)));
    
    if (isBooked) {
        return res.status(400).json({ error: 'Room is already booked for the given time' });
    }

    const booking = {
        id: bookingIdCounter++,
        customerName,
        date,
        startTime,
        endTime,
        roomId,
        status: 'Booked',
        bookingDate: new Date().toISOString()
    };
    room.bookings.push(booking);
    bookings.push(booking);
    res.status(201).json(booking);
});

// Endpoint to list all rooms with booked data
app.get('/rooms/booking', (req, res) => {
    res.json(rooms.map(room => ({
        roomName: room.name,
        bookings: room.bookings.map(b => ({
            customerName: b.customerName,
            date: b.date,
            startTime: b.startTime,
            endTime: b.endTime,
            status: b.status
        }))
    })));
});

// Endpoint to list all customers with booked data
app.get('/customers/booking', (req, res) => {
    const customers = bookings.map(b => ({
        customerName: b.customerName,
        roomName: rooms.find(r => r.id === b.roomId).name,
        date: b.date,
        startTime: b.startTime,
        endTime: b.endTime
    }));
    res.json(customers);
});

// Endpoint to list bookings of a specific customer
app.get('/bookings', (req, res) => {
    const { customerId } = req.query;
    const customerBookings = bookings.filter(b => b.id === parseInt(customerId)).map(b => ({
        customerName: b.customerName,
        roomName: rooms.find(r => r.id === b.roomId).name,
        date: b.date,
        startTime: b.startTime,
        endTime: b.endTime,
        bookingId: b.id,
        bookingDate: b.bookingDate,
        status: b.status
    }));
    res.json(customerBookings);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
