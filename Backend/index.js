const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Table = require("./models/Tables");

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
  .then(() => {
    console.log("Connected to MongoDB");
    seedDefaultTables();
  })
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Function to seed default tables if none exist
async function seedDefaultTables() {
  try {
    const count = await Table.countDocuments();
    if (count === 0) {
      console.log("No tables found. Adding 14 default tables...");
      
      // Create 14 default tables
      const defaultTables = Array.from({ length: 14 }, (_, i) => ({
        id: String(i + 1).padStart(2, '0'),
        customers: 0
      }));
      
      await Table.insertMany(defaultTables);
      console.log("Default tables added successfully!");
    } else {
      console.log(`${count} tables already exist in the database.`);
    }
  } catch (error) {
    console.error("Error seeding default tables:", error);
  }
}

// Mount routes with the correct paths
app.use("/api/tables", tableRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "CafeRestApp API is running",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});