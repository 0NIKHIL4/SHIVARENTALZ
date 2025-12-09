import { Car, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar({ currentPage, onNavigate }) {
  const { isAdmin, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SPIN CAR RENTALS</span>
          </div>

          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('cars')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'cars' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Available Cars
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </button>

            {isAdmin ? (
              <>
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === 'admin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Admin Dashboard
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
