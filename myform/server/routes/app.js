const express= require('express')
const router= express.Router()
const FormData= require('../models/formModel.js')

router.post("/submit", async (req, res) => {
    try {
      const { name, email } = req.body;
      const newEntry = new FormData({ name, email });
      await newEntry.save();
      res.json({ message: " Data saved to MongoDB!" });
    }
    catch (err){
      console.error("Error saving data:", err);
      res.status(500).json({ message: "Failed to save data" });
    }
  })

module.exports=router
