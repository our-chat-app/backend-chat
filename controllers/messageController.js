const { Message } = require('../models')
const { UserAccount } = require('../models')



async function onCreateMessage(req, res){

    const {message} = req.body
    const user = await UserAccount.findOne({
        where: {id:req.session.userId}
    })
    console.log(user)
    await Message.create({
        userId: user.id,
        message:message
    })
    res.status(201).json('Message sent!');
    
    //req.session.userId = user.id; 
}

module.exports = {
    onCreateMessage
}

// let users = await UserAccount.findAll();
//   let result = users.map((user) => ({
//     id: user.id,
//   }));
//   res.json(result);