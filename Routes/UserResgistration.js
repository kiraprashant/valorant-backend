const express = require("express")
const Router = express.Router()
const {AddUserData,LoginUser} = require("../Controller/UserRegistration")
const {AddContactDetail} = require("../Controller/Contact") 



Router.route("/Add").post(AddUserData)
Router.route("/Login").post(LoginUser)
Router.route("/Contact").post(AddContactDetail)

module.exports = Router