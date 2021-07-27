// const express = require('express');
// const passport = require('passport');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const { User, Profile } = require('../models');
// // 로컬 로그인
// router.route('/signup')
//     .get((req, res) => {
//         return res.render('signup');
//     })
//     .post(async (req, res, next) => {
//         const name = req.body.name;
//         const email = req.body.email;
//         const password = req.body.password;
//         try {
//             // 기존에 가입된 사용자가 있는지 확인
//             const user = await User.findOne({ where: { email } })
//             console.log(user);
//             if (user) {
//                 return res.redirect(`/auth/signup?signupError=${'이미 존재하는회원입니다'}`);
//             }
//             const hash = await bcrypt.hash(password, 12);
//             await User.create({
//                 name,
//                 email,
//                 password: hash
//             })
//             const newUser = await User.findOne({where :{ email }})
//             await Profile.create({
//                 intro : '자기소개가 없습니다',
//                 img : '/img/user.png',
//                 UserId : newUser.id
//             })
//             res.json({ message : 'signup' });
//         } catch (err) {
//             console.error(err);
//             next(err);
//         }
//     });

// router.route('/login')
//     .post((req, res, next) => {
//         passport.authenticate('local', (authError, user, info) => {
//             if (authError) {
//                 console.error(authError);
//                 return next(authError);
//             }
//             if (!user) {
//                 return res.json('error');
//             }
//             return req.login(user, (loginError) => {
//                 if (loginError) {
//                     console.error(loginError);
//                     return next(loginError);
//                 }
//                 console.log(user);
//                 return res.json({ user });
//             });
//         })(req, res, next)
//     });

// // 깃허브 로그인
// router.get('/github', passport.authenticate('github'));
// router.get('/github/callback',
//     passport.authenticate('github', { failureRedirect: '/' }),
//     function (req, res) {
//         res.json({ login:true});
//     });


// router.get('/naver', passport.authenticate('naver'));
// router.get('/naver/callback',
//     passport.authenticate('naver', { failureRedirect: '/' }),
//     function (req, res) {
//         res.json({ login:true});
//     });

// // 카카오 로그인
// router.get('/kakao', passport.authenticate('kakao'));
// router.get('/kakao/callback', passport.authenticate('kakao', {
//     failureRedirect: '/',
// }), (req, res) => {
//     res.json({ login:true})
// });

// // 로그아웃
// router.get('/logout', (req, res) => {
//     console.log('로그아웃됨');
//     req.logout();
//     req.session.destroy();
//     res.json({ logout : true});
// });

// module.exports = router;