const mongoose = require('mongoose');
const express = require('express');
const home = require('./routes/home');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.log('Fatal Error : Jason Web Token Private Key Is Not Defined');
  process.exit(1);
}

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => {
    console.log('Connected Successfully');
  })
  .catch(error => {
    console.log(`${error} occured in connecting`);
  });

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening On Port ${port}`));
