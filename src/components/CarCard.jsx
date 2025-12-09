import { useState } from 'react';
import { Fuel, Users, Car as CarIcon, X } from 'lucide-react';
import { useBookings } from '../context/BookingContext.jsx';

export default function CarCard({ car }) {
  const { addBooking } = useBookings();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    pickupDate: '',
    returnDate: ''
  });
  const [bookingMessage, setBookingMessage] = useState('');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.customerName || !bookingForm.customerEmail || !bookingForm.customerPhone || !bookingForm.pickupDate || !bookingForm.returnDate) {
      setBookingMessage('Please fill in all fields');
      return;
    }

    addBooking(
      car.id,
      car.name,
      bookingForm.customerName,
      bookingForm.customerEmail,
      bookingForm.customerPhone,
      bookingForm.pickupDate,
      bookingForm.returnDate
    );

    setBookingMessage('Booking request sent! Admin will contact you soon.');
    setTimeout(() => {
      setIsBookingModalOpen(false);
      setBookingForm({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        pickupDate: '',
        returnDate: ''
      });
      setBookingMessage('');
    }, 2000);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden">
          <img
            src={car.imageUrl}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                car.isAvailable
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {car.isAvailable ? 'Available' : 'Not Available'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{car.name}</h3>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Fuel className="h-4 w-4" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{car.seatingCapacity} Seats</span>
              </div>
              <div className="flex items-center space-x-1">
                <CarIcon className="h-4 w-4" />
                <span>{car.carType}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <span className="text-3xl font-bold text-blue-600">₹{car.pricePerDay}</span>
              <span className="text-gray-600 text-sm">/day</span>
            </div>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              disabled={!car.isAvailable}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                car.isAvailable
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {car.isAvailable ? 'Book Now' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Book {car.name}</h2>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={bookingForm.customerName}
                  onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={bookingForm.customerEmail}
                  onChange={(e) => setBookingForm({ ...bookingForm, customerEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={bookingForm.customerPhone}
                  onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={bookingForm.pickupDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, pickupDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  value={bookingForm.returnDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, returnDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {bookingMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  bookingMessage.includes('sent')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {bookingMessage}
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
