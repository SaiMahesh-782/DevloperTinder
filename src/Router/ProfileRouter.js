const express= require('express');

const ProfileRouter=express.Router();
const {UserAuth}=require('../middleware/auth');
const {ValidateEditProfile}=require('../utils/validation');

ProfileRouter.get('/profile/view', UserAuth, async (req, res) => {
  try {
    res.send(req.user);   // ✅ correct property
  } catch (err) {
    res.status(500).send("Error fetching profile data " + err.message);
  }
});
ProfileRouter.patch('/profile/edit', UserAuth, async (req, res) => {
  try {
 if (!ValidateEditProfile(req)) {
      throw new Error("Invalid Edit Request");
    }  
    const user = req.user;
    console.log(user)
}
catch (err) {
    res.status(500).send("Error updating profile data " + err.message);
  }
});

module.exports={ProfileRouter};
