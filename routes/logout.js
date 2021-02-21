const express = require('express');
const router = express.Router();
 
router.get('/logout',(req,res,next)=> {
    if(req.session.user){
        req.session.destroy(()=>{
            console.log('세션 삭제 성공');
            res.status(302).redirect('/');
            return; 
            }
        );//세션정보 삭제
    }
    //datastore 저장이 끝났을 때 콜백함수 호출.
});

module.exports = router; 