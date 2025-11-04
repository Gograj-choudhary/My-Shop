const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  // adminId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin',
  },
}, {
  tableName: 'admins',
  timestamps: true, 
});

module.exports = Admin;