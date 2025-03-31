const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()
const port = process.env.PORT || 3000 
const ConnectDB = require("../Conn/Conn")
const UserRouter = require("../Routes/UserResgistration")
// const UserModel = require("../Models/UserModel")

app.use(cors())
app.use(express.json())

app.get("/", async(req,res)=>{
   res.json("pikachu")
})

app.use("/api/Users",UserRouter)



app.listen(port,()=>{
    ConnectDB()
    console.log("server listining" , port)
})