const express = require('express');
const router = express.Router();
const { User } = require('../models');
router.route('/signup')
.get((req, res) => {
    res.render('signup');
})
.post((req, res, next) => {
    const nickname = req.body.id;
    const name = req.body.name;
    const password = req.body.password;
    User.create({
        name: name,
        nickname: nickname,  
        password: password
    }).then(() => {
        console.log('seccess');
    }).catch((err) => {
        console.log(err);
    });
    res.status(302).redirect('/login')
});

module.exports = router; 