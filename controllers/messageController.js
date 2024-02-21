const { Message } = require('../models')

async function onCreateMessage(req, res){
    const {userId , message} = req.body
    await Message.create({
        userId:userId,
        message:message
    })
    res.status(201).json('Message sent!');
    
    req.session.userId = user.id;
}

module.exports = {
    onCreateMessage
}