const el = cls => document.getElementsByClassName(cls)[0];
const goLink = el('go-link'); 
const goProject =  el('go-project');
const goCommunity = el('go-community');
const goObj = {goLink,goProject,goCommunity};

console.log(goObj);
 
for(let item in goObj){
    goObj[item].addEventListener('click',async(e)=>{
        //
        const category = item.slice(2).toLowerCase();
        let response;
        try{
            response= await axios.post('/');
        }catch(err){
            console.log(err);
        }
        // 
        if(!response.data.isLogin){
            console.log(response.data.isLogin);
            alert('로그인 해주세요');
            return;
        }
        window.location.href = `${window.origin}/${category}`; 
    })
}