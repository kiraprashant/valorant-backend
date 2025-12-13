const express = require("express")
const Router = express.Router()
const {AddUserData,LoginUser,GetSingleProfile,UpdateSingleProfile} = require("../Controller/UserRegistration")
const {AddContactDetail} = require("../Controller/Contact") 
const {AddParticapateTeam,upload,CheckParticapateTeam,UpdateParticapateTeam,CheckingTeamByID,DeletIngTeamByID} = require("../Controller/Particapte")
const {AdminLogin,ContactGetDetails,TeamGetDetails,UserGetDetails,AdminDashboard,UpdateContactStatus,ContactSingleDetails} = require("../Controller/Admin")
 


Router.route("/Add").post(AddUserData)
Router.route("/Login").post(LoginUser)
Router.route("/UserProfile").post(GetSingleProfile)
Router.route("/UserUpdateProfile").put(UpdateSingleProfile)
Router.route("/Contact").post(AddContactDetail)
Router.route("/Team").post(upload.single("TeamLogo"), AddParticapateTeam);
Router.route("/CheckingGameID").post(CheckParticapateTeam)
Router.route("/UpdateParticapateTeam").post(upload.single("TeamLogo"),UpdateParticapateTeam)
Router.route("/CheckingTeamByID/:id").get(CheckingTeamByID)
Router.route("/DeletIngTeamByID/:id").get(DeletIngTeamByID)

//Admin Router
Router.route("/admin-login").post(AdminLogin)
Router.route("/AdminDashboard").get(AdminDashboard)
Router.route("/GetFullContact").get(ContactGetDetails)
Router.route("/ContactSingleDetails/:id").get(ContactSingleDetails)
Router.route("/UpdateContactStatus/:id").put(UpdateContactStatus)
Router.route("/GetFullTeamDetails").get(TeamGetDetails)
Router.route("/GetFullserDetails").get(UserGetDetails)








module.exports = Router