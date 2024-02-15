const express = require('express')
const { users } = require('./src/js/users')
var cors = require('cors')
const app = express()
const port = 3000;

var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())

app.get('/api/users/:anvId', (req, res) => {
    console.log(req.params.anvId)


let p = users.find(user => user.id == req.params.anvId)
if(p == undefined){
    res.status(404).send('Finns inte')

}
res.json(p)
})

app.get('/api/users',(req,res)=>{
    
    let result = users.map(user => ({
        id: user.id,
        userName: user.userName
    }))
     res.json(result)
});


function getNextId(){
    let m = Math.max(...users.map(user => user.id))
    return m + 1
}

app.post('/api/users',(req,res)=>{
    const user = {
        userName:req.body.userName,
      password: req.body.password,
        id:getNextId()
    }
    users.push(user)
console.log(req.body)
res.status(201).send('Created')
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })