<template>
    <div class="sns-join">
        <div class="title">
          <p><b>SNS로 로그인</b></p>
        </div>
        <div class="wrap-item2">
          <a @click="githubStrategy"><div>깃허브 로그인</div></a>
          <a @click="googleStrategy"><div>구글 로그인</div></a>
          <a @click="facebookStrategy"><div>페이스북 로그인</div></a>
          <a @click="kakaoStrategy"><div>카카오 로그인</div></a>
          <a @click="naverStartegy"><div>네이버 로그인</div></a>
        </div>
    </div>
</template>

<script>
// import Auth from '../../services/Authentication.js'

export default {
   
}
</script>

<style>

</style>