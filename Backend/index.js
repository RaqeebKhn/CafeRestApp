const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Table = require('./models/Tables');

dotenv.config();

const tableRoutes = require("./routes/tableRoutes");

const app = express();
const port = 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(bodyParser.json());
app.use(express.json());

// Seeder
async function seedDefaultTables() {
  const existingCount = await Table.countDocuments();
  if (existingCount < 14) {
    const tablesToCreate = [];
    for (let i = existingCount + 1; i <= 14; i++) {
      tablesToCreate.push({
        id: i.toString(),
        customers: 0
      });
    }

    await Table.insertMany(tablesToCreate);
    console.log(`${14 - existingCount} default tables inserted.`);
  } else {
    console.log('Default tables already seeded.');
  }
}

// Main setup
async function startServer() {
  try {
    await mongoose.connect(process.env.BACKEND_URI);
    console.log("Connected to MongoDB");

    await seedDefaultTables();
    console.log('Seeding complete.');

    app.use("/tables", tableRoutes);

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "CafeRestApp API is running",
      });
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
  }
}

startServer();