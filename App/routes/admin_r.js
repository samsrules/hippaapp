
const express = require('express');
const router = express.Router();
const {authenticate } = require('../middleware/authenticate')
const admin = require('../controllers/admin');

const multer = require('multer');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        {
          cb(null, Date.now() + '-' + file.originalname )
        } else if(file.mimetype === 'application/pdf'){
            cb(null, Date.now() + '-' + file.originalname)
        }
    }
});
var upload = multer({storage: storage});


router.get('/get_pateint',admin.getRefferelPatient);

router.get('/contact_providers',admin.contactProviders);

router.get('/get_all_videos',admin.getVideos);

router.post('/survey_registration',admin.surveyRegistration);

router.get('/get_servey',admin.getServey);

router.post('/notification_save', upload.single('notify_image'), admin.notificationSave)

router.post('/contact_add', upload.single('profilePic'), admin.contactAdd)




module.exports = router;