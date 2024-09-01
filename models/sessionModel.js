const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./userModel');

const Session = sequelize.define('Session', {
  session: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING
  },
  userAgent: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});

User.hasMany(Session);
Session.belongsTo(User);

module.exports = Session;