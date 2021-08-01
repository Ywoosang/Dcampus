const express = require('express');
const router = express.Router();
const { generateAccessToken }= require('../middleware/auth.js');
const jwt = require('jsonwebtoken')

const refreshTokens = [];

// 인증 관련 미들웨어 
router.post('/login',(req,res)=>{
    // JSON 웹 토큰 생성 
    // 사용자 이름이 올바르게 인증되었다고 가정하고 전달
    const username = req.body.username;
    console.log(username,process.env.ACCESS_TOKEN_SECRET); 
    // 서명 사용
    const user = { name : username }
      // 직렬화하고 싶은 페이로드, 시크릿키
    const accessToken =  generateAccessToken(user); 
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET); 
    // accessToken 에 사용자 정보를 저장 

    // refreshTokens 에 정보 저장
    refreshTokens.push(refreshToken); 
    res.json({ accessToken,refreshToken}); 
});

// 사용자가 token 생성할 때마다 매번 토큰이 저장되므로
// 쌓이지 않기 위해 없애줘야한다.
router.delete('/logout',(req,res) => {
    // 해당 토큰 없애기 (데이터베이스 등)
    refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

 
router.post('/token',(req,res)=>{
    // check to see if we already have a refresh token that exists
    // for that 
    // so normally want to store refresh tokens in some form of database
    // or some form of Redis cache 
    // 여기서는 변수에 담음 
    const refreshToken = req.body.token;
    if(refreshToken === null) return res.sendStatus(401);
    // 발급한 refresh token 이 아닐 때 
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        // user object actually contains additional information
        // such as issue that date of our token
        // so we actually need to get just the name
        const accessToken = generateAccessToken({name: user.name }); 
        res.json({ accessToken });
    });
});

// 24 분 부터



module.exports = router;