const express = require('express');
const router = express.Router();
const { sequelize, Comment, Post, User, Profile } = require('../models');
const multer = require('multer');
const path = require('path');
const { QueryTypes } = require('sequelize');
 
const upload = multer({
    storage : multer.diskStorage({
        destination(req,file,cb) {
            // 실제 파일은 uploads 폴더 안에 들어있음 
            cb(null,'uploads/')
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            // 파일명 + 날짜(같은 이름 사진 덮어씌워지는것을 막기 위해)
            cb(null,path.basename(file.originalname,ext) + Date.now()+ ext)
        },
    }),
    limits : { fileSize : 5 * 1024 * 1024},
});

router.get('/', async (req, res, next) => {
    // 게시물들 찾아서 보여줌
    try {
        req.session.refresh = true;
        let posts = await Post.findAll({ order: [['id', 'DESC']] });
        let newPosts = [];
        for (let post of posts) {
            const profile = await Profile.findOne({ where: { id: post.UserId } });
            const postCommentsNum = (await Comment.findAll({ where:{ PostId: post.id }})).length;
            post.dataValues.img = profile.img;
            post.dataValues.num = postCommentsNum;
            newPosts.push(post);
        }
        return res.render('index', { newPosts,login:req.isLogin, img:req.profile.img });
    } catch (err) {
        console.error(err);
        next(err);
    };
});

// 게시물 작성 페이지
router.route('/post')
    .get((req, res) => {
        res.render('post',{login:req.isLogin, img:req.profile.img});
    })
    .post(async (req, res, next) => {
        const title = req.body.title;
        const content = req.body.editordata;
        const user = req.user.name;
        const UserId = req.user.id;
        try {
            await Post.create({
                title,
                content,
                user,
                UserId
            });
            res.redirect('/community');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

// 이미지부터 먼저 렌더링될 수 있도록(압축하는데 시간이 많이 걸릴 수 있음)
// tsum
router.post('/upload/img',upload.single('file'),(req,res)=>{
    console.log('실행됌');
    console.log('전송된 파일',req.file);
    // src 에 붙는 이미지 GET 요청 주소는 img 
    // 요청과 실제 파일 주소가 다르다 = express.static 
    res.json({url:`/img/${req.file.filename}`});
});
 
// 섬머노트 사용 방법
// 이미지 업로드 -> 이벤트 캐치 -> 백엔드단에 request -> multer 를 통한 업로드
// -> 이미지 경로를 클라이언트에게 전송 -> 이미지 업로드
  

router.route('/post/:id')
    .get(async(req, res,next) => {
        
        // 게시물 번호에 해당하는 내용 띄워줌
        // 해당 게시물 번호에 해당하는 댓글들 가져옴
        try{ 
        console.log(req.session.refresh);
        if(req.session.refresh){
            await sequelize.query(`UPDATE Posts SET views = views+1 where id = ${req.params.id}`,{type: QueryTypes.UPDATE})
        }
        req.session.refresh = false
        console.log(req.session.refresh);
        const post = await Post.findOne({where : { id: req.params.id}}); 
        const img = await sequelize.query(`select img from Profiles where UserId = (select UserId from Posts where id=${req.params.id});`, { type: QueryTypes.SELECT })
        console.log(img[0].img);
        const comments = await Comment.findAll({where : { PostId : req.params.id}});
        res.render('comment',{ post,comments,login:req.isLogin, img:req.profile.img,crrUser:req.user.name, authImg:img[0].img });    
        } catch(err){
            console.error(err);
            next(err); 
        }
    })
    .post(async (req, res) => {
        // 댓글 기능
        const content = req.body.data.content;
        const user = req.user.name;
        const UserId = req.user.id;
        const PostId = req.params.id; 
        console.log(content,user,UserId,PostId);
        await Comment.create({
            content,
            user,
            UserId,
            PostId
        }); 
        res.end();
    })

router.get('/rec',async (req,res)=>{
    // 
    const posts = await Post.findAll({ order: [['id', 'DESC']] });
    const sortedPosts = posts.slice(0,1);
    // 
    for (const post of posts) {
        // 알고리즘
        // 댓글이 적은순으로 정렬
        // 1.현재 post 
        // 2. 기존 배열돌면서 이전 인덱스보다 같거나 크고 이후 인덱스 작거나 같은 인덱스 찾기
        //작은순부터 배치
        const profile = await Profile.findOne({ where: { id: post.UserId } });
        const postCommentsNum = (await Comment.findAll({ where:{ PostId: post.id }})).length;
        post.dataValues.img = profile.img;
        post.dataValues.num = postCommentsNum;
        if(posts.indexOf(post) ==0) continue;
        for(const [index,item] of sortedPosts.entries()){
           const itmCommentsNum = (await Comment.findAll({where :{ PostId : item.id }})).length; 
           if(postCommentsNum <= itmCommentsNum){
               sortedPosts.splice(index,0,post);
               break; 
           } else if(index == sortedPosts.length-1){
               sortedPosts.push(post);
               break;
           }; 
        };
    };
    const newPosts = []
    sortedPosts.forEach(el => {
        newPosts.unshift(el);
    });
    return res.render('index', { newPosts,login:req.isLogin, img:req.profile.img });
});



module.exports = router; 
