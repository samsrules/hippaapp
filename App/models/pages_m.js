const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagesSchema = new Schema({
about :{
    type:String,
    default:'',
},
terms_condition:{
    type:String,
    default:'',
},
},
{
    timestamps:true
}
)

const Pages = mongoose.model('Pages', pagesSchema);
module.exports = Pages;