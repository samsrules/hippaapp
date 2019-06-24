
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
          console.log(file.mimetype);
          
          cb(null, Date.now() + '-' + file.originalname )
        } else if(file.mimetype === 'application/pdf'){
            cb(null, Date.now() + '-' + file.originalname)
        }
    }
});
var upload = multer({storage: storage});

router.post('/signin', admin.adminSignIn)

router.get('/user_profile/:id', admin.userProfile);

router.get('/get_pateint',admin.getRefferelPatient);

router.get('/patient_dose',admin.getPatientDose);

router.post('/patient_dose_save',admin.patientDose);

router.patch('/patient_dose/:id', admin.patientDoseUpdate)

router.delete('/patient_dose/:id', admin.patientDoseDelete)



router.get('/contact_providers',admin.contactProviders);



router.post('/survey_registration',admin.surveyRegistration);

router.get('/get_servey',admin.getServey);

router.post('/notification_save', upload.single('notify_image'), admin.notificationSave)

var cpUpload = upload.fields([{ name: 'profilePic', maxCount: 1 }])
router.post('/contact_add', upload.single('profilePic'), admin.contactAdd)

/*router.post('/contact_add', cpUpload, 
function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})*/
router.get('/get_all_videos',admin.getVideos);

router.post('/video_add', admin.videoSave);

router.delete('/delete_video/:id', admin.delteVideo);

router.patch('/video_update/:id', admin.videoUpdate)



router.put('/survey_update/:id', admin.surveyUpdate);

router.delete('/survey_delete/:id', admin.deleteServey);

router.delete('/contact_delete/:id', admin.contactDelete);

router.put('/contact_update/:id',upload.single('profilePic'), admin.contactUpdate);

router.get('/notification_list', admin.getNotification);

router.post('/send_all', admin.sendMessageToAll);

router.post('/send_to', admin.sendMessageTo);



router.post('/pages', admin.addPages);

router.get('/get_pages', admin.getPages);

router.post('/email_check', admin.duplicateEmail);


module.exports = router;