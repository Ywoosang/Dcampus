const express = require('express');
const router = express.Router();
const { generateAccessToken } = require('../middleware/auth.js');
const pool = require('../database/connection.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const refreshTokens = [];


router.post('/register', async (req, res, next) => {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const { username, userid, email, password } = req.body;
        const checkId = /[0-9a-zA-Z.;\-]/;  // 영문,숫자,특수문자
        const checkName = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
        // 바이트 계산
        function calcByte(s, b, i, c) {
            for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
            return b
        };
        // 
        function checkEmail(s) {
            // 초기 값 false 
            let cnt = 0;
            for (let i = cnt = 0; i < s.length; i++) {
                if (s[i] === '@') cnt++;
            }
            let isEmail = cnt === 1;
            const reg = /[0-9a-zA-Z.;\-]/;  // 영문,숫자,특수문자 
            return reg.test(email) && isEmail;
        }
        console.log(username, userid, email, password);
        // 클라이언트가 전송한 폼이 유효한지 검사
        const isValidate = (username && calcByte(username) < 20 && checkName.test(username)) &&
            (userid && calcByte(userid) < 15 && checkId.test(userid)) &&
            (email && calcByte(email) < 30 && checkEmail(email))
        // 처리할 수 없는 요청 범위 
        if (!isValidate) return res.sendStatus(416);
        // 이미 존재하는 회원인지
        const [user] = await connection.query(`
            SELECT userid,email 
            FROM User 
            WHERE userid = '${userid}'
            `);
        console.log(user);
        if (user.length !== 0) {
            connection.release();
            return res.sendStatus(409);
        };
        // 패스워드 해싱
        const hash = await bcrypt.hash(password, 12);
        await connection.query(`
                INSERT INTO User (username,userid,email,password) 
                VALUES ('${username}','${userid}','${email}','${hash}');
            `);
        // 풀 반환 
        connection.release();
        // 200 ok
        res.json({ message: `${username} 님 환영합니다.` });
    } catch (error) {
        console.log("query error");
        next(error);
    }
});

router.get('/user', (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req.cookies)
    if(!token) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user;
        next()
    }); 
    }, (req, res) => {
        console.log(req.user);
        res.json({username: req.user.username});
})

router.post('/logout',async(req,res,next)=>{
    res.clearCookie('jwt');
    res.sendStatus(200);
})

// 인증 관련 미들웨어 
router.post('/login', async (req, res, next) => {
    // JSON 웹 토큰 생성 
    // 사용자 이름이 올바르게 인증되었다고 가정하고 전달
    try {
        if (!req.body.password || !req.body.userid) return res.status(400).json({ message: "invalid form" })
        const connection = await pool.getConnection(async conn => conn);
        // 사용자 아이디 기반으로 찾기
        let [user] = await connection.query(`
            SELECT userid,username,email,password,authority
            FROM User 
            WHERE userid = '${req.body.userid}'
        `);
        // 사용자가 존재하지 않거나 password 필드가 비어 있다면
        if (!req.body.password || !user[0] || !user[0].password) return res.sendStatus(403);
        // 패스워드가 일치하는지 확인
        const { userid, username, email, password,authority } = user[0];
        let isPassword;
        console.log(user[0]);
        if(authority=== 'ADMINISTRATOR'){
            console.log(req.body.password,password)
            isPassword = req.body.password == password;
        } else {
            isPassword = await bcrypt.compare(req.body.password, password);
        }
        // 401 인증 실패
        if (!isPassword) return res.status(401).json({
            message: '아이디 또는 비밀번호가 틀렸습니다'
        });
        const payload = {
            userid,
            username,
            email
        };
        const accessToken = generateAccessToken(payload);
        //  payload, secretkey
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
        // accessToken,refreshToken - payload에 사용자 정보를 저장 
        refreshTokens.push(refreshToken);
        res.cookie('jwt', accessToken);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

// 사용자가 token 생성할 때마다 매번 토큰이 저장되므로
// 쌓이지 않기 위해 없애줘야한다.
router.delete('/logout', (req, res) => {
    // DB 에서 토큰 조회 후 삭제 요망 (test코드 필요)
    refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
});

// 로그인 연장 할 때 
router.post('/token', (req, res) => {
    // check to see if we already have a refresh token that exists
    // for that 
    // so normally want to store refresh tokens in some form of database
    // or some form of Redis cache 
    // 여기서는 변수에 담음 
    const refreshToken = req.body.token;
    if (refreshToken === null) return res.sendStatus(401);
    // 발급한 refresh token 이 아닐 때 
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        // user object actually contains additional information
        // such as issue that date of our token
        // so we actually need to get just the name
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken });
    });
});

// 24 분 부터



module.exports = router;