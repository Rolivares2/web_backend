const dotenv = require('dotenv');
const app = require('./app');
const db = require('./models');

dotenv.config();

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Error starting server:', err);
      }
      console.log(`server is running at http://localhost:${PORT}`);
      return app;
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
