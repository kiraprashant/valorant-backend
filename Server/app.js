const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()
const port = process.env.PORT || 3000 
const ConnectDB = require("../Conn/Conn")
const UserRouter = require("../Routes/UserResgistration")
// const UserModel = require("../Models/UserModel")
const path = require('path')

app.use(cors())
app.use(express.json())

app.get("/", async(req,res)=>{
   res.json("pikachu")
})

app.use("/api/Valorant",UserRouter)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.listen(port,()=>{
    ConnectDB()
    console.log("server listining" , port)
})