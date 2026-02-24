// 12 /0:31:22

import express from 'express';
const RequestRouter = express.Router();

import { UserAuth } from '../middleware/auth.js';
import { ConnectionRequest } from '../Models/ConnectionRequest.js';

RequestRouter.post('/request/send/status/:toUserId', 
  UserAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id; 
    const toUserId = req.params.toUserId;
    
    const status=req.params.toUserId;

    const ConnectionRequest= new ConnectionRequest({
        fromUserId,
        ToUserId:toUserId,  
        status
    });

    const data=await ConnectionRequest.save();
    res.json({ message: "Connection request sent successfully", data });

  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

export { RequestRouter };
