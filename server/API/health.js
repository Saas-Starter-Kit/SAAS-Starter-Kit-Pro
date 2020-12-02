var express = require('express');
var router = express.Router();

router.get('/health', (req, res) => {
  res.send('All ok');
});

module.exports = router;
