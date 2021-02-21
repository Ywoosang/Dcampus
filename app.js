const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const app = express();
const { sequelize } = require('./models');
const session = require('express-session');
const favicon = require('serve-favicon'); 
// Mysql 세션저장 
const MySQLStore = require('express-mysql-session')(session);
const fileUpload = require('express-fileupload');  
// 라우터
const indexRouter = require('./routes');
const profileRouter = require('./routes/profile.js'); 
const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login.js'); 
const logoutRouter = require('./routes/logout.js'); 
const linkRouter = require('./routes/link.js'); 
const projectRouter = require('./routes/project.js'); 
const communityRouter = require('./routes/community.js'); 

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
nunjucks.configure('views', {
    express: app,
    watch: true,
});

// port 변수 설정 
app.set('port', process.env.PORT || 8080);

// express-fileupload 이용
app.use(fileUpload()); 

// css,js 정적파일 경로 설정 
app.use('/css', express.static('./static/css')); 
app.use('/js', express.static('./static/js')); 
app.use(morgan('dev'));

// 세션 등록 
app.use(session({
    // 어디에 저장할 지
    port : 3307,
    secret: "ywoosang",
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
app.use(favicon(path.join(__dirname,'static/img','favicon.ico')))

// parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// 세션 검증 미들웨어 
app.use((req,res,next)=>{
    if(req.session.user){
        req.data = req.session.user;
    }else{
    }
    next();
})

// 시퀄라이즈 모델 생성(연결)
sequelize.sync({ force:true })
    .then(() => console.log('connection success'))
    .catch((err) => console.log(err));
 
    
// 라우터 등록
// 메인페이지
app.use('/',indexRouter); 
app.use('/',profileRouter)
app.use('/',signupRouter);
app.use('/',loginRouter);
app.use('/',logoutRouter);
app.use('/',linkRouter);
app.use('/',projectRouter);
app.use('/',communityRouter);

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
    console.log('express start');
});


