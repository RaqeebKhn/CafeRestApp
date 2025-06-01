const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const tableRoutes = require("./routes/tableRoutes");

const app = express();
const port = 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.BACKEND_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

app.use("/tables", tableRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "CafeRestApp API is running",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});