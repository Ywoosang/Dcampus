// const express = require('express');
// const router = express.Router();
// const { User,Profile } = require('../models');
// const { QueryTypes } = require('sequelize'); 
// const { Op } = require("sequelize");
// const { sequelize }= require('../models')
// const fs = require('fs');
// const multer = require('multer'); 
// const path = require('path');

// try{
//     fs.readdirSync('uploads');
// } catch(error){
//     console.log('create uploads folder');
//     fs.mkdirSync('uploads')
// }


// router.post('/api',(req,res)=>{
//     res.json(req.user.id);
// })
// router.route('/profile')
// .get(async (req,res)=>{
//     try{
//         console.log('접근 가능한 사용자',req.user);
//         const profile = await Profile.findOne({
//             where : { userId :req.user.id }
//         });
//         let intro;
//         let img;
//         const name = req.user.name;
//         const id = req.user.id;
//         if(profile){
//             intro = profile.intro;
//             img = profile.img; 
//         } else{
//             Profile.create({
//                 intro : '자기소개가 없습니다',
//                 UserId : id,
//                 img : '/img/noProfile.png'
//             });
//             intro = '자기소개가 없습니다' ;
//             img = '/img/noProfile.png';
//         }
//         res.render('profile',{ name,id,intro,img }); //  
//     }catch(err){
//         console.error(err);
//         next(err);
//     }
// })
// .delete((req,res) =>{
//     sequelize.query(`UPDATE Profiles SET intro = '자기소개가 없습니다' WHERE UserId= ${req.user.id}`)
//     res.end() 
// })
// .put((req,res) => {
//     console.log("인트로",req.body.intro);
//     sequelize.query(`UPDATE Profiles SET intro = "${req.body.intro}" WHERE UserId = ${req.user.id};`)
//     res.end() 
// })


// // multer 는 미들웨어가 아니다. multer 함수를 실행하면 함수를 실행한 객체 안에 
// // single (array,fields,none) 이라는 미들웨어가 들어가 있음 

// const upload = multer({
//     storage : multer.diskStorage({
//         destination(req,file,cb) {
//             // 실제 파일은 uploads 폴더 안에 들어있음 
//             cb(null,'uploads/')
//         },
//         filename(req,file,cb){
//             const ext = path.extname(file.originalname);
//             // 파일명 + 날짜(같은 이름 사진 덮어씌워지는것을 막기 위해)
//             cb(null,path.basename(file.originalname,ext) + Date.now()+ ext)
//         },
//     }),
//     limits : { fileSize : 5 * 1024 * 1024},
// });

// // 이미지부터 먼저 렌더링될 수 있도록(압축하는데 시간이 많이 걸릴 수 있음)
// router.post('/profile/img',upload.single('img'),(req,res)=>{
//     console.log('실행됌');
//     console.log('전송된 파일',req.file);
//     // src 에 붙는 이미지 GET 요청 주소는 img 
//     // 요청과 실제 파일 주소가 다르다 = express.static 
//     res.json({url:`/img/${req.file.filename}`});
// });

// // 텍스트 필드만 허용
// router.post('/profile/upload',upload.none(),(req,res)=>{
//     const img = req.body.url
//     sequelize.query(`UPDATE Profiles SET img = "${img}" WHERE UserId = ${req.user.id};`);
//     res.redirect('/profile')
// });

// module.exports = router; 
