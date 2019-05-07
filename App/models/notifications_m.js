const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
   title:{
       type:String,
       trim:true,
       required:true,
   },
   content:{
       type:String,
       required:true
   },
   notify_image:{
       type:String,
       default:''
   }
},
{
    timestamps:true
}
)

const Notifications = mongoose.model('Notifications', notificationsSchema);

module.exports = Notifications