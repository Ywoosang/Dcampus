<template>
  <div class="wrapper">
      <side-bar></side-bar>
    <div class="background">
      <div class="join-background">
        <div class="join-in">
          <div class="title">
            <p><b>이메일로 가입하기</b></p>
          </div>
          <div class="wrap-item-up">
                <div class="item">
              <input type="text" placeholder="이메일" />
            </div>
                 <div class="item">
              <input type="text"   placeholder="비밀번호" />
            </div>
                <div class="item">
              <input type="text"  placeholder="닉네임" />
            </div>
            <div class="check-box">
              <input type="checkbox" />
              <p><b>이메일 수신 동의</b></p>
            </div>
            <div class="formation-btn">
              <button @click="signUp"><a > 계정 만들기</a></button>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
        <sns></sns>
      <!--  -->
    </div>
  </div>
</template>

<script>
import SideBar from './common/Sidebar';
import Sns from './common/Sns.vue';
// import Auth from '../services/Authentication';

export default {
  components: {
      SideBar,
      Sns
  },
  data(){
      return { 
         email:'',
         password:'',
         name : '',
      }
  }
};
</script>

<style>
.background{
    display: flex;
    padding-top: 50px;
}
.background .top-title h2{
    color: gray;
}
.join-background {
    text-align: center;
}
.join-background .join-in{
    height: 400px;
}
.join-background .join-in .title{
    width: 387px;
    height: 60px;
    margin-left: 240px;
    border: 1px solid lightgray;
    background-color: #FFFFFF;
}
.join-background .join-in .title p{
    font-size: 17px;
    color: gray;
}
.wrap-item-up{
    position: relative;
    background-color: #FFFFFF;
    border: 1px solid lightgray;
    width: 387px;
    height: 275px;
    margin-left: 240px;
    border-top: none;
}

.wrap-item-up .item input{
    border-radius:5px;
    width: 350px;
    height: 40px;
    border: 1px solid lightgray;
    margin-top: 10px;
}
.wrap-item-up .item input::placeholder{
    margin-left: 15px;
}

.wrap-item-up .item input:focus{
    border:1px solid black;
}
.check-box{
    display: flex;
    /* border: 1px solid red; */
    position: relative;
}
.check-box input{
    position: absolute;
    width: 20px;
    height: 20px;
    display: inline-block;
    top: 15px;
    left: 40px;
}
.check-box p{
    /* border: 1px solid red; */
    top: 15px;
    left: 50px;
    margin-left: 65px;
}

.formation-btn button{
    display: inline-block;
    width: 295px;
    height: 35px;
    background-color:#0059AB;
    border: none;
    border-radius: 4px;
}
.formation-btn button:hover{
    background-color: #337AB7;
}
.formation-btn button a{
    color: white;
    box-sizing: border-box;
}
/* sns 로그인 부분 */
.sns-join{
    margin-left: 30px;
}
.sns-join .title{
    text-align: center;
    border: 1px solid lightgray;
    border-bottom: none;
    width: 388px;
    height: 57px;
    background-color: #fff;
}
.sns-join .title p{
    color: gray;
}
.sns-join .wrap-item2{
    border: 1px solid lightgray;
    width: 388px;
    height: 276px;
    background-color: #fff;
    text-align: center;
}
.sns-join .wrap-item2 div{
    width: 300px;
    height: 35px;
    border: 1px solid lightgray;
    margin: 15px;
    border-radius: 5px;
    margin-left: 45px;
    font-weight: 500;
    line-height: 35px;
    
}
.wrap-item2 a:nth-child(1) div{
    background-color: black;
    color: white;
}
.wrap-item2 a:nth-child(1) div::before{
    margin-right: 10px;
    content:"\f09b";
    font-family : 'fontawesome';
}
.wrap-item2 a:nth-child(2) div{
    background-color:#FFFFFF;
    color:black;
}
.wrap-item2 a:nth-child(2) div::before{
    margin-right: 10px;
    content:"\f1a0";
    font-family : 'fontawesome';
}
.wrap-item2 a:nth-child(3) div{
    background-color: #1877F2;
    color: white;
}
.wrap-item2 a:nth-child(3) div::before{
    margin-right: 10px;
    content:"\f09a";
    font-family : 'fontawesome';
}
.wrap-item2 a:nth-child(4) div{
    background-color: #FEE500;
    color: #3B1E1E;
}
.wrap-item2 a:nth-child(4) div::before{
    margin-right: 6px;
    content:"Kakao";
    font-weight: bold;
}
.wrap-item2 a:nth-child(5) div{
    background-color: #1EC800;
    color: white;
}
.wrap-item2 a:nth-child(5) div::before{
    margin-right: 6px;
    content:"N";
    font-family : 'Arial';
    font-weight: bold;
}
.wrap-item2 a:hover div{
    box-shadow: 2px 2px 10px rgba(134, 128, 128, 0.432);
}
</style>