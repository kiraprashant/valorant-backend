const UserModel = require("../Model/UserModel")
const bcrypt = require('bcrypt');

const AddUserData = async(req,res) =>{
    try{
         
        
        const GetEmail = await UserModel.findOne({Email:req.body.Email})
        

        console.log(" Email ",GetEmail)
        console.log(req.body.Email)

        if(GetEmail){
           res.json({
            Success:false,
            msg:"UserName Already Exist"
           })
        }
        else{
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(req.body.Password, saltRounds);
            console.log("hashedPassword",hashedPassword)

           const AddUser = await UserModel(
            {
                Email:req.body.Email,
                MobileNumber:req.body.MobileNumber,
                Password:hashedPassword,

            }
           ).save()
            res.json({
                Success:true,
                msg:"User SuccessFully Register"
               })
        }

    }
    catch(e){
       console.log(e)
       res.status(400).json({
        Success:false,
        msg:"User Resgistration Failed 123"
       })
    }

}

const LoginUser =  async(req,res) =>{
    try{
        const user = await UserModel.findOne({Email:req.body.Email})
        console.log(user)
        if(user){
            const isMatch = await bcrypt.compare(req.body.Password, user.Password);
            if(isMatch){
                res.json({
                    success:true,
                    Msg:"Login Successfull",
                })
            } else {
                res.status(401).json({message:"invalid Email or password"})
            }
        } else {
            res.status(401).json({message:"User not found"})
        }
    }
    catch(e){
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = {AddUserData,LoginUser}