const router = require('express').Router();
const User = require('../db').import('../models/user')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP

router.post('/signup', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13)
    })
    .then(
        createSuccess = (user) => {                                  //sec x min x hour => one day
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
            res.json({
                user: user,
                message: 'User is created',
                sessionToken: token
            })
            console.log(user);
        },
        createError = err => res.send(500, err)
    )
})

//SIGNIN
router.post('/signin', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, matches) => { //comparing the password entered to the user password
                 if(matches){
                    let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    res.json({
                        user: user,
                        message: 'Successfully Authenticated',
                        sessionToken: token
                    })
                }else{
                    res.status(502).send({ error: 'bad gateway'})
                }
            })
        } else{
            res.status(500).send({error: 'failed to authenticate'})
        }   
    }, err => res.status(501).send({ error: 'failed to process'}))
})


module.exports = router;