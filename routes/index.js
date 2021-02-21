const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res) => {
    let login,name; 
    if(req.data){
        name = req.data.name; 
        login = true; 
    }else{
        login = false;
    }
    res.render('index',{login,name});
    return; 
})
.post((req,res)=>{
    if(req.data){
        res.json({isLogin:true})
    }else{
        res.json({isLogin:false})
    }
}); 

module.exports = router; 