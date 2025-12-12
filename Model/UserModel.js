const mongoose = require("mongoose");
const moment = require("moment")

const currentDate = moment().format("DD-MM-YY");
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    Email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
    },
    GameID: {
        type: String,
        required: [true, "GameID is required"],
        trim: true,
    },
    Password: {
        type: String,
        required: [true, "Password is required"],
    },
    MobileNumber: {
        type: String,
        required: [true, "Mobile number is required"],
    },
    Gender: {
        type: String,
        default:""
    },
    Date_of_Brith: { type: Date }, // note: stored as Date (fix spelling if needed)

    Discord_ID: {
      type: String,
      trim: true,
       default:""
    //   maxlength: 100
    },
  
    YouTube_Twitch_Link: {
      type: String,
      trim: true,
       default:""
    //   maxlength: 500
    },
  
    Game_Rank: {
      type: String,
      trim: true,
       default:""
    //   maxlength: 100
    },
  
    Role: {
      type: String,
      trim: true,
       default:""
    //   maxlength: 100
    },
  
    Bio: {
      type: String,
      trim: true,
       default:"",
      //maxlength: 1000
    },
    Created_At:{
        type:String,
        default:currentDate,
        default:""
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;