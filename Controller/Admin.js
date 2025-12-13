const ContactModel = require("../Model/ContactModel")
const UserModel = require("../Model/UserModel")
const TeamModel = require("../Model/ParticapateModel")
const AdminModel = require("../Model/AdminLoginModel")

const AdminLogin = async(req,res) =>{
  try{
    console.log(req.body)
    const { Username, Password } = req.body;

    const user = await AdminModel.findOne({Email:Username})
    console.log(user)

    if(user){
        if(user.Password === Password){
            res.json({
                success:true,
                msg:"Admin Login Successfull",
                Username:user
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


const ContactGetDetails = async(req,res) =>{
    try {
        const Contact = await ContactModel.find();
    
        if (!Contact || Contact.length === 0) {
          return res.status(200).json({
            success: false,
            msg: "No Complain found",
          });
        }
    
        res.status(200).json({
          success: true,
          msg: "Complain Found",
          total: Contact.length,
          data: Contact,
        });
    
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          msg: "Something went wrong",
        });
      }
}

const UserGetDetails = async(req,res) =>{
    try {
        const Users = await UserModel.find();
    
        if (!Users || Users.length === 0) {
          return res.status(200).json({
            success: false,
            msg: "No Users found",
          });
        }
    
        res.status(200).json({
          success: true,
          msg: "Total Users Found",
          total: Users.length,
          data: Users,
        });
    
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          msg: "Something went wrong",
        });
      }

      
}

const TeamGetDetails = async(req,res) =>{
    try {
        const Teams = await TeamModel.find();
    
        if (!Teams || Teams.length === 0) {
          return res.status(200).json({
            success: false,
            msg: "No Teams found",
          });
        }
    
        res.status(200).json({
          success: true,
          msg: "Total Teams Found",
          total: Teams.length,
          data: Teams,
        });
    
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          msg: "Something went wrong",
        });
      }}



      const AdminDashboard = async(req,res) =>{

        try{
          const Users = await UserModel.find();
          const Teams = await TeamModel.find();
          const Contact = await ContactModel.find();

          res.status(200).json({
            success: true,
            msg: "Total Dashbord collection",
            data : [
              {
                key: "Users",
                label: "Total User",
                value: Users.length
              },
              {
                key: "Teams",
                label: "Total Team",
                value: Teams.length
              },
              {
                key: "Contact",
                label: "Total Issue",
                value: Contact.length
              },
              {
                key: "Tournament",
                label: "Total Tournament Host",
                value: 15
              }
            ]
           
          });
        }
        catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            msg: "Something went wrong",
          });
        }}

        const ContactSingleDetails = async (req, res) => {
          try {
            const { id } = req.params;       // contact ID
           // new status value
        
            // Update only status
            const SingleContact = await ContactModel.findByIdAndUpdate(id);
        
            if (!SingleContact) {
              return res.status(404).json({
                success: false,
                msg: "Contact not found",
              });
            }
        
            return res.json({
              success: true,
              msg: "Status updated successfully",
              data: SingleContact,
            });
          } catch (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              msg: "Server error while updating status",
            });
          }
        };

        const UpdateContactStatus = async (req, res) => {
          try {
            const { id } = req.params;       // contact ID
           // new status value
        
            // Update only status
            const updatedContact = await ContactModel.findByIdAndUpdate(
              id,
              { Status: req.body.Status },
              { new: true }
            );
        
            if (!updatedContact) {
              return res.status(404).json({
                success: false,
                msg: "Contact not found",
              });
            }
        
            return res.json({
              success: true,
              msg: "Status updated successfully",
              data: updatedContact,
            });
          } catch (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              msg: "Server error while updating status",
            });
          }
        };


module.exports =  {AdminLogin,ContactGetDetails,TeamGetDetails,UserGetDetails,AdminDashboard,UpdateContactStatus,ContactSingleDetails}