const User = require("../models/user");
const Car = require("../models/car");

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.value.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const newUser = req.value.body;
    await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  updateUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const newUser = req.value.body;
    await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  getUserCars: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate("cars");
    res.status(200).json(user.cars);
  },

  addUserCars: async (req, res, next) => {
    const { userId } = req.value.params;
    // Create a new car
    const newCar = new Car(req.value.body);
    // Get user
    const user = await User.findById(userId);
    // Assign user as a car's seller
    newCar.seller = user;
    // Save the car
    await newCar.save();
    // Add car to the user's selling array
    user.cars.push(newCar);
    // Save the user
    await user.save();
    res.status(201).json(newCar);
  }
};
