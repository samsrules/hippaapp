const patientRefferel = require('./../models/patientRefferel_m');

const User = require('../models/userModel');

const educationVideo = require('./../models/educationVideo_m');

const Servey = require('./../models/survey_m');

const Notifications = require('../models/notifications_m');

var youtubeThumbnail = require('youtube-thumbnail');


module.exports = {
    refferelRegistration :  async (req, res) =>{
        
        if(req.body.patient_name && req.body.facility_name) {
            let refferelDetails = {
                patient_name:req.body.patient_name,
                facility_name:req.body.facility_name,
                room_number:req.body.room_number,
                reason:req.body.reason,
                user_id:req.body.user_id
            }
            var refferel = new patientRefferel(refferelDetails);
    
            refferel.save(function(err, result){
                if(err){
                    res.json({status:0,message:'Oops Something went wrong', err});
                } else {
                    res.json({status:1,message:'Patient Added Succesfully'})
                }
            })
        } else {
             res.json({status:0,message:'Missing parameters!!!'})
        }
        
    },

    getRefferelPatient :  async (req, res) =>{
        
        let pateint = await patientRefferel.find({});
        if(pateint) {
            res.json({status:1,message:'Result Found',payload:pateint});
        } else {
            res.json({status:0,message:'Result Not Found',payload:pateint});
        }
    },

    contactProviders : async (req, res) =>{

        // let providers = await User.find({type:1});
        let providers = await User.aggregate().match({type:1})
          .project({
        fieldExists:{$cond:[{$eq:["$profilePic", null]}, false, true]},
        abouFiels:{$cond:[{$eq:["$about", null]}, false, true]},
        profilePic:{
        $concat: [process.env.UPLOADURL,'',"$profilePic"]
        },
            firstName:"$firstName",
            lastName:"$lastName",
            email:"$email",
            deviceToken:"$deviceToken",
            type:"$type",
            specialist:"$specialist",
            about:"$about",
            credentials:"$credentials",
            userStatus:"$userStatus",
            createdAt:"$createdAt",
        })
       

        if(providers) {
            res.json({status:1,message:'Result Found',payload:providers});
        } else {
            res.json({status:0,message:'Result Not Found',payload:providers});
        }
    },

    getVideos : async (req, res) =>{
     
        let getVideos = await educationVideo.find({});
         if(getVideos) {
             res.json({status:1, message:'All Education Videos', payload:getVideos});
         } else {
             res.json({status:0, message:'Results not found.'})
         }
   },

   surveyRegistration : async (req, res) =>{
  
    var sendRe = {
        servey_title:req.body.servey_title,
        servey_link:req.body.servey_link
    }  
      
        if(req.body.servey_title && req.body.servey_link) {
           
            let ser = new Servey(sendRe)

            ser.save(function(err,result){
               if(err){
                   res.json({status:0, message:'Oops Something went wrong.',err})
               }

               res.json({status:1, message:'Survery Saved Successfully',payload:result})
            })
        } else {
            res.json({status:0, message:'Missing Parameters!!!'})
        }
   },

   getServey : async (req, res) =>{
  
    let getServeys = await Servey.find({});
    
         if(getServeys) {
             res.json({status:1, message:'All Survey List', payload:getServeys});
         } else {
             res.json({status:0, message:'Results not found.'})
         }
   },

   notificationSave: async (req, res) =>{
        let datatoSend = {
            title:req.body.title,
            content:req.body.content,
            notify_image:req.file.filename
        }

        let notification = new Notifications(datatoSend);

        notification.save(function(err, result){
            if(err){
                res.json({status:0, message:'Oops Something went wrong.'});
            }
            if(req.file.filename) {
             result.notify_image =process.env.UPLOADURL+result.notify_image
            }
            
            res.json({status:1, message:'Notification Sent Succesfully.',payload:result})
        })
   },

   contactAdd: async (req, res)=>{

    if(req.body.email) {
    
        bcrypt.hash(req.body.password.toString(), 10, function(err, hash) {
          if (err) throw err;
      
          else{
      
            if(req.file){
              console.log(req.file)
               fileName = req.file.filename;
            }
          
            let contactDetails = {
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              phoneNumber:req.body.phoneNumber,
              email:req.body.email,
              about:req.body.about,
              password:hash,
              type:1,
              providerStatus:req.body.providerStatus,
              userStatus:1,
              specialist:req.body.specialist,
              profilePic:fileName
            }
          
       
        
            let user = new User(contactDetails);
                
        
            user.save(function(err,result){  
              if(err){
               if (err.name === 'MongoError' && err.code === 11000){
                 return res.json({message:"This Email already exist. Please try with different Email.",status:0});
                }
              } else {
               if(result._id){
                try{
                  var token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
                  result.user_token = token;
                  result.profilePic = process.env.UPLOADURL+result.profilePic;     
                  result.save().then(() => {});
                  res.json({status:1,message:'Contact Provider Register successfully.',payload:result})
                  
                } catch(err) {
                  res.status(203).send({ status: 0, message:"Oops Something went wrong.", description:err });
                }
                
               } else {
                 res.json({ status: 0, message:"Error" });
               }
              }
            });
      
          }
          
        });
      } else {
        res.json({status:0,message:'Missing Parameters.'})
      }
   }

}