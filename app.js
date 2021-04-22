const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const { sequelize } = require('./models');
const session = require('express-session');
const favicon = require('serve-favicon'); 
// Mysql 세션저장 
const MySQLStore = require('express-mysql-session')(session);
//
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv'); 
const passport = require('passport'); 
const passportConfig = require('./passport'); 
const cors = require('cors'); 

// 라우터
const profileRouter = require('./routes/profile'); 
const authRouter = require('./routes/auth');
const linkRouter = require('./routes/link'); 
const projectRouter = require('./routes/project'); 
const communityRouter = require('./routes/community'); 
const userRouter = require('./routes/user'); 
const { userCheck } = require('./routes/middleware');

// nunjucks 
const nunjucks = require('nunjucks'); 
// dotenv
dotenv.config(); 

// mysql 세션 설정 
const options = {
	host: 'localhost',
	port: 3307,
	user: 'root',
	password: 'Woosang11@@',
	database: 'Dcampus'
};
const sessionStore = new MySQLStore(options);

// nunjucks 템플릿 엔진 
app.set('view engine', 'html');

const env = nunjucks.configure('views', {
    express: app,
    watch: true,
});

env.addFilter('dateform',function (str) {
    const date = new Date(str) 
    const year = date.getFullYear();
    const month = (date.getMonth() +1);
    const day = date.getDate();
    return `${ year}년 ${month} 월 ${ day } 일`;
});
 
env.addFilter('commentform',function (str) {
    const date = new Date(str) 
    const year = date.getFullYear();
    const month = (date.getMonth() +1);
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds(); 
    return `${ year}-${month}-${ day } ${hours}:${minutes}:${seconds}`;
});


// port 변수 설정 
app.set('port', process.env.PORT || 8080);

// morgan 
app.use(cors('localhost:8001')); 
app.use(morgan('dev'));
// css,js 정적파일 경로 설정 
 
// parser 
app.use(express.json({
    limit : "50mb",
}));

// form 데이터라도 urlincoded 로 보내는 경우에는 아래 미들웨어에서 처리해준다
// enctype 이 multipart/form-data 인 경우에는 못바꿔줌
// 이럴 때 multer 를 사용하면  multipart/form-data을 해석할 수 있다.
// 
app.use(express.urlencoded({ 
    extended: true,
    limit : "50mb",
}));
// 
app.use(express.static(path.join(__dirname,'public')));
app.use('/img',express.static(path.join(__dirname,'uploads')));
app.use(favicon(path.join(__dirname,'public/img','favicon.ico')));
// cookie-parser
app.use(cookieParser()); 


// 세션 등록 
app.use(session({
    // 어디에 저장할 지
    port : process.env.MYSQL_PORT,
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    // 세션 쿠키 옵션 
    cookie: {
        // 자바스크립트 공격 방지
        httpOnly: true,
        expires: new Date(Date.now() + 60000 * 1000) // 만기 10 분 
    },
    name: "user"//default : connect.sid  
}));

// passport 등록
app.use(passport.initialize());
app.use(passport.session()); 
passportConfig(); 
// 세션 검증 미들웨어 
 

// 시퀄라이즈 모델 생성(연결)
sequelize.sync({ force:false})
    .then(() => console.log('connection success'))
    .catch((err) => console.log(err));
 
    
// 라우터 등록
// 메인페이지
app.use(userCheck);

app.get('/',(req,res) => res.redirect('/community'))
app.use('/',profileRouter)
app.use('/',linkRouter);
app.use('/',projectRouter);
app.use('/community',communityRouter);
app.use('/auth',authRouter); 
app.use('/user',userRouter); 

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
    console.log(`server running on ${app.get('port')}`);
});


