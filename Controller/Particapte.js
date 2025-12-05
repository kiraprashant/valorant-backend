const ParticapateModel = require("../Model/ParticapateModel");
const multer  = require('multer')
const path = require("path")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder name
  },
  filename: (req, file, cb) => {
    const teamName = req.body.teamName || "team";
    // Replace spaces and special chars to make it file-system safe
    const safeTeamName = teamName.replace(/\s+/g, "_").replace(/[^\w_-]/g, "");
    const uniqueName = `${safeTeamName}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


const AddParticapateTeam = async (req, res) => {
  try {
    const Members = JSON.parse(req.body.Members);

    const leaderGameId = req.body.LeaderGameID;

    // 1️⃣ Check leader not already a leader
    const AlreadyLeader = await ParticapateModel.findOne({ LeaderGameId: leaderGameId });

    if (AlreadyLeader) {
      return res.json({
        success: false,
        msg: "This Leader is already registered in another Team!"
      });
    }

    // 2️⃣ Check leader not already a member
    const LeaderIsMember = await ParticapateModel.findOne({ "Members.gameId": leaderGameId });

    if (LeaderIsMember) {
      return res.json({
        success: false,
        msg: "This Leader is already a Member in another Team!"
      });
    }

    // 3️⃣ Check Each Member
    for (const member of Members) {

      // Check member not already a leader
      const MemberIsLeader = await ParticapateModel.findOne({ LeaderGameId: member.gameId });

      if (MemberIsLeader) {
        return res.json({
          success: false,
          msg: `Member ${member.name} (Game ID: ${member.gameId}) is already a Leader in another team`
        });
      }

      // Check member not already a member
      const MemberAlreadyInTeam = await ParticapateModel.findOne({ "Members.gameId": member.gameId });

      if (MemberAlreadyInTeam) {
        return res.json({
          success: false,
          msg: `Member ${member.name} (Game ID: ${member.gameId}) is already registered in another team`
        });
      }
    }

    // 4️⃣ Passed All Validation — Save Team
    const newTeam = await ParticapateModel({
      TeamName: req.body.teamName,
      LeaderName: req.body.name,
      LeaderGameId: req.body.LeaderGameID,
      LeaderEmail: req.body.email,
      Members,
      TeamLogo: req.file ? `/uploads/${req.file.filename}` : null
    }).save();

    res.json({
      success: true,
      msg: "Team Registration Successful",
      data: newTeam
    });

  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      msg: "Team Registration Failed"
    });
  }
};

const CheckParticapateTeam = async (req, res) => {

  try{
    console.log("req.body" , req.body.GameID)
    const GetGameLeaderID = await ParticapateModel.findOne({LeaderGameId:req.body.GameID})
    const GetGameMemberID = await ParticapateModel.findOne({
      "Members.gameId": req.body.GameID,
    });

    console.log("GetGameMemberID", GetGameMemberID , "GetGameMemberID")

    if(GetGameLeaderID){
      res.json({
        success:true,
        msg:"He Is Leader",
        LeaderGamerId:GetGameLeaderID,
        GameId:req.body.GameID
    })
      return false
    }

    else if(GetGameMemberID){
      res.json({
        success:true,
        msg:"He Is In Member",
        LeaderGamerId:GetGameMemberID,
        GameId:req.body.GameID
    })

    }

    else{
      res.json({
        success:true,
        msg:"Not in Any Team",
        LeaderGamerId:GetGameLeaderID,
        GameId:req.body.GameID
    })
    }

  
  }
  catch(e){
    console.log(e)
    res.status(400).json({
     Success:false,
     msg:"Team Resgistration Failed 123"
    })
  
}



}

const UpdateParticapateTeam = async (req, res) => {
  try {
    const Members = JSON.parse(req.body.Members);

    const leaderGameId = req.body.LeaderGameID;
    const teamId = req.body.teamId; // ⬅ Comes during update

    // 1️⃣ Check leader not already a leader in another team
    const AlreadyLeader = await ParticapateModel.findOne({ 
      LeaderGameId: leaderGameId,
      _id: { $ne: teamId } // Ignore own team if updating
    });

    if (AlreadyLeader) {
      return res.json({
        success: false,
        msg: "This Leader is already registered in another Team!"
      });
    }

    // 2️⃣ Check leader not already a member in another team
    const LeaderIsMember = await ParticapateModel.findOne({
      "Members.gameId": leaderGameId,
      _id: { $ne: teamId }
    });

    if (LeaderIsMember) {
      return res.json({
        success: false,
        msg: "This Leader is already a Member in another Team!"
      });
    }

    // 3️⃣ Validate each member (ignore if same team)
    for (const member of Members) {
      const MemberIsLeader = await ParticapateModel.findOne({
        LeaderGameId: member.gameId,
        _id: { $ne: teamId }
      });

      if (MemberIsLeader) {
        return res.json({
          success: false,
          msg: `Member ${member.name} (Game ID: ${member.gameId}) is already a Leader in another Team`
        });
      }

      const MemberAlreadyInTeam = await ParticapateModel.findOne({
        "Members.gameId": member.gameId,
        _id: { $ne: teamId }
      });

      if (MemberAlreadyInTeam) {
        return res.json({
          success: false,
          msg: `Member ${member.name} (Game ID: ${member.gameId}) is already registered in another Team`
        });
      }
    }

    // 4️⃣ Now Save or Update
    let newTeam;

    if (teamId) {
      // UPDATE TEAM
      newTeam = await ParticapateModel.findByIdAndUpdate(
        teamId,
        {
          TeamName: req.body.teamName,
          LeaderName: req.body.name,
          LeaderGameId: req.body.LeaderGameID,
          LeaderEmail: req.body.email,
          Members,
          TeamLogo: req.file ? `/uploads/${req.file.filename}` : req.body.existingTeamLogo
        },
      );
    } 

    res.json({
      success: true,
      msg: teamId ? "Team Updated Successfully" : "Team Registration Successful",
      data: newTeam
    });

  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      msg: "Team Operation Failed"
    });
  }
};

module.exports = { AddParticapateTeam, upload,CheckParticapateTeam ,UpdateParticapateTeam};
