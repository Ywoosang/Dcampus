const express = require('express');
const router = express.Router();
const { Link } = require('../models');
const { Op } = require("sequelize");

router.route('/link')
.get(async(req,res)=>{
    if(!req.data){
        res.status(302).redirect('/'); 
        return;
    }
    const id = req.data.id
    const links = await Link.findAll({
        attributes : [ "id","name","content"],
        where :{
            UserId  : {
                [Op.eq] : id 
            }
        }
    });
    const responseArray = []; 
    links.forEach(item=>{
        let obj = {} 
        obj.linkId = item.dataValues.id; 
        obj.linkName = item.dataValues.name;
        obj.linkUrl = item.dataValues.content;
        responseArray.push(obj);
    }); 
    res.render('link',{links:responseArray})
})
.post(async (req,res,next)=>{
    const linkName = req.body.linkName;
    const linkUrl = req.body.linkUrl;
    const id = req.data.id; 
    try{
        const link = await Link.create({
                name : linkName,
                content : linkUrl,
                createdAt: Date.now(),
                updatedAt:  Date.now(),
                userId : id
            });
        res.json({linkId:link.id}); 
    }catch(err){
        next(err);
    }
})

router.delete('/link/:id',(req,res,next)=>{
    const linkId = req.params.id;
    console.log(req.params);
    Link.destroy({
        where: {
            id : {
                [Op.eq] : Number(linkId) 
            }
        }
    }).then((response)=>{
        console.log(response);
        res.json({ success : '삭제 되었습니다.'});
    }).catch((error)=>{
        res.json({ warn :'처리 중 오류가 발생했습니다. 다시 시도해주세요.'}); 
        next(error);
    });
}); 

module.exports = router; 