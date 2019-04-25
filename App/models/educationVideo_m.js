const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  video_title:{
      type:String,
      default:'',
  },
  video_description:{
      type:String,
      default:'',
  },
  video_id:{
      type:String,
      default:''
  },
  video_url:{
      type:String,
      required:true,
  },
  status:{
      type:Number,
      default:1
  }
},
{
 timestamp:true
}

);

const educationVideo = mongoose.model('educationVideo',videoSchema);
module.exports = educationVideo;