<template>
  <div class="wrapper">
    <side-bar></side-bar>
    <div class="bck">
      <div class="nav">
        <div>
          <h2>글 작성</h2>
        </div>
        <div @click="postPost" class="post-btn" to="/post/write">등록하기</div>
      </div>
      <div class="post">
        <div class="post-title">
          <input v-model="postTitle" type="text" />
        </div>
        <div class="post-content">
          <textarea v-model="postContent"></textarea>
        </div>
      </div>
      <input type="file" accept=".pdf" @change="fileChange" />
    </div>
  </div>
</template>

<script>
import SideBar from "./common/Sidebar";
import Api from "../services/Api";

export default {
  data() {
    return {
      file: null,
      postTitle: "",
      postContent: "",
    };
  },
  methods: {
    postPost() {
      // modal 컴포넌트 이용할 것
      if(this.postTitle.trim() === ""){
        return alert('제목이 비었습니다.')
      } else if( this.postContent.trim() ===""){
        return alert('내용이 비었습니다.')
      }
      // data 검증 후 axios 전송할 것
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("title", this.postTitle);
      formData.append("content", this.postContent);
      Api()
        .post("/post",formData,{
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
            // 홈으로 이동
            location.href = `${window.origin}`;
        })
        .catch((err) => {
          // 오류 시 처리 요망
          console.log(err);
        });
    },
    fileChange(e) {
      this.file = e.target.files[0];
    },
  },
  components: {
    SideBar,
  },
};
</script>

<style>
* {
}
.post {
  box-sizing: border-box;
}
.post-title input,
.post-content textarea {
  width: 100%;
}
.post-title {
  margin-bottom: 1rem;
}
.post-title input {
  height: 2.5rem;
  font-size: 1.5rem;
}
.post-content textarea {
  height: 50vh;
  font-size: 1.2rem;
}
</style>