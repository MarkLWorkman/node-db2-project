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
  // DO YOUR MAGIC
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};
