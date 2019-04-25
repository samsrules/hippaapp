const express = require('express');
const router = express.Router();
const multer = express('multer');

var {authenticate} = require('../middleware/authenticate');

const patient = require('../controllers/patientRefferel');
 
router.post('/patient_refferel',authenticate, patient.refferelRegistration);

module.exports = router;