const router = require("express").Router();

const Cars = require("./cars-model");
const middleware = require("./cars-middleware");
const ExpressError = require("../ExpressError");

router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll("cars");
    res.status(200).json(cars);
  } catch (error) {
    next(new ExpressError("Error getting cars: " + error.message, 500));
  }
});

router.get("/:id", middleware.checkCarId, (req, res, next) => {
  try {
    res.status(200).json(req.car);
  } catch (error) {
    next(new ExpressError("Error getting car: " + error.message, 500));
  }
});

router.post(
  "/",
  middleware.checkCarPayload,
  middleware.checkVinNumberValid,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);
      res.status(200).json(req.body);
    } catch (error) {
      next(new ExpressError("Error creating car: " + error.message, 500));
    }
  }
);

router.use((error, req, res) => {
  console.log("error", error);
  res
    .status(error.statusCode || 500)
    .json({ message: error.message, error: error });
});

module.exports = router;
