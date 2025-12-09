import { createContext, useContext, useState } from 'react';
import { initialCars } from '../data/mockCars.js';

const CarContext = createContext(undefined);

export function CarProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem('cars');
    return saved ? JSON.parse(saved) : initialCars;
  });

  const saveCars = (updatedCars) => {
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  const addCar = (carData) => {
    const newCar = {
      id: Date.now().toString(),
      name: carData.name,
      imageUrl: carData.imageUrl,
      pricePerDay: carData.pricePerDay,
      fuelType: carData.fuelType,
      seatingCapacity: carData.seatingCapacity,
      carType: carData.carType,
      isAvailable: carData.isAvailable
    };
    saveCars([...cars, newCar]);
  };

  const updateCar = (id, carData) => {
    const updatedCars = cars.map(car =>
      car.id === id
        ? {
            ...car,
            name: carData.name,
            imageUrl: carData.imageUrl,
            pricePerDay: carData.pricePerDay,
            fuelType: carData.fuelType,
            seatingCapacity: carData.seatingCapacity,
            carType: carData.carType,
            isAvailable: carData.isAvailable
          }
        : car
    );
    saveCars(updatedCars);
  };

  const deleteCar = (id) => {
    saveCars(cars.filter(car => car.id !== id));
  };

  return (
    <CarContext.Provider value={{ cars, addCar, updateCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within CarProvider');
  }
  return context;
}
