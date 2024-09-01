const app = require('./app');
const sequelize = require('./db');
require('dotenv').config();

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});