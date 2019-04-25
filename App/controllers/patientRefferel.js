const patientRefferel = require('./../models/patientRefferel_m');


module.exports = {
    refferelRegistration :  async (req, res) =>{
        
        if(req.body.patient_name &&     req.body.facility_name) {
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
        
    }
}