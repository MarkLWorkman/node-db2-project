const Cars = require("./cars-model");
const vinValidator = require("vin-validator");
const ExpressError = require("../ExpressError");

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (car) {
      req.car = car;
      next();
    } else {
      next(new ExpressError(`Car with id ${req.params.id} was not found`, 404));
    }
  } catch (error) {
    next(new ExpressErrorrror(error, 500));
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    const body = req.body;
    if (!body.vin) {
      next(new ExpressError(`VIN is missing`, 400));
    } else if (!body.make) {
      next(new ExpressError(`Make is missing`, 400));
    } else if (!body.model) {
      next(new ExpressError(`Model is missing`, 400));
    } else if (!body.mileage) {
      next(new ExpressError(`Mileage is missing`, 400));
    } else if (typeof body.mileage !== "number") {
      next(new ExpressError("Mileage must be a number", 400));
    } else {
      next();
    }
  } catch (error) {
    next(new ExpressError(error, 500));
  }
};

const checkVinNumberValid = (req, res, next) => {
  try {
    const vin = req.body.vin;
    if (vinValidator.validate(vin)) {
      next();
    } else {
      next(new ExpressError(`vin number ${vin} is not valid`, 400));
    }
  } catch (error) {
    next(new ExpressError(error, 500));
  }
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
};
