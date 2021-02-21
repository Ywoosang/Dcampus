const express = require('express');
const router = express.Router();

router.get('/community',(req,res)=>{
    if(!req.data){
        res.status(404).redirect('/'); 
        return;
    }
    res.render('community');
}); 

module.exports = router; 