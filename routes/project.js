const express = require('express');
const router = express.Router();

router.get('/project',(req,res) => {
    if(!req.data){
        res.status(302).redirect('/'); 
        return;
    }
    res.render('project');
}); 

module.exports = router; 