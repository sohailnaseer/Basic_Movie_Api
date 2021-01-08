const express = require('express');
const router = express();

router.get('/', (req, res) => {
  res.send('Welcome To Our Website Vidly!!!');
});

module.exports = router;
