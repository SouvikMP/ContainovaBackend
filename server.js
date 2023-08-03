require('dotenv').config()

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors())

const jwt= require('jsonwebtoken')
app.use(express.json())

const dashboard =[{}]
app.get('/dashboard', authenticateToken, (req,res) => {
    res.json(dashboard.filter(dashboard => dashboard.username === req.user.username))
})

app.post('/api/login',  (req, res) => {
    // Authenticate User
    const username = req.body.username
    const password = req.body.password
    const user = {
        name : username,
        pass : password,
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.status(401).json({accessToken: accessToken})

});

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split('')[1]
    if(token == Null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});