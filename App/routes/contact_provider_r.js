
const express = require('express');
const router = express.Router();
const multer = require('multer');
var {authenticate} = require('./../middleware/authenticate'); 
const provider = require('../controllers/contactProvider');


//router.post('conatctprovider', provider.contactProvider )
router.post('/contactprovider',authenticate, provider.contactProvider);

router.post('/invite_calling',authenticate, provider.inviteCalling);

router.post('/reject_calling',authenticate, provider.rejectCalling);

module.exports = router;