const express = require("express")
const cors = require("cors")
const app = express()
app.set('trust proxy', true)//Required for getting correct IP on Render/Vercel
const PORT = 5000
const connectDB = require('./db')
const hii= require('./routes/app.js')
connectDB()
app.use(cors())//allows all requests
app.use(express.json())
app.use("/api",hii)

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" })
  // res.send- even html and json
});
 
app.listen(PORT, () => {
  console.log(`Server running`);
});
