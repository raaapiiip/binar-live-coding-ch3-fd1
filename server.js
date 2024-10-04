const fs = require("fs");

const express = require("express");
const app = express();

//Middleware Express.js
app.use(express.json());

// Default URL = Health Check
// Default URL untuk health check akan automatic path = "/"
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Application is running",
  });
});

// if(req.url === / "rafif") {} Get URL by name
app.get("/rafif", (req, res) => {
  res.status(200).json({
    message: "Ping Successfully!",
  });
});

// Kaidah REST API => /api/v1/(collection harus jamak +s)
const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/data/cars.json`, "utf-8")
);

//POST cars
app.post("/api/v1/cars", (req, res) => {
  const newCar = req.body;
  cars.push(newCar);

  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "Success",
      message: "Success add new car data",
      isSuccess: true,
      data: { car: newCar }, //Object destructuring
    });
  });
});

//GET cars
app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Success get car list data",
    isSuccess: true,
    totalData: cars.length,
    data: { cars },
  });
});

// GET cars by id
app.get("/api/v1/cars/:id", (req, res) => {
  // Select * from FSW2 where id=1 or name="Yogi"
  const carId = req.params.id;
  console.log(carId);

  const car = cars.find((i) => i.id === carId);

  if (!car) {
    return res.status(404).json({
      status: "Failed",
      message: `Failed get car data from this id: ${carId}`,
      isSuccess: false,
      data: null,
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Success get car data by id",
    isSuccess: true,
    data: {
      car, //Object destructuring
    },
  });
});

// PATCH cars
app.patch("/api/v1/cars/:id", (req, res) => {
  // UPDATE ... from (table) WHERE id=req.params.id
  const id = req.params.id;

  // Object destructuring
  const { name, year, type } = req.body;

  // Find data by id
  const car = cars.find((i) => i.id === id);
  console.log(car);

  // Find index data
  const carIndex = cars.findIndex((car) => car.id === id);
  console.log(carIndex);

  // Update according to request body (Client/Front-end)
  // Object assign = menggunakan object spread operator
  cars[carIndex] = { ...cars[carIndex], ...req.body };

  console.log(cars);

  if (!car) {
    return res.status(404).json({
      status: "Failed",
      message: `Failed get car data from this id: ${carId}`,
      isSuccess: false,
      data: null,
    });
  }

  // Rewrite for data in .json file
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "Success",
      message: "Success to rewrite car data",
      isSuccess: true,
    });
  });
});

// DELETE cars
app.delete("/api/v1/cars/:id", (req, res) => {
  // UPDATE ... from (table) WHERE id=req.params.id
  const id = req.params.id;

  // Find data by id
  const car = cars.find((i) => i.id === id);
  console.log(car);

  // Find index data
  const carIndex = cars.findIndex((car) => car.id === id);
  console.log(carIndex);

  if (!car) {
    return res.status(404).json({
      status: "Failed",
      message: `Failed to delete car data from this id: ${carId}`,
      isSuccess: false,
      data: null,
    });
  }

  // Deleting car data according to index = req.params.id
  cars.splice(carIndex, 1);

  // Rewrite for data in .json file
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "Success",
      message: "Success to delete car data",
      isSuccess: true,
    });
  });
});

// Middleware / Handler = Jembatan antara aplikasi dan sistem operasi (Url khusus yang tidak dapat diakses karena tidak ada di aplikasi)
// app.use digunakan untuk memasang function middleware (our own middleware)
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not exist",
  });
});

app.listen("3000", () => {
  console.log("Application start at port:3000");
});
