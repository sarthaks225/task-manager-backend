const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM("To Do", "In Progress", "Done"),
      defaultValue: "To Do",
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    timestamps: false
  });
};