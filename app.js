const express = require('express');
const path = require('path');
const morgan = require('morgan')
const nunjucks = require('nunjucks');
const app = express();
const { sequelize, User, Link, Project } = require('./models');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const session = require('express-session');
const favicon = require('serve-favicon'); 

app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.set('port', process.env.PORT || 8080);


app.use(morgan('dev'));

// 세션 등록 
app.use(session({
    secret: "ywoosang",
    resave: false,
    saveUninitialized: false,
    // 세션 쿠키 옵션 
    cookie: {
        // 자바스크립트 공격 방지
        httpOnly: true,
        expires: new Date(Date.now() + 60000 * 100) // 만기 10 분 
    },
    name: "user"// 기본적으로 connect.sid 로 되어 있다. 암호화되어 있음
}));
// app.use(express.static(path.join(__dirname,'/public ')));

// css,js 정적파일 경로 설정  css/파일명 으로 연결 가능
app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))
app.use(favicon(path.join(__dirname,'static/img','favicon.ico')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req,res,next)=>{
    if(req.session.user){
        req.data = req.session.user;
    }else{
    }
    next();
})

// 시퀄라이즈 모델 생성(연결)
sequelize.sync({ force: false })
    .then(() => console.log('connection success'))
    .catch((err) => console.log(err));

app.route('/')
.get((req, res) => {
    let login,name; 
    if(req.data){
        name = req.data.name; 
        login = true; 
    }else{
        login = false;
    }
    res.render('index',{login,name});
})
.post((req,res)=>{
    if(req.data){
        res.json({isLogin:true})
    }else{
        res.json({isLogin:false})
    }
})

app.route('/signup')
    .get((req, res) => {
        res.render('signup');
    })
    .post((req, res, next) => {
        const nickname = req.body.id;
        const name = req.body.name;
        const password = req.body.password;
        console.log(req.body);
        User.create({
            name: name,
            nickname: nickname,  
            password: password
        }).then(() => {
            console.log('seccess');
        }).catch((err) => {
            console.log(err);
        });
        res.status(302).redirect('/')
    });

app.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post(async (req, res, next) => {
        if(req.session.user){
            req.session.destroy(()=>{
                    console.log('세션 삭제 성공');
                }
            );//세션정보 삭제
        }
        const nickname = req.body.id;
        const password = req.body.password;
        let user;
        try {
            user = await User.findOne({
                attributes: ['id','name', 'nickname', 'password'],
                where: {
                    nickname: {
                        [Op.eq]: nickname
                    }
                }
            });
            console.log(user.dataValues.password, password);
            if (user.dataValues.password == password && user.dataValues.nickname == nickname) {
                console.log('로그인 성공1');
                //req.session 으로 세션 생성 
                req.session.user = {
                    id : user.dataValues.id,
                    name : user.dataValues.name,
                    nickname: nickname,
                }
                console.log('로그인 성공');
                res.status(302).redirect('/');
            }
        } catch (err) {
            console.log('없는 사용자');
        }
        res.status(302).redirect('/signup');
    }
    );
 
app.get('/logout',(req,res)=> {
    if(req.session.user){
        req.session.destroy(()=>{
            console.log('세션 삭제 성공');
            }
        );//세션정보 삭제
    }
    res.status(302).redirect('/')
})

app.route('/link')
.get(async(req,res)=>{
    if(!req.data){
        res.status(302).redirect('/'); 
        return;
    }
    const id = req.data.id
    const links = await Link.findAll({
        attributes : [ "id","name","content"],
        where :{
            UserId  : {
                [Op.eq] : id 
            }
        }
    });
    const responseArray = []; 
    links.forEach(item=>{
        let obj = {} 
        obj.linkId = item.dataValues.id; 
        obj.linkName = item.dataValues.name;
        obj.linkUrl = item.dataValues.content;
        responseArray.push(obj);
    }); 
    res.render('link',{links:responseArray})
})
.post(async (req,res)=>{
    const linkName = req.body.linkName;
    const linkUrl = req.body.linkUrl;
    const id = req.data.id; 
    try{
        const link = await Link.create({
                name : linkName,
                content : linkUrl,
                createdAt: Date.now(),
                updatedAt:  Date.now(),
                UserId : id
            });
        console.log('링크아이디',link.id);
        res.json({linkId:link.id}); 
    }catch(err){
        next(err);
    }
})

app.delete('/link/:id',(req,res,next)=>{
    const linkId = req.params.id;
    console.log(req.params);
    Link.destroy({
        where: {
            id : {
                [Op.eq] : Number(linkId) 
            }
        }
    }).then((response)=>{
        console.log(response);
        res.json({ success : '삭제 되었습니다.'});
    }).catch((error)=>{
        res.json({ warn :'처리 중 오류가 발생했습니다. 다시 시도해주세요.'}); 
        next(error);
    });
}); 

app.get('/project',(req,res)=>{
    if(!req.data){
        res.status(302).redirect('/'); 
        return;
    }
    res.render('project');
}); 

app.get('/community',(req,res)=>{
    if(!req.data){
        res.status(404).redirect('/'); 
        return;
    }
    res.render('community');
}); 

// 404 처리 
app.use((req, res, next) => {
    res.send('404 not found');
});

// error 처리 
app.use((err, req, res, next) => {
    console.error(err);
    res.send('일시적인 오류가 발생했습니다.'); 
});

app.listen(app.get('port'), () => {
    console.log('express start');
});


