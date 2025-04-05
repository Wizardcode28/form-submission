const {Schema,model} = require("mongoose");
  
const formSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
      },
      email:{
          type:String,
          required: true,
          maxlength: 50
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });
  
  const formModel = model("FormData", formSchema)
  
module.exports = formModel
