const express = require('express');
const router = express.Router();
const servey = require('./../controllers/servey');


router.post('/servey_registration', servey.serveRegisration)

module.exports = router;