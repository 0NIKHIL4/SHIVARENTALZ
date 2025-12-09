import { useState } from 'react';
import { Plus, Edit, Trash2, X, Bell, CheckCircle, Clock } from 'lucide-react';
import { useCars } from '../context/CarContext.jsx';
import { useBookings } from '../context/BookingContext.jsx';

export default function AdminDashboard() {
  const { cars, addCar, updateCar, deleteCar } = useCars();
  const { bookings, updateBookingStatus, deleteBooking } = useBookings();
  const [activeTab, setActiveTab] = useState('bookings');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    pricePerDay: 0,
    fuelType: 'Petrol',
    seatingCapacity: 5,
    carType: 'Sedan',
    isAvailable: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      imageUrl: '',
      pricePerDay: 0,
      fuelType: 'Petrol',
      seatingCapacity: 5,
      carType: 'Sedan',
      isAvailable: true
    });
    setEditingCar(null);
  };

  const handleOpenModal = (car) => {
    if (car) {
      setEditingCar(car);
      setFormData({
        name: car.name,
        imageUrl: car.imageUrl,
        pricePerDay: car.pricePerDay,
        fuelType: car.fuelType,
        seatingCapacity: car.seatingCapacity,
        carType: car.carType,
        isAvailable: car.isAvailable
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCar) {
      updateCar(editingCar.id, formData);
    } else {
      addCar(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this car?')) {
      deleteCar(id);
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'Pending');
  const approvedBookings = bookings.filter(b => b.status === 'Approved');
  const rejectedBookings = bookings.filter(b => b.status === 'Rejected');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage inventory and booking requests</p>
          </div>
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Bell className="h-5 w-5" />
            <span>Booking Requests ({pendingBookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('cars')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'cars'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span>Manage Cars</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span>Booking History</span>
          </button>
        </div>

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pending Requests</p>
                    <p className="text-3xl font-bold text-yellow-600">{pendingBookings.length}</p>
                  </div>
                  <Clock className="h-12 w-12 text-yellow-500 opacity-20" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Approved</p>
                    <p className="text-3xl font-bold text-green-600">{approvedBookings.length}</p>
                  </div>
                  <CheckCircle className="h-12 w-12 text-green-500 opacity-20" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Rejected</p>
                    <p className="text-3xl font-bold text-red-600">{rejectedBookings.length}</p>
                  </div>
                  <X className="h-12 w-12 text-red-500 opacity-20" />
                </div>
              </div>
            </div>

            {pendingBookings.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600">No pending booking requests</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Car</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Phone</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Dates</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pendingBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-gray-900">{booking.carName}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
                              <p className="text-xs text-gray-600">{booking.customerEmail}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {booking.customerPhone}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(booking.pickupDate).toLocaleDateString()} to {new Date(booking.returnDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Approved')}
                                className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
                                title="Approve"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Rejected')}
                                className="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
                                title="Reject"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'cars' && (
          <div>
            <div className="flex justify-end mb-8">
              <button
                onClick={() => handleOpenModal()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Car</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Car Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Price/Day</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Fuel</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Seats</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cars.map((car) => (
                      <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{car.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={car.imageUrl}
                              alt={car.name}
                              className="h-12 w-16 object-cover rounded"
                            />
                            <span className="text-sm font-medium text-gray-900">{car.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          ₹{car.pricePerDay}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{car.carType}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{car.fuelType}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{car.seatingCapacity}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              car.isAvailable
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {car.isAvailable ? 'Available' : 'Not Available'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleOpenModal(car)}
                              className="text-blue-600 hover:text-blue-700 transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(car.id)}
                              className="text-red-600 hover:text-red-700 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Car</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Dates</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings
                      .filter(b => b.status !== 'Pending')
                      .map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-gray-900">{booking.carName}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
                              <p className="text-xs text-gray-600">{booking.customerEmail}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(booking.pickupDate).toLocaleDateString()} to {new Date(booking.returnDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                booking.status === 'Approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="text-red-600 hover:text-red-700 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCar ? 'Edit Car' : 'Add New Car'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Day (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.seatingCapacity}
                    onChange={(e) => setFormData({ ...formData, seatingCapacity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Type
                  </label>
                  <select
                    value={formData.carType}
                    onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isAvailable" className="ml-2 text-sm font-medium text-gray-700">
                  Available for rent
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {editingCar ? 'Update Car' : 'Add Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
