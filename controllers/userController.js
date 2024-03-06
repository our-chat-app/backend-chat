const { UserAccount } = require('../models');
const bcrypt = require('bcrypt');

async function onLogin(req, res) {
  /* 1. ta lösenordet och email från req.body 
    2. lösenordet bcryptas och jämförs med det i databasen
    3. skapa koppling i session storage
    4. mappa cookie > useraccount.id */

  const { email, password } = req.body;
  const user = await UserAccount.findOne({
    where: { email },
  });
  if (!user) {
    return res.status(401).json('Login failed');
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json('Login failed');
  }
  req.session.userId = user.id;
  req.session.nickname = user.nickname;

  res.status(200).json({ status: 'Logged in' });

}

async function onCreateUser(req, res) {
  const { nickname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await UserAccount.create({
    nickname: nickname,
    email: email,
    password: hashedPassword,
  });
  res.status(201).json({ email });
}

module.exports = {
  onLogin,
  onCreateUser,
};
