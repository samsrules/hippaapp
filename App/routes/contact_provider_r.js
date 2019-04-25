
const express = require('express');
const router = express.Router();
const multer = require('multer');
var {authenticate} = require('./../middleware/authenticate'); 
const provider = require('../controllers/contactProvider');


//router.post('conatctprovider', provider.contactProvider )
router.get('/contactprovider',authenticate, provider.contactProvider);
module.exports = router;