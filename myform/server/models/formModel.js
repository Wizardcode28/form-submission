const {Schema,model} = require("mongoose");
  
const formSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim:true
      },
      email:{
          type:String,
          required: true,
          maxlength: 50,
          trim:true
      }
    },{timestamps:true});
  
  const FormModel = model("FormData", formSchema)
  
module.exports = FormModel
