const express= require('express')

const app = express();

app.get("/", (req,res)=>{
  res.send("Welcome to my shop");
})

app.get("/about", (req,res)=>{
  res.send("Welcome to about page");
})

app. listen(5000,()=>{
  console.log("Server is running on port 5000");
})