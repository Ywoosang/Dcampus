<template>
<div class="wrapper"> 
      <side-bar></side-bar>
    <div class="background">
      <div class="log-background">
            <div class="log-in">
                <div class="title">
                    <p><b>아이디 로그인</b></p>
                </div>
                <div class="wrap-item">
                    <div class="item">
                        <input v-model="email" type="text" placeholder="이메일">
                    </div>
                    <div class="item">
                        <input v-model="password" type="text" placeholder="비밀번호">
                    </div>

                    <div class="check-box">
                        <input type="checkbox">
                        <p><b>로그인 유지</b></p>
                    </div>
                    <div class="login-btn">
                        <button @click="login" >로그인</button>
                    </div>
                </div>
            </div>
        </div>
        <sns></sns>
      </div>
    </div>
</template>

<script>
import SideBar from './common/Sidebar';
import Sns from './common/Sns.vue';
// import Auth from '../services/Authentication.js'; 

export default {
    components : {
        SideBar,
        Sns
    },
    data(){
        return {
            email : '',
            password :''
        }
    },
}
</script>

<style>
.log-background .log-in .title{
    width: 387px;
    height: 60px;
    text-align: center;
    top: 66px;
    margin-left: 240px;
    border: 1px solid lightgray;
    background-color: #FFFFFF;
}
.log-background .log-in .title p{
    font-size: 17px;
    color: gray;
}
.wrap-item{
       text-align: center;
    position: relative;
    background-color: #FFFFFF;
    border: 1px solid lightgray;
    width: 387px;
    height: 240px;
    margin-left: 240px;
    border-top: none;
}

.wrap-item .item input{
    border-radius:5px;
    width: 296px;
    height: 41px;
    border: 1px solid lightgray;
    margin-top: 10px;
}

.wrap-item .item input:focus{
    border: 1px solid black;
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
.login-btn button{
    color:white;
    display: inline-block;
    width: 295px;
    height: 35px;
    background-color: #0059AB;
    border: none;
    border-radius: 4px;
}
.login-btn button:hover{
    background-color: #286090;
}
.login-btn a button{
    color: white;
    box-sizing: border-box;
}
</style>