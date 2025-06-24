const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`\n\nServer running on port ${process.env.PORT}\n\n`);
  });
});
