const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { Op } = require("sequelize");

router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post(async (req, res, next) => {
        if(req.session.user){
            req.session.destroy(()=>{
                    console.log('세션 삭제 성공');
                }
            );//세션정보 삭제":"opellong13@gmail.com"},"__lastAccess":1612808026821}
        }
        const nickname = req.body.id;
        const password = req.body.password;
        let user;
        try {
            user = await User.findOne({
                attributes: ['id','name', 'nickname', 'password'],
                where: {
                    nickname: {
                        [Op.eq]: nickname
                    }
                }
            });
            console.log(user.dataValues.password, password);
            if (user.dataValues.password == password && user.dataValues.nickname == nickname) {
                console.log('로그인 성공1');
                //req.session 으로 세션 생성 
                req.session.user = {
                    id : user.dataValues.id,
                    name : user.dataValues.name,
                    nickname: nickname,
                }
                console.log('로그인 성공');
                res.status(302).redirect('/');
                return; 
            }
        } catch (err) {
            console.log(err);
            console.log('없는 사용자');
        }
        res.status(302).redirect('/signup');
    }
    );

    module.exports = router; 