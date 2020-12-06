var vm = new Vue({
    el : "#app-total",
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
            axios.post(`${window.origin}/datemaker/main/usercheck`)
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
        goProfile : function(){
            if(this.login === true){
                window.location.href= `${window.origin}/datemaker/profile`;
            }else{
                alert('로그인해주세요') 
            }
        },
        goCart : function(){
            if(this.login === true){
                window.location.href= `${window.origin}/datemaker/cart`;
            }else{
                alert('로그인해주세요')
            }
        },
        logout : function(){
            axios.get('/datemaker/logout')
            .then((response)=>{
                alert('로그아웃 되었습니다.')
                window.location.href= `${window.origin}/`; 
            })
            .catch((error)=>{console.log(error);})
        }
    }
}) 