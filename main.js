const express = require('express');
const session = require('express-session');
const { UserAccount } = require('./models');
const { Message } = require('./models');

const { check, validationResult } = require('express-validator');
const { validateCreateUser } = require('./validators/userValidators.js');

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

// app.use(cors())

app.get('/api/users/:anvId', (req, res) => {
  console.log(req.params.anvId);

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
    firstName: user.firstName,
  }));
  res.json(result);
});
// console.log(user)

function getNextId() {
  let m = Math.max(...users.map((user) => user.id));
  return m + 1;
}

// app.post('/api/users',(req,res)=>{
//     const user = {
//         firstName:req.body.firstName,
//       password: req.body.password,
//       email: req.body.email,
//         id:getNextId()
//     }
//     // users.push(user)
// console.log(req.body)
// res.status(201).send('Created')
// });
app.post('/api/message',messageController.onCreateMessage );
app.post('/api/users', validateCreateUser, userController.onCreateUser);
app.post('/api/signIn', userController.onLogin);

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })

app.listen(port, async () => {
  await migrationhelper.migrate();
  console.log(`Example app listening2 on port ${port}`);
});
