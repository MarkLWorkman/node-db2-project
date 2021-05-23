const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = () => {
  return db("cars").where({ id }).first("*");
};

const create = async (newCar) => {
  const newCarObject = await db("cars").insert(newCar);
  return getById(newCarObject[0]);
};

module.exports = { getAll, getById, create };
