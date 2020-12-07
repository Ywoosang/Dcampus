var vm = new Vue({
    el : "#app",
    delimiters:['${', '}'],
    data : {
        // server data 
        username: null,
        login : false, 
    },
    created : function(){
        this.isLogin(); 
    },
    methods : {
        isLogin : function(){
            var vm = this
            axios.post(`${window.origin}/main/usercheck`)
            .then((response)=>{ 
                var name = response.data['name']; 
                console.log(name);
                console.log(typeof name);
                if(name != 'guest'){
                    vm.username = name; 
                    vm.login = true; 
                }
            })
            .catch((error)=>{
                console.log(error); 
            }) 
        },
        goProject : function(){
            if(this.login === true){
                window.location.href= `${window.origin}/project`;
            }else{
                alert('로그인해주세요') 
                window.location.href= `${window.origin}/login`;
            }
        },
        goDcampus : function(){
            if(this.login === true){
                window.location.href= `${window.origin}/main`;
            }else{
                alert('로그인해주세요')
                window.location.href= `${window.origin}/login`;
            }
        },
        goRoadmap : function(){
            if(this.login === true){
                window.location.href= `${window.origin}/roadmap`;
            }else{
                alert('로그인해주세요') 
                window.location.href= `${window.origin}/login`;
            }
        },
        logout : function(){
            axios.get('/logout')
            .then((response)=>{
                alert('로그아웃 되었습니다.')
                window.location.href= `${window.origin}/`; 
            })
            .catch((error)=>{console.log(error);})
        }
    }
}) 