const mongoose = require("mongoose");
const moment = require("moment")

const currentDate = moment().format("DD-MM-YY");
const AdminLogin = new mongoose.Schema({
    UserName: {
        type: String,
        required: [true, "UserName is required"],
        trim: true,
    },

    Password: {
        type: String,
        required: [true, "Password is required"],
    },
});

const AdminModel = mongoose.model("AdminLogin", AdminLogin);
module.exports = AdminModel;