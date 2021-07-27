<template>
  <div class="menu">
    <div class="left-menu">
      <ul v-if="user" class="top-icon">
        <a @click="logout"><i class="fa fa-sign-out"></i></a>
        <a href="" class="user"><img src="img" /></a>
        <a><i class="fa conf fa-cog"></i></a>
      </ul>
      <ul class="bottom-icon">
        <a href="" title="그룹 깃허브" class="link">
          <i class="fa hub fa-github"></i
        ></a>
        <a href="" title="멤버 목록" class="link"
          ><i class="fa fa-users"></i
        ></a>
      </ul>
    </div>
    <div class="right-menu">
      <div class="title">
        <router-link to="/">WLearn</router-link>
      </div>
      <div class="menu-text">
        <div   class="notuser" v-if="!user">
          <a href="/auth/login" class="login">로그인</a
          ><a href="/auth/signup" class="signup">회원가입</a>
        </div>
        <a href="">
          <div>All</div>
        </a>
        <a href="">
          <div>공지사항</div>
        </a>
        <a href="">
          <div>JavaScript</div>
        </a>
        <a href="">
          <div>Node.Js</div>
        </a>
        <a href="">
          <div>MySQL</div>
        </a>
        <a href="">
          <div>학습링크모음</div>
        </a>
        <a href="">
          <div>추천강의/캠프</div>
        </a>
        <a href="">
          <div></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import Auth from '../../services/Authentication.js';

export default {
  data(){
    return {
      user : false,
      img : '',
    }
  },
};
</script>

<style>
.menu{
    display: flex;
    width: 210px;
    top: 0;
    z-index: 1;
    position:fixed; 
    height : 100vh;
}
/* 좌측 메뉴 */
.left-menu{
    height: inherit;
    padding-top: 10px;
    width: 60px;
    background-color: #ffffff;
    z-index: 1001;
    display: flex;
    flex-direction: column;
}
.left-menu ul{
    padding:0;
}
.left-menu .top-icon{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-bottom: 60px;

}
.left-menu .top-icon a{
    text-align: center;
    list-style: none;
    width: 60px;
    height: 60px;
    display: block;
    /* border: 1px solid red; */
}
.left-menu .top-icon a:first-child{
    line-height: 60px;
}
.left-menu .top-icon a .conf{
    height: 40px;
    line-height: 40px;
    width: 60px;
    cursor: pointer;
}
.left-menu .top-icon .user{
    display: inline-block;
    width: 45px;
    height: 45px;
    margin:0;
    margin-left :6px;
    border-radius: 50%;
    overflow: hidden;
}
.left-menu .top-icon .user img{
    width:inherit;
    height:inherit;
    object-fit: cover;
}
.left-menu .bottom-icon a{
    display: block;
    list-style: none;
    text-align: center;
    width: inherit;
    height: 60px;
    line-height: 60px;
}
.left-menu .bottom-icon a i{
    color: black;
    line-height: 60px;
}
.left-menu .bottom-icon a .hub{
    font-size:20px;
}
/* 우측 메뉴 */
.right-menu{
    /* border: 1px solid red; */
    height:inherit;
    width: 150px;
    background-color:#ffe600;
    top: 0;
    left: 60px;
}
.right-menu .title{
    /* border: 1px solid red; */
    height: 60px;
}
.right-menu .notuser{
    margin-bottom: 40px;
    font-weight: 400;
    display: flex;
    text-align: center;
}
.right-menu .notuser .login{
    padding:4px;
    position:relative;
    flex:1;
    transition: 0.5s;
    box-sizing: border-box; 
    border: 1px solid transparent; 

}
 .right-menu .notuser .login:hover{
     background-color: white;
     border:1px solid rgb(124, 124, 124); 
 }
.right-menu .notuser .signup{
    transition: 0.5s;
    flex:1;
    padding:4px;
    box-sizing: border-box;
    border: 1px solid transparent; 
}
.right-menu .notuser .signup:hover{
    background-color: white;
    border:1px  solid rgb(124, 124, 124);
}
.right-menu .title h1{
    color: white;
    margin-top: 10px;
    margin-left: 15px;
    font-size: 30px;
    font-weight: normal;
}
.right-menu .menu-text a div{
    /* border: 1px solid red; */
    height: 30px;
    margin-left: 15px;
    font-size: 13px;
}
.right-menu .menu-text a{
    color: rgb(0, 0, 0);
}
</style>