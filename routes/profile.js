const express = require('express');
const router = express.Router();
const { User,Profile } = require('../models');
const { QueryTypes } = require('sequelize'); 
const { Op } = require("sequelize");
const { sequelize }= require('../models')


router.post('/api',(req,res)=>{
    res.json(req.data.id);
})


router.get('/profile',async (req,res)=>{

    try{
    const profile = await Profile.findOne({
        where : {
            userId : {
                [Op.eq] : req.data.id
            }
        }
    })
    res.render('profile',{name:req.data.name,id:req.data.id,intro:profile.intro,id:req.data.id}); 
    }catch(err){
        res.render('profile',{name:req.data.name,id:req.data.id})
    }
  
    // .then((response)=>{
    //     res.render('profile',{name:req.data.name,id:req.data.id,intro:response.intro,id:req.data.id}); 
    //     return; 
    // }).catch((error)=>{
    //     console.log(error);
    //     res.render('profile',{name:req.data.name,id:req.data.id})
    //     return;
    // })
})


router.route('/profile/:id')
.post((req,res)=>{
    const intro= req.body.intro
    console.log(intro);
    Profile.create({
            intro : intro,
            UserId : req.data.id
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    res.status(302).redirect('/profile')
})
.delete((req,res) =>{
    sequelize.query(`DELETE FROM Profiles WHERE UserId= ${req.data.id}`)
    res.end() 
})
.put((req,res) => {
    console.log("인트로",req.body.intro);
    sequelize.query(`UPDATE Profiles SET intro = "${req.body.intro}" WHERE UserId = ${req.data.id};`)
    res.end() 
})

 


module.exports = router; 
