const express = require("express")
const cors = require("cors")
const app = express()
const rateLimit=require("express-rate-limit")
app.set('trust proxy', true)//Required for getting correct IP on Render/Vercel
const PORT = 5000
const connectDB = require('./db')
const hii= require('./routes/app.js')
const limiter=rateLimit({
  windowMs:1*60*1000,// 1 minute,
  max:500,//limit each IP to 5requests per min
  message:{
    status:429,
    error:"Too many requests. Please try again after a minute."
  }
})

// Connect to MongoDB first
connectDB()

// Middlewares
app.use(cors())//allows all requests
app.use(express.json())

// Add Rate Limiting
app.use(limiter)

// Routes
app.use("/api",hii)

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" })
  // res.send- even html and json
});
 
app.listen(PORT, () => {
  console.log(`Server running`);
});
