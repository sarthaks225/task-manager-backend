const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const isRender = process.env.DB_HOST && process.env.DB_HOST.includes("render.com");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: isRender
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  }
);

const User = require("./User")(sequelize);
const Task = require("./Task")(sequelize);

User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

module.exports = { sequelize, User, Task };
