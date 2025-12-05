const express = require("express")
const Router = express.Router()
const {AddUserData,LoginUser} = require("../Controller/UserRegistration")
const {AddContactDetail} = require("../Controller/Contact") 
const {AddParticapateTeam,upload,CheckParticapateTeam,UpdateParticapateTeam} = require("../Controller/Particapte")



Router.route("/Add").post(AddUserData)
Router.route("/Login").post(LoginUser)
Router.route("/Contact").post(AddContactDetail)
Router.route("/Team").post(upload.single("image"), AddParticapateTeam);
Router.route("/CheckingGameID").post(CheckParticapateTeam)
Router.route("/UpdateParticapateTeam").post(UpdateParticapateTeam)




module.exports = Router