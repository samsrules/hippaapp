const User = require('../models/userModel');
_ = require('lodash'),
fs = require('fs'),
helper =  require('../helper/helper');

const {sendNotifications} = require('./../services/sendmail');

module.exports ={

    contactProvider : async (req, res) => {
        let contacts='';
        let providerstatus = await helper.providerStatus(req.body.provider_status);

         if(req.body.provider_status) {
         	console.log(req.body.provider_status)
            contacts = await User.find({type:1,providerStatus:req.body.provider_status}).sort( { createdAt: -1 } )
           
            let ContactData = [];
                contacts.forEach(ro=>{
                    ContactData.push({
                        _id:ro._id,
                        phoneNumber:ro.phoneNumber,
                        specialist:ro.specialist,
                        firstName:ro.firstName,
                        lastName:ro.lastName,
                        providerStatus:ro.providerStatus,
                        userStatus:ro.userStatus,
                        profilePic:process.env.UPLOADURL+ro.profilePic,
                        deviceToken:ro.deviceToken,
                        type:ro.type,
                        email:ro.email
                    });
                })
                if(contacts.length>0) {
                    res.json({status:1,message:"All "+providerstatus+" Contact Provider",payload:ContactData});
                } else {
                    res.json({status:0,message:"Contcts Not found",payload:ContactData});
                }
         } else {
             res.json({status:0,message:"Missing parameters!!!"})
         }
          
    },

    
    inviteCalling: async (req, res) =>{
        
        let datas = {
            firstName:req.user.firstName,
            lastName:req.user.lastName,
            deviceToken:req.user.deviceToken,
            profilePic: process.env.UPLOADURL+req.user.profilePic,
            user_id:req.user._id,
            notification_type:2
        }

         const callee_id=req.body.callee_id;
         let userInfo = await User.findOne({_id:callee_id});
       
       const alert_message=req.body.alert_message;
       var title=req.body.title;
       var fcm_token=userInfo.deviceToken;

       sendNotifications(fcm_token, alert_message, title, datas).then(function(result){
           res.json({success:true})
       })
       .catch(function(err){
           res.json({success:false})
       })
       
       },

     rejectCalling :  async (req, res) =>{

        let datas = {
            firstName:req.user.firstName,
            lastName:req.user.lastName,
            deviceToken:req.user.deviceToken,
            profilePic: process.env.UPLOADURL+req.user.profilePic,
            notification_type:3
        }
        
       const fcm_token=req.body.token;
       const alert_message=req.body.alert_message;
       var title=req.body.title;

        sendNotifications(fcm_token, alert_message, title, datas).then(function(result){
            res.json({success:true})
        })
        .catch(function(err){
            res.json({success:false})
        })          
     
      }
    
    }

    