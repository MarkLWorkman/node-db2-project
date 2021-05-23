const cars = require("./cars-model");
const vinValidator = require("vin-validator");
const Error = require("../Error");

const checkCarId = async (req, res, next) => {
  try {
    const car = await cars.getById(req.params.id);
    if (car) {
      req.car = car;
      next();
    } else {
      next(new Error(`Car with id ${req.params.id} was not found`, 404));
    }
  } catch (error) {
    next(new Error(error, 500));
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    const body = req.body;
    if (!body.vin) {
      next(new Error(`VIN is missing`, 400));
    } else if (!body.make) {
      next(new Error(`Make is missing`, 400));
    } else if (!body.model) {
      next(new Error(`Model is missing`, 400));
    } else if (!body.mileage) {
      next(new Error(`Mileage is missing`, 400));
    } else if (typeof body.mileage !== "number") {
      next(new Error("Mileage must be a number", 400));
    } else {
      next();
    }
  } catch (error) {
    next(new Error(error, 500));
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};
