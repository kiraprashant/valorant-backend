const mongoose = require('mongoose');
const moment = require("moment")

const currentDate = moment().format("DD-MM-YY");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gameId: { type: String, required: true },
  email: { type: String, required: true }
});

const teamSchema = new mongoose.Schema({
  TeamName: {
    type: String,
    required: true,
    trim: true
  },
  TeamLogo: {
    type: String, // store URL or file path
    required: false
  },
  LeaderName: {
    type: String,
    required: true,
    trim: true
  },
  LeaderGameId: {
    type: String,
    required: true
  },
  LeaderEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  Members: {
    type: [memberSchema],
    default: []
  },
  Created_At:{
    type:String,
    default:currentDate
},
});

// Export the model
module.exports = mongoose.model('Team', teamSchema);