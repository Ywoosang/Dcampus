const express = require('express');
const router = express.Router();
const { User,Profile } = require('../models');
const { QueryTypes } = require('sequelize'); 
const { Op } = require("sequelize");
const { sequelize }= require('../models')
const fs = require('fs');
const multer = require('multer'); 
const path = require('path');

try{
    fs.readdirSync('uploads');
} catch(error){
    console.log('create uploads folder');
    fs.mkdirSync('uploads')
}


router.post('/api',(req,res)=>{
    res.json(req.user.id);
})
router.route('/profile')
.get(async (req,res)=>{
    try{
        const name = req.user.name;
        const id = req.user.id;
        const img = req.profile.img
        const intro = req.profile.intro 
        res.render('profile',{ name,id,intro,img,login:true }); //  
    }catch(err){
        console.error(err);
        next(err);
    }
})
.delete((req,res) =>{
    sequelize.query(`UPDATE Profiles SET intro = '자기소개가 없습니다' WHERE UserId= ${req.user.id}`)
    res.end() 
})
.put((req,res) => {
    console.log("인트로",req.body.intro);
    sequelize.query(`UPDATE Profiles SET intro = "${req.body.intro}" WHERE UserId = ${req.user.id};`)
    res.end() 
})


// multer 는 미들웨어가 아니다. multer 함수를 실행하면 함수를 실행한 객체 안에 
// single (array,fields,none) 이라는 미들웨어가 들어가 있음 

const upload = multer({
    storage : multer.diskStorage({
        destination(req,file,cb) {
            // 실제 파일은 uploads 폴더 안에 들어있음 
            cb(null,'uploads/')
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            // 파일명 + 날짜(같은 이름 사진 덮어씌워지는것을 막기 위해)
            cb(null,path.basename(file.originalname,ext) + Date.now()+ ext)
        },
    }),
    limits : { fileSize : 5 * 1024 * 1024},
});

// 이미지부터 먼저 렌더링될 수 있도록(압축하는데 시간이 많이 걸릴 수 있음)
router.get('/profile/img',upload.none(),async (req,res)=>{
    await sequelize.query(`UPDATE Profiles SET img = "/img/user.png" WHERE UserId = ${req.user.id};`);
    res.redirect('/profile'); 
})
router.post('/profile/img',upload.single('img'),async(req,res)=>{
    console.log('실행됌');
    console.log('전송된 파일',req.file);
    if(!req.file) return  res.redirect('/profile');
    const img = `/img/${req.file.filename}`;
    await sequelize.query(`UPDATE Profiles SET img = "${img}" WHERE UserId = ${req.user.id};`);
    res.redirect('/profile'); 
});

module.exports = router; 
