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
          trim:true,
          unique:true
      },
      // password:{
      //   type:Number,
      // },
      // field:{
      //   type:String,
      //   default:""
      // },
      ipAddress: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      region: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "",
      },
      org: {
        type: String,
        default: "",
      },
      latitude: {
        type: Number,
        default: null,
      },
      longitude: {
        type: Number,
        default: null,
      },

    },{timestamps:true});
  
  const FormModel = model("FormData", formSchema)
  
module.exports = FormModel
