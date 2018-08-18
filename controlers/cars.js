const Car = require("../models/car");
const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    // Get all cars
    const cars = await Car.find({});
    res.status(200).json(cars);
  },

  newCar: async (req, res, next) => {
    // Find the seller
    const seller = await User.findById(req.value.body.seller);
    // Create a new car
    const newCar = req.value.body;
    delete newCar.seller;
    const car = new Car(newCar);
    car.seller = seller;
    await car.save();
    // Add created car to the seller
    seller.cars.push(car);
    await seller.save();
    res.status(200).json(car);
  },

  getCar: async (req, res, next) => {
    const car = await Car.findById(req.value.params.carId);
    res.status(200).json(car);
  },

  replaceCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    const result = await Car.findByIdAndUpdate(carId, newCar);
    res.status(200).json({ success: true });
  },

  updateCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    const result = await Car.findByIdAndUpdate(carId, newCar);
    res.status(200).json({ success: true });
  },

  deleteCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: "Car doesn't exist" });
    }
    const sellerId = car.seller;
    const seller = await User.findById(sellerId);
    // Remove the car
    await car.remove();
    // Remove car from seller's selling list
    seller.cars.pull(car);
    await seller.save();
    res.status(200).json({ success: true });
  }
};
