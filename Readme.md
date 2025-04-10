# Commands
mkdir myform  
cd myform  
npm create vite@latest client -- --template react  
cd client  
npm install  
cd ..  
mkdir server  
cd server  
npm init -y  
npm install express mongoose nodemon dotenv cors  

# CORS
cors-cross origin resource sharing
browser security mechanism that prevents one origin(domain) from accessing resources from another origin(domain) unless server allows it.
it'there to protect users from potentially malicious websites accessing data from other sites  

# Create file server.js inside server/
package.json-scripts-dev-nodemon server.js  
const express=require('express')  
const app=express()  
const cors=require('cors)  
const PORT=5000  

app.use(cors()) // allows all origins  
app.use(express.json()) // middleware-to parse   JSON Data  

app.get("/",(req,res)=>{  
<!-- res.send("hello how are you") -->  
res.json({message:"hello how are you"})      
})  

app.listen(PORT,()=>{  
    console.log("server is running")  
})  

# Connect Frontend to Backend  
in react-vite app fetch data from backend-App.jsx  

# Run both Servers separately  
run two terminals both- npm run dev  
# Run both together  
npm init -y  
npm install concurrently --save-dev  
in package.json replace  
"scripts": {  
  "client": "cd client && npm run dev",  
  "server": "cd server && npm run dev",  
  "dev": "concurrently \"npm run server\" \"npm   run client\""  
}  

# server/server.js(only for now)  
app.post("/", (req, res) => {  
  const { name, email } = req.body;  
  console.log("Form data received:", name, email);  
  res.json({ message: "Form submitted   successfully!" });  
})  

# client/src/App.jsx  


# .env  
MONGODB_URL=""  
# server/db.js  
const mongoose=require('mongoose')  
const dotenv=require('dotenv')  
dotenv.config()
  
const connectDB=async()=>{  
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Connected")
    }
    catch(err){
        console.log(err.message)
        process.exit(1) // very important
    }
}
module.exports=connectDB

# models/formModel.js
const {Schema,model}=require("mongoose")
const formSchema=new Schema({
    name:{
        type:String,
        required:true,
        maxlength:50,
        trim:true //whitespaces
    },
    email:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
    }
},{timestamps:true}) //created and updated at
const FormModel=model("FormData",formSchema)
module.exports=FormModel

# routes/app.js
const express=require("express")
const router=express.Router()
const FormData=require('../models/formModel.js')
router.POST("/submit",async(req,res)=>{
    try{
        const {name,email}=req.body
        const newEntry=new FormData({name,email})
        await newEntry.save()
        req.json({message:"Data saved to MongoDB!"})
    }
    catch(err){
        console.error("error saving data":err)
    }
})
module.exports=router

# server/server.js Update
express,app,cors,port  
const connectDB=require('./db')  
const hii=require('./routes/app.js')  
connectDB() //before anything else  
app.use(cors()) // allow frontend to access   backend first  
app.use(express.json())  
//middleware order matters- Parse JSON Body  
app.use("/api",hii) // routes  
app.get and app.listen  

# Create .gitignore
//Ignore server env & dependencies
server/.env
server/node_modules/

//Optional: frontend node_modules (if not already ignored in client/.gitignore)
client/node_modules/

//Optional: ignore builds
dist/
build/

//Optional: system files
.DS_Store

# MongoDB Atlas
you can Allow access from anywhere by saving IP Address: 0.0.0.0/0

# Deploy Backend to Render
Click-New Web Servive
Choose repo
set root path to myform/server
fill form:
name:form-backend
build command: npm install
start command: npm run dev
environment: Node
environment variable:add MONGODB_URL(since it was not added to github)
deploy, URL like https://form-backend.onrender.com

# Update Frontend Fetch URl
on github
const res = await fetch("https://form-backend.onrender.com/api/submit", ...)
you can use .env file for URL also
commit changes
on Render
Manual deploy-after commiting changes

# Deploy to Vercel
import repo form-submission
project root-myform/client
deploy

# Error Fixing
we did use cors()-allowing all origins, Render sometimes blocks this by default or doesn't send correct CORS headers unless you explicitly allow frontend domain
change this line-app.use(cors()) to
only accept request from vercel frontend
app.use(cors({
    origin:"https://form-submission-pink.vercel.app", // your deployed Vercel frontend,
    methods:["GET',"POST"],
    credentials=true
}))

commit changes
manual deploy on Render again 

# React-Hook-Form
npm install react-hook-form  
in App.jsx, import {useForm} from "react-hook-form"
 







