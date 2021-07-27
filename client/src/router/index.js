import Vue from 'vue';
import VueRouter from 'vue-router';
import SignUp from '@/components/SignUp.vue';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue'; 
import RegisterPost from '@/components/RegisterPost.vue';
import Post from '@/components/Post.vue'; 

Vue.use(VueRouter);

export default new VueRouter({
    // history 객체의 pushState() API 사용하기 위해 모드변경
    mode : "history", 
    routes : [
        {
            path : '/auth/signup',
            name : 'SignUp',
            component : SignUp
        },
        {
            path : '/',
            name : 'Home',
            component : Home
        },
        {
            path : '/auth/login',
            name : 'Login',
            component : Login
        },
        {
            path : '/post/write',
            name : 'Register',
            component : RegisterPost,
        },
        {
            path : '/post/:id',
            name : 'Post',
            component : Post,
            props: true
        }
    ]
})