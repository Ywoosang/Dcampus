const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
// Mysql 세션저장 
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const multerS3 = require('multer-s3');
const dbconfig = require('./config/config.js');
const multer = require('multer'); 
// const passportConfig = require('./passport');
const cors = require('cors');
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-northeast-2',
});

const storage = multerS3({
    s3: new AWS.S3(),
    bucket: 'ywoosang-s3',
    async key(req, file, cb) {
        try {
            const filePathName = `${Date.now()}-${file.originalname}`;
            cb(null, filePathName);
        } catch (err) {
            console.log(err);
        }
    }
})

const upload = multer({
    storage
});
exports.upload = upload;




// 라우터
const postRouter = require('./routes/post.js')
// const profileRouter = require('./routes/profile.js');
// const authRouter = require('./routes/auth.js');
// const linkRouter = require('./routes/link.js');
// const communityRouter = require('./routes/community.js');


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

// parser 
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





// 라우터 등록
// 메인페이지
app.post('/api/test', (req, res) => {
    const age = req.body.age;
    const name = req.body.name;
    res.json({ msg: 'success', age, name })
})


// app.use('/', profileRouter);
// app.use('/', linkRouter);
// app.use('/community', communityRouter);
// app.use('/auth', authRouter);
app.use('/post', postRouter);

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


