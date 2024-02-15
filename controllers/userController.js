const { UserAccount } = require('../models')
const bcrypt  = require('bcrypt')
async function onHej(req, res){
    //res.send('Hej')
    const id = req.session.userId
    const user = await UserAccount.findOne({
        where: {id}
    });
    res.json(user)
}

async function onLogin(req,res){
    /* 1. ta lösenordet och email från req.body 
    2. lösenordet bcryptas och jämförs med det i databasen
    3. skapa koppling i session storage
    4. mappa cookie > useraccount.id */

    const  {email, password} = req.body
    const user = await UserAccount.findOne({
        where: {email}
    });
    if(!user){
        return res.status(401).json('Login failed');
    }
    
    const passwordVaild = await bcrypt.compare(password, user.password);
    if (!passwordVaild){
        return res.status(401).json('Login failed');
    }
    req.session.userId = user.id;

    res.json({status:"Yepp"})

}

async function onCreateUser(req, res){
    const {firstName, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    await UserAccount.create({
        firstName: firstName,
        email: email,
        password:hashedPassword
    })
    res.status(204).json({ email })
}


module.exports ={
    onHej,
    onLogin,
    onCreateUser
}