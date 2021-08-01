const jwt = require('jsonwebtoken')

const authenticateToken = (req,res,next) => {
    // 토큰 헤더
    const authHeader = req.headers['authorization']
    // authHeader 존재하면 authHeader.split(" ")[1] 를 token 에 부여
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token); 
    // 존재하지 않으면 false 가 token 에 부여
    if(!token) return res.sendStatus(401);
    // 토큰 검증
    // essentially want to put the same user inside both tokens 
    // to easily create a new token from refresh token  whitch uses the same user 
    // refreshToken 은 만기 설정하지 않는다 - 직접 만료 시키는 것 
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}
const generateAccessToken = (user) => {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '30s'
    });
}

exports.authenticateToken  = authenticateToken; 
exports.generateAccessToken =  generateAccessToken; 

 


