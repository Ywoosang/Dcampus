const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
// Mysql 세션저장 
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const dbconfig = require('./config/config.js');
// const passportConfig = require('./passport');
const cors = require('cors');
// 라우터
const postRouter = require('./routes/post.js'); 
const commentRouter = require('./routes/comment.js'); 
const authRouter = require('./routes/auth.js')
require('dotenv').config()  

 

const app = express();
// CORS 에서는 기본적으로 쿠키를 request headers 에 넣어주지 않기 때문에
// 별도 설정이 필요하다. 
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
// dotenv
dotenv.config();

// mysql 세션 설정 
const sessionStore = new MySQLStore(dbconfig);

// port 변수 설정 
app.set('port', process.env.PORT || 8080);

// morgan 
app.use(morgan('dev'));
// css,js 정적파일 경로 설정 

// request body 에서 json 사용가능  
app.use(express.json({
    limit: "50mb",
}));

app.use(express.urlencoded({
    extended: true,
    limit: "50mb",
}));
// 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());


// 세션 등록 
app.use(session({
    port: process.env.MYSQL_PORT || 3306,
    secret: process.env.COOKIE_SECRET || 'ywoosang11',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 자바스크립트 공격 방지
        httpOnly: true,
        expires: new Date(Date.now() + 60000 * 1000) // 만기 10 분 
    },
    name: "user"//default : connect.sid  
}));

// app.use(passport.initialize());
// app.use(passport.session());
// passportConfig();
 

// https://www.youtube.com/watch?v=mbsmsi7l3r4
app.use('/',authRouter); 
app.use('/post', postRouter);
app.use('/comment',commentRouter);

app.get('/', (req, res) => {
    res.send('API 서버입니다.')
})

// 404 처리 
app.use((req, res, next) => {
    res.send('404 not found');
});

// error 처리 
app.use((err, req, res, next) => {
    console.error(err);
    res.send('일시적인 오류가 발생했습니다.');
    // 로깅 구현
    
});

// 서버 실행
app.listen(app.get('port'), () => {
    console.log(`express start on ${app.get('port')}`);
});


