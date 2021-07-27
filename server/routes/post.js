const express = require('express');
const router = express.Router();
const pool = require('../database/connection.js');
const { upload } = require('../app.js');
const path = require('path');

router.get('/all', async (req, res) => {
    try {
        // 커넥션 풀 생성
        const connection = await pool.getConnection(async conn => conn);
        const [rows] = await connection.query(`
        SELECT P.title,P.id,P.created_at, U.name AS username
        FROM Post P 
        LEFT JOIN User U ON U.id = P.user_id`);
        connection.release();
        res.json({ posts: rows })
    } catch (err) {
        // 쿼리에서 오류 발생 시
        console.log('Query Error');
        connection.release();
        next(err);
    }
});

router.post('/', upload.single('file'), async (req, res, next) => {
    const [file, title, content] = [req.file, req.body.title, req.body.content];
    try {
        const connection = await pool.getConnection(async conn => conn);
        // 파일 첨부 시 
        if (file) {
            const [post] = await connection.query(`
                INSERT INTO Post (title,content,user_id) 
                VALUES ('${title}','${content}',4);
            `);
            await connection.query(`
                INSERT INTO File (filename, mimetype, url, owner_id, post_id)
                VALUES('${path.basename(file.originalname)}',
                '${file.mimetype}','${file.location}',4,'${post.insertId}')
            `);
            // 로깅 구현 필요
            connection.release();
        } else {
            await connection.query(`
            INSERT INTO Post (title,content,user_id) 
            VALUES ('${title}','${content}',4);
            `);
            connection.release(); 
        }
        res.end();
    } catch (err) {
        connection.release(); 
        next(err);
    }

})


router.get('/:id',async(req,res,next)=>{
    try{
        const connection = await pool.getConnection(async conn => conn);
        // Post 와 File 
        const id = req.params.id;
        const [post] = await connection.query(`
            SELECT P.title,P.content,P.created_at,P.updated_at,U.name AS username,F.id AS fileid 
            FROM Post P 
            LEFT OUTER JOIN File F ON F.post_id = P.id 
            LEFT JOIN User U ON P.user_id = U.id
            WHERE P.id = ${id}
        `);
        connection.release(); 
        res.json({post})
    }catch(err){
        next(err);
    }
})



module.exports = router;
