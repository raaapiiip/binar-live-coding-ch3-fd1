const fs = require("fs");
const express = require("express");

const app = express();

//Middleware Express.js
app.use(express.json());

// Default URL = Health Check
// Default URL untuk health check akan automatic path = "/"
app.get("/health-check", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Application is running",
  });
});

// if(req.url === / "rafif") {}
app.get("/rafif", (req, res) => {
  res.status(200).json({
    message: "Ping Succesfully!",
  });
});

// Kaidah REST API => /api/v1/(collection)
const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/data/cars.json`, "utf-8")
);

//GET cars
app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({
    status: "Succes",
    message: "Succes get car list data!",
    isSuccess: true,
    totalData: cars.length,
    data: { cars },
  });
});

//POST cars
app.post("/api/v1/cars", (req, res) => {
  const newCar = req.body;
  cars.push(newCar);
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "Succes",
      message: "Succes add new car data!",
      isSuccess: true,
      data: { car: newCar },
    });
  });
});

// Middleware / Handler = Jembatan antara aplikasi dan sistem operasi (Url khusus yang tidak dapat diakses karena tidak ada di aplikasi)
// app.use digunakan untuk memasang function middleware (our own middleware)
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not exist!",
  });
});

app.listen("3000", () => {
  console.log("Application start at port:3000");
});
