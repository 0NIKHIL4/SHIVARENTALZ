import { useState } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import { CarProvider } from './context/CarContext.jsx';
import { BookingProvider } from './context/BookingContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import AvailableCars from './pages/AvailableCars.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'cars':
        return <AvailableCars />;
      case 'contact':
        return <Contact />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CarProvider>
        <BookingProvider>
          <div className="min-h-screen bg-gray-50">
            {currentPage !== 'login' && (
              <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
            )}
            {renderPage()}
          </div>
        </BookingProvider>
      </CarProvider>
    </AuthProvider>
  );
}

export default App;
