import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useCars } from '../context/CarContext.jsx';
import CarCard from '../components/CarCard.jsx';

export default function AvailableCars() {
  const { cars } = useCars();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('All');
  const [selectedCarType, setSelectedCarType] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFuelType = selectedFuelType === 'All' || car.fuelType === selectedFuelType;
      const matchesCarType = selectedCarType === 'All' || car.carType === selectedCarType;
      const matchesPrice = car.pricePerDay >= priceRange[0] && car.pricePerDay <= priceRange[1];

      return matchesSearch && matchesFuelType && matchesCarType && matchesPrice;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [cars, searchTerm, selectedFuelType, selectedCarType, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Cars</h1>
          <p className="text-lg text-gray-600">Browse our collection of premium vehicles</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedFuelType}
              onChange={(e) => setSelectedFuelType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <select
              value={selectedCarType}
              onChange={(e) => setSelectedCarType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Car Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}/day
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredAndSortedCars.length}</span> of{' '}
            <span className="font-semibold">{cars.length}</span> cars
          </p>
        </div>

        {filteredAndSortedCars.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No cars match your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
