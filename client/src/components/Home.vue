<template>
  <div class="wrapper">
    <side-bar></side-bar>
    <div class="bck">
      <div class="nav">
        <div>
          <h2>All</h2>
        </div>
        <router-link class="post-btn" to="/post/write">새 글 쓰기</router-link>
        <!-- <div><button><a href="/post/write">새 글 쓰기</a></button></div> -->
      </div>
      <div class="gnb">
        <div class="list-sort-left">
          <span><a class="selected" href="">최신순</a></span>
          <span><a href="">추천순</a></span>
          <span><a href="">댓글순</a></span>
          <span><a href="">스크랩순</a></span>
          <span><a href="">조회순</a></span>
        </div>
        <div class="list-sort-right">
          <span><input type="text" placeholder="검색어" /></span>
          <button class="btn">
            <div class="icon">
              <a href=""><i class="fa fa-search"></i></a>
            </div>
          </button>
        </div>
      </div>

      <!-- 공지사항과 글 아래 태그 -->
      <div class="blank">
        <div></div>
      </div>
      <!-- 일반 게시글 -->
        <ul class="top-box" v-for="(post,index) in posts" :key="index">
        <li class="list-contain">
          <div class="list-emt"></div>
          <div class="list-left">
            <div class="top">
              <span>
                <p><b>#{{post.id}}</b></p>
              </span>
              <!-- <span><a href="">okky</a></span>
              <span><a href="">Gmails</a></span>
              <span><a href="">Makeover</a></span>
              <span><a href="">Java</a></span> -->
            </div>
            <div class="buttom">
              <router-link :to="{ name: 'Post',params: { id: post.id }}">
                <h2>{{post.title}}<b></b></h2>
              </router-link>
            </div>
          </div>
          <div class="list-right">
            <span class="li-com">
              <p>40</p>
            </span>
            <span class="li-lk">
              <p>54</p>
            </span>
            <span class="li-wtc">
              <p>70k</p>
            </span>
            <div class="li-img">
              <a><img src="" /></a>
            </div>
            <div class="li-date">
              <p>작성자: {{post.username}}</p>
              <p>{{ post.created_at }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import SideBar from "./common/Sidebar";
import Api from "../services/Api";
export default {
    data(){
      return {
        posts : null
      }
    },
    created() {
      Api()
        .get(
          "/post/all",
          { withCredentials: true }
        )
        .then((res) => {
          this.posts = res.data.posts;
        })
        .catch((error) => {
          console.log("corsRequest error", error);
        });
    },
  components: {
    SideBar,
  },
};
</script>

<style>
</style>