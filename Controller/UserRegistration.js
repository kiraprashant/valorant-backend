const UserModel = require("../Model/UserModel")
const bcrypt = require('bcrypt');

const AddUserData = async(req,res) =>{
    try{
         
        
        const GetEmail = await UserModel.findOne({Email:req.body.Email})
        const GetGameID = await UserModel.findOne({GameID:req.body.GameID})
        

        console.log(" Email ",GetEmail)
        console.log(req.body.Email)

        if(GetEmail){
            res.status(400).json({
            Success:false,
            msg:"Email Already Exist"
           })

           return false
        }

        if(GetGameID){
            res.status(400).json({
            Success:false,
            msg:"GameID Already Exist"
           })

           return false
        }

        
      
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(req.body.Password, saltRounds);
            console.log("hashedPassword",hashedPassword)

           const AddUser = await UserModel(
            {

                Name:req.body.Name,
                Email:req.body.Email,
                GameID:req.body.GameID,
                MobileNumber:req.body.MobileNumber,
                Password:hashedPassword,

            }
           ).save()
            res.json({
                Success:true,
                msg:"User SuccessFully Register"
               })
        

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
        console.log(req.body)
        const user = await UserModel.findOne({Email:req.body.Email})
        console.log(user)
        if(user){
            const isMatch = await bcrypt.compare(req.body.Password, user.Password);
            if(isMatch){
                res.json({
                    success:true,
                    Msg:"Login Successfull",
                    GameID:user.GameID
                })
            } else {
                res.status(400).json({msg:"invalid Email or password"})
            }
        } else {
            res.status(400).json({msg:"User not found"})
        }
    }
    catch(e){
        res.status(500).json({msg:"Internal Server Error"})
    }
}

const GetSingleProfile =  async(req,res) =>{
    try{
        console.log(req.body)
        const user = await UserModel.findOne({GameID:req.body.GameID}).select("-Password")

        if(user){
            res.json({
                success:true,
                Msg:"Profile Found",
                Profile:user
            })
        }
        else{
            res.json({
                success:false,
                Msg:"Profile Not Found",            })
        }
    }
    catch(e){
      console.log()
      res.status(500).json({msg:"Internal Server Error"})
    }
}

const UpdateSingleProfile = async (req, res) => {
    try {
      const userId = req.body._id;   // /update/:id
  
      // Data coming from React
      const data = {
        Name: req.body.Name,
        Email: req.body.Email,
        GameID: req.body.GameID,
        MobileNumber:req.body.MobileNumber,
        Gender: req.body.Gender,
        Date_of_Brith: req.body.Date_of_Brith,
        Discord_ID: req.body.Discord_ID,
        YouTube_Twitch_Link: req.body.YouTube_Twitch_Link,
        Game_Rank: req.body.Game_Rank,
        Role: req.body.Role,
        Bio: req.body.Bio,
      };

      console.log(req.body.YouTube_Twitch_Link)
  
      // Find and update

      const GamerID = await UserModel.findOne({ 
        GameID: req.body.GameID,
        _id: { $ne: userId } // Ignore own team if updating
      });

      const Email = await UserModel.findOne({ 
        Email: req.body.Email,
        _id: { $ne: userId } // Ignore own team if updating
      });

      if (Email) {
        return res.json({
          success: false,
          msg: "This Email Already in use !"
        });
      }

      if (GamerID) {
        return res.json({
          success: false,
          msg: "This GameID Already in use !"
        });
      }



      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true, runValidators: true, select: "-Password" }
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          msg: "User not found",
        });
      }
  
      res.json({
        success: true,
        msg: "Profile updated successfully",
        profile: updatedUser
      });
  
    } catch (error) {
      console.log("Error updating profile:", error);
      res.status(500).json({
        success: false,
        msg: "Internal server error",
      });
    }
  };

module.exports = {AddUserData,LoginUser,GetSingleProfile,UpdateSingleProfile}