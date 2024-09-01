const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  mobile_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activeSession: {
    type: DataTypes.STRING
  }
});

module.exports = User;