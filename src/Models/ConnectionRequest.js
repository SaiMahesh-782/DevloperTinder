const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({   

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
       
},
    ToUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    status: {
        type: String,
        enum:{ 
        values: ['ignored', 'accepted', 'rejected','interested'],
        default: 'pending',
        message: '{VALUE} is not a valid status'
         }, 
         required: true,
    }
}, { timestamps: true });

const ConnectionRequest = mongoose.model('ConnectionRequest', ConnectionRequestSchema);

module.exports = { ConnectionRequest };
