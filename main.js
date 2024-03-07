const express = require('express');
const session = require('express-session');
const { UserAccount } = require('./models');
const { Message } = require('./models');

const { check, validationResult } = require('express-validator');
const { validateCreateUser} = require('./validators/userValidators.js');
const { validateLoginUser } = require('./validators/loginValidators.js');
const { validateMessage } = require('./validators/messageValidators.js');

// const { users } = require('./src/js/users')
var cors = require('cors');
const app = express();
const port = 3000;
const userController = require('./controllers/userController.js');
const messageController = require('./controllers/messageController.js');

const migrationhelper = require('./migrationhelper');

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5501', //Ändra port senare
    credentials: true,
  })
);

app.use(
  session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);


app.get('/api/users/:anvId', (req, res) => {

  let p = users.find((user) => user.id == req.params.anvId);
  if (p == undefined) {
    res.status(404).send('Finns inte');
  }
  res.json(p);
});

app.get('/api/users', async (req, res) => {
  let users = await UserAccount.findAll();
  let result = users.map((user) => ({
    id: user.id,
    nickname: user.nickname,
  }));
  res.json(result);
});
app.get('/api/messages', messageController.getMessages)

// function getNextId() {
//   let m = Math.max(...users.map((user) => user.id));
//   return m + 1;
// }

app.post('/api/message', validateMessage, messageController.onCreateMessage);
app.post('/api/users', validateCreateUser, userController.onCreateUser);
app.post('/api/signIn', validateLoginUser, userController.onLogin);

app.listen(port, async () => {
  await migrationhelper.migrate();
  console.log(`Example app listening on port ${port}`);
});
