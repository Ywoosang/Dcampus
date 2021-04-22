const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const { User,sequelize } = require('../models');
module.exports = () => {
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
      try{
          const user = await User.findOne({
            where : { 
                authId: profile.id,
                provider :'github'
              }});
              if(user) {
                  done(null,user); 
              }else {
                  const email = profile._json.html_url;
                  const newUser = await User.create({
                    email,
                    name : profile.username,
                    authId : profile.id,
                    provider : 'github'
                  });
                  await sequelize.query(`
                    insert into Profiles (intro,UserId,img,createdAt,updatedAt) 
                    values (
                        '자기소개가 없습니다',
                        (select id from Users where email='${email}'),
                        '/img/user.png',
                        NOW(),
                        NOW()
                    );`)
                  done(null,newUser); 
              }
      } catch(err){
          done(err); 
      }}));
} 
