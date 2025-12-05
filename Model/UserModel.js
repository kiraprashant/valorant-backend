const mongoose = require("mongoose");
const moment = require("moment")

const currentDate = moment().format("DD-MM-YY");
const userSchema = new mongoose.Schema({
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
    Created_At:{
        type:String,
        default:currentDate
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;