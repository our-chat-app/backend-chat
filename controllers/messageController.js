const { Message } = require('../models');
const { UserAccount } = require('../models');

async function getMessages(req, res, next) {
// const user = req.session.user

// if(user == null){
//     res.redirect('/login')
// }
// else{
//     req.user = user
//     next()
// }

  let messages = await Message.findAll();
  let allUsers = await UserAccount.findAll();

  let result = messages.map((message) => ({
    message: message.message,
    nickname: getNicknameFor(allUsers, message.userId),
    isCurrentUser: message.userId == req.session.userId, 
  }));

  res.json(result);

}

function getNicknameFor(allUsers, userId) {
  let nick = '';
  allUsers.forEach((u) => {
    if (u.id === userId) {
      nick = u.nickname;
    }
  });
  return nick;
}

async function onCreateMessage(req, res) {
  const { message } = req.body;
  let user = await UserAccount.findOne({
    where: { id: req.session.userId },
  });
  console.log(user);
  await Message.create({
    userId: user.id,
    message: message,
  });
  res.status(201).json('Message sent!');

}

module.exports = {
  onCreateMessage,
  getMessages,
};
