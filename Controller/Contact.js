const ContactModel = require("../Model/ContactModel")

const AddContactDetail = async(req,res) =>{
    try{
         console.log(req.body)
        const AddContact = await ContactModel(req.body).save()
        res.json({
            success:true,
            msg:"your issiue will be resolved"
        })
     }
    catch(e){
      console.log(e)
    }
}

module.exports =  {AddContactDetail}