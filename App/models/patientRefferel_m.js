const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const patientRefferelSchema = new Schema({
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
   patient_name:{
      type:String,
      default:'',
  },
  facility_name:{
      type:String,
      default:'',
  },
  room_number : {
      type:String,
      default:'',
  },
  reason:{
      type:String,
      default:'',
  }
},
{
    timestamps: true
}
);

const patientRefferel = mongoose.model('patientRefferel', patientRefferelSchema);

module.exports = patientRefferel;


