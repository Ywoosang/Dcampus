<template>
  <div id="app">
    <!-- 렌더링해주는 router-view 태그 -->
    <router-view></router-view>
  </div>
</template>

<script>
import router from "./router";

export default {
  name: 'App',
  router:router
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
/* body */
body{
    font-family: 'Noto Sans KR', sans-serif;
    margin : 0;
    color : #222;
    font-weight : 300;
    background-color:rgb(240, 238, 238);
}
* {
    font-family: 'Noto Sans KR', sans-serif;
}
*:focus { outline:none; }
ul {
    margin:0;
    padding:0;
    list-style: none;
}
/* Reset Css */
a {
    text-decoration: none;
    color : #222;
}
h1,h2,h3,h4,h5,h6{
    margin:0;
    font-weight: normal;
}
button {
    cursor:pointer;
    outline: none;
}
input,textarea,select{
    outline : none;
}

* {
  /* border: 1px solid black;   */
  box-sizing: border-box;
}
.bck {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 1280px;
  padding-left: 230px;
}
.bck .nav {
  height: 45px;
  position: relative;
  margin-top: 30px;
  overflow: hidden;
}

.bck .nav h2 {
  font-size: 26px;
  font-weight: normal;
  float: left;
}
.bck .nav .post-btn {
  cursor: pointer;
  float: right;
  width: 130px;
  height: 35px;
  line-height: 35px;
  background-color: #5cb85c;
  border: none;
  padding-left: 1rem;
  box-sizing: border-box;
  color: white;
  font-weight: 500;
  margin-top: 5px;
}
.bck .nav .post-btn::before {
  content: "\f040";
  font-family: "fontawesome";
  margin: 5px;
}
.bck .nav .post-btn::hover {
  background-color: #5cb85c;
}
.nav a {
  color: white;
}
/*  */
.gnb {
  display: flex;
  justify-content: space-between;
}

.list-sort-left {
  margin-top: 30px;
  display: inline-block;
  width: 390px;
}
.list-sort-left span {
  margin: 7px;
}
.list-sort-left span a {
  position: relative;
  font-size: 15px;
  font-weight: 400;
}
.list-sort-left span a:hover::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: gray;
  bottom: 0;
}
.list-sort-right {
  margin-top: 20px;
  display: flex;
}
.list-sort-right span {
}
.list-sort-right span input {
  height: 30px;
  width: 340px;
  border: 1px solid gray;
  border-radius: 2px 0 0 2px;
}
.list-sort-right .btn .icon {
  display: flex;
}
.list-sort-right .btn .icon a {
  display: inline-block;
  flex: 1;
  padding-bottom: 4px;
}
.list-sort-right .btn .icon i {
  font-size: 16px;
}
.list-sort-right span input:focus {
  box-shadow: 0 0 10 #0059ab;
}
.list-sort-right .btn {
  /* border: 1px solid red; */
  width: 35px;
  height: 34px;
  margin-left: -30px;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 0 2px 2px 0;
}
.list-sort-right .btn:hover {
  background-color: #e6e6e6;
}
.list-sort-right .btn .fa {
  font-size: 12px;
  color: black;
}
.list-emt {
  width: 3px;
  background-color: rgb(15, 14, 14);
}

/* 게시물 1개 해당 */
.top-box {
  padding: 0;
  border: 1px solid rgb(199, 199, 199);
  border-left: none;
  height: 65px;
  background-color: white;
}
.top-box li {
  display: flex;
  justify-content: space-between;
}

.top-box li .list-left {
  position: relative;
}
.top-box li .list-left::before {
  content: "";
  position: absolute;
  width: 3px;
  height: inherit;
  left: -3px;
  background-color: #3a93de;
}
.list-left .top {
  height: 31px;
}

.list-left .top span p {
  color: gray;
  font-size: 12px;
  margin-left: 11px;
  margin-top: 8px;
}
.list-left .top .icon i {
  font-size: 12px;
  margin-bottom: 9px;
}
.list-left .top span {
  font-size: 12px;
  display: inline-block;
  margin: 1px;
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 3px;
}
.top span a {
  color: white;
  background-color: #bbbbbb;
  padding: 2px;
  box-sizing: border-box;
  border-radius: 3px;
}
.top span:nth-child(2) {
  color: white;
  padding: 1px;
  box-sizing: border-box;
}

.buttom a h2 {
  margin: 0 0 5px 10px;
  margin-left: 10px;
  font-size: 16px;
}
.button a h2 {
  color: #23527c;
}

.list-right {
  margin-left: auto;
  width: 340px;
  height: inherit;
  position: relative;
  display: flex;
}
.list-right span {
  top: 5px;
  margin-left: 5px;
  display: block;
  font-size: 13px;
}
.list-right .li-com {
  line-height: 31px;
  /* border: 1px solid red; */
}
.list-right .li-com p::before {
  content: "\f0e5";
  font-family: "fontawesome";
  margin: 0;
  padding: 3px;
}

.list-right .li-lk {
  line-height: 31px;
  /* border: 1px solid red; */
}
.list-right .li-lk p::before {
  content: "\f164";
  font-family: "fontawesome";
  padding: 3px;
}
.list-right .li-wtc {
  /* border: 1px solid red; */
  line-height: 31px;
}
.list-right .li-wtc p::before {
  content: "\f06e";
  font-family: "fontawesome";
  padding: 3px;
}
.list-right .li-img {
  width: 60px;
  margin-left: 10px;
}
.list-right .li-img a {
  display: block;
}
.list-right .li-img a img {
  width: 60px;
  height: inherit;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 5px;
}

.list-right .li-date {
  display: flex;
  flex-direction: column;
  height: inherit;
  justify-content: center;
}
.list-right .li-date p {
  font-weight: bold;
  font-size: 12px;
  margin: 0 0 0 15px;
}
.blank {
  /* border: 1px solid red; */
  height: 50px;
  margin-left: 250px;
}
.top-box {
  margin: 0;
}
.top-box1 li .list-left {
  border: 1px solid gray;
  width: 800px;
  height: 55px;
  margin-left: 210px;
  position: relative;
}
.top-box1 li .list-left::before {
  content: "";
  position: absolute;
  width: 3px;
  height: inherit;
  background-color: #3a93de;
}
/* 자바스크립트 */
.list-sort-left .selected {
  font-weight: 500;
}
</style>
