const express= require('express')
const router= express.Router()
const axios = require('axios')
const FormData= require('../models/formModel.js')
// const { clearCache } = require('ejs')

router.post("/submit", async (req, res) => {
  // getting ip address
  let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress
  ip="152.58.25.9"
    try {
      const locationRes=await axios.get(`https://ipapi.co/${ip}/json/`)
      const locationData=locationRes.data
    //pick useful fields
    const locationInfo={
      ipAddress: ip,
      city: locationData.city,
      region: locationData.region,
      country: locationData.country_name,
      org: locationData.org,
      latitude:locationData.latitude,
      longitude:locationData.longitude
    }
    console.log("location api response: ",locationRes,locationData)

    //checking if email address already exists
    // const existing=await FormData.findOne({email:req.body.email})
    // if(existing){
    // return res.status(400).json({message:"Email already submitted!"})
    // }
      const { name, email,captchaToken} = req.body
      const secretKey=process.env.secretKey
      const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}` 
      const capresponse=await axios.post(verifyURL)
      const {success,score}=capresponse.data
      if(!success) return res.status(400).json({message:"ReCAPTCHA FAILED"})
      const newEntry = new FormData({ name, email,...locationInfo});
      await newEntry.save()
      res.json({ message: " Data saved to MongoDB!" });
    }
    catch (err){
      console.error("❌ Error during submission:", err.message);
      res.status(500).json({ message: "Failed to save data" });
    }
  })
router.get("/locations",async (req,res)=>{
  try {
    const all = await FormData.find({}, 'name city latitude longitude');
    const filtered = all
      .filter(f => f.latitude && f.longitude)
      .map(f => ({
        name: f.name,
        city: f.city,
        latitude: f.latitude,
        longitude: f.longitude
      }));
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
})  

module.exports=router
