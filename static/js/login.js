'use strict'
const validate = {
    form  : document.getElementById('form'), 
    user_email  : document.getElementById('inputId'),
    user_passwd : document.getElementById('inputPassword'),
    inputTag : document.getElementsByClassName('input'),
    setEvent : function(){
        this.form.onsubmit = this.formCheck.bind(validate)
        this.user_email.onclick = this.resetInput.bind(validate);
        this.user_passwd.onclick = this.resetPasswd.bind(validate);
        this.user_email.onkeyup = this.spaceCheck.bind(validate,this.user_email);
        this.user_passwd.onkeyup= this.spaceCheck.bind(validate,this.user_passwd);
       
    },
    formCheck : function(e){
        const check1 =  /[0-9]/;    //숫자 포함 여부
        const check2 = /[a-zA-Z]/;  //문자 포함 여부
        const check3 =  /[~!@#$%^&*()_+|<>?:{}]/;  //특수문자 포함 여부
        const emailcheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        // 이름 유효성 검사 
        if(this.nonCheck(e)){
            location.reload();
            return
        }
        // 아이디 유효성 검사 
        if(emailcheck.test(this.user_email.value) == false){
            this.user_email.value = '메일 형식이 올바르지 않습니다.'
            this.user_email.style.backgroundColor = '#ffe0e0'; 
            e.preventDefault()
        } 
        // 비밀번호 유효성 검사 
        if(this.user_passwd.value.length<8 || !check1.test(this.user_passwd.value) || !check2.test(this.user_passwd.value) || !check3.test(this.user_passwd.value)){
            this.user_passwd.type = 'text';
            this.user_passwd.value = '8자 이상 문자,숫자,특수문자로 구성해 주세요';
            this.user_passwd.style.backgroundColor = '#ffe0e0';
            e.preventDefault()
        }
    },
    spaceCheck : function(node,e){
        if(node.value.search(/\s/) != -1){   
            node.value = node.value.replace(/ /gi,""); 
        }
        e.target.style.backgroundColor = 'white';
    },
    resetInput : function(e){
        e.target.value = '';
        e.target.style.backgroundColor = 'white';
    },
    resetPasswd : function(e){
        e.target.type ='password';
        e.target.value = '';
        e.target.style.backgroundColor = 'white';
       
    },
    nonCheck : function(e){
        if(this.user_email.value == '이메일을 입력해 주세요' ||   this.user_passwd.value =='비밀번호를 입력해 주세요' ){
            e.preventDefault()
            alert('값을 입력해 주세요')
            return true 
        }
    }, 
    
}
validate.setEvent();


 
 