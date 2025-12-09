import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(undefined);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const saveBookings = (updatedBookings) => {
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const addBooking = (carId, carName, customerName, customerEmail, customerPhone, pickupDate, returnDate) => {
    const newBooking = {
      id: Date.now().toString(),
      carId,
      carName,
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      returnDate,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    saveBookings([newBooking, ...bookings]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId, status) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    saveBookings(updatedBookings);
  };

  const deleteBooking = (bookingId) => {
    saveBookings(bookings.filter(booking => booking.id !== bookingId));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within BookingProvider');
  }
  return context;
}
