const mongoose = require("mongoose");
const moment = require("moment")

const currentDate = moment().format("DD-MM-YY");
const ContactSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: [true, "FullName is required"],
        trim: true,
    },
    Email: {
        type: String,
        required: [true, "Email is required"],
    },
    Issue: {
        type: String,
        required: [true, "Issue is required"],
    },
    Message: {
        type: String,
        required: [true, "Message is required"],
    },
    Status: {
        type: String,
        default: "Pending"
    },
    Created_At:{
        type:String,
        default:currentDate
    }
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;