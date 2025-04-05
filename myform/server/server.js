const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const connectDB = require('./db')
const hii= require('./routes/app.js')
connectDB()
app.use(cors());
app.use(express.json());
app.use("/api",hii)

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});
 
app.listen(PORT, () => {
  console.log(`Server running`);
});
