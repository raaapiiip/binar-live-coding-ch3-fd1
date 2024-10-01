const fs = require("fs")
const express = require("express")

const app = express();

// Default URL = Health Check
// Default URL untuk health check akan automatic path = "/"
app.get("/health-check", (req, res) => {
    res.status(200).json({
        "status": "Success",
        "message": "Application is running"
    })
})

// if(req.url === / "rafif") {}
app.get("/rafif", (req, res) => {
    res.status(200).json({
        "message": "Ping Succesfully!"
    })
})

// Middleware / Handler = Jembatan antara aplikasi dan sistem operasi (Url khusus yang tidak dapat diakses karena tidak ada di aplikasi)
// app.use digunakan untuk memasang function middleware (our own middleware)
app.use((req, res, next) => {
    res.status(404).json ({
        "status": "Failed",
        "message": "API not exist!"
    })
})

app.listen("3000", () => {
    console.log("Application start at port:3000")
})