import { Search, Clock, Shield, Award } from 'lucide-react';

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div
        className="relative bg-cover bg-center h-[600px] flex items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Find Your Perfect Ride
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Choose from our wide selection of premium vehicles for your next adventure
          </p>
          <button
            onClick={() => onNavigate('cars')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Browse Available Cars</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SPIN RENTALS?</h2>
          <p className="text-lg text-gray-600">Experience the best car rental service with unmatched benefits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Service</h3>
            <p className="text-gray-600">
              Book and pick up your vehicle anytime, day or night. We're always here for you.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fully Insured</h3>
            <p className="text-gray-600">
              Drive with confidence knowing all our vehicles come with comprehensive insurance coverage.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Fleet</h3>
            <p className="text-gray-600">
              Access a wide range of well-maintained, modern vehicles to suit every need and budget.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Hit the Road?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse our collection and find the perfect car for your journey
          </p>
          <button
            onClick={() => onNavigate('cars')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View All Cars
          </button>
        </div>
      </div>
    </div>
  );
}
