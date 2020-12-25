var links = {
    links : null,
    area : document.getElementsByClassName('link-area')[0],
    name: document.getElementById('link-name'),
    content: document.getElementById('content-area'),
    submitbtn: document.getElementById('submit-btn'),
    set : async function(){
        this.content.value ="링크를 입력해 주세요"
        await this.getLink();
        await this.setEvent();
    },
    setEvent: function() {
        this.submitbtn.onclick = this.addLink.bind(links);
        this.content.onfocus = this.resetLink.bind(links);
    },
    resetLink : function(e){
        console.log(e.target)
        e.target.value ='';

    },
    addLink: function(e) {
        if(this.content.value.replaceAll(" ",'').length<1 || this.content.value ==='링크를 입력해 주세요'){
            alert('링크는 공백을 입력할 수 없습니다.')
            return 
        }
        /*<div class="link-submit">
            <div class="input-box link-name">도커 컨테이너 만들기</div>
            <a class="delete">삭제</a>
            <div class="input-box link-content">sdssdsdsdsdsdsdsdsdsdsdsd</div>
        </div>*/
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('link-submit');
        const linkName = document.createElement('div');
        linkName.classList.add('input-box');
        linkName.classList.add('link-name');
        linkName.innerHTML = this.name.value;
        const linkDel = document.createElement('a');
        linkDel.classList.add('delete');
        linkDel.innerText = '삭제';
        //삭제 click 시 삭제 
        linkDel.addEventListener('click',this.delLink);
        const linkContent = document.createElement('div');
        linkContent.classList.add('input-box');
        linkContent.classList.add('link-content');
        linkContent.innerHTML = this.content.value;
        //link div 안에 집어넣기
        let name = this.name.value;
        let content = this.content.value;
        let request = {
            name : name,
            content : content
        }; 
        axios.post(`${window.origin}/insert/link`,request)
        .then((response)=>{
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        });
        this.name.value = '' ;
        linkDiv.appendChild(linkName);
        linkDiv.appendChild(linkDel);
        linkDiv.appendChild(linkContent);
        this.area.appendChild(linkDiv); 

    },
    delLink: function(e){
        let name = e.target.previousSibling.innerHTML;
        let content = e.target.nextSibling.innerHTML;
        //이름으로 db에서 찾아서 삭제하기
        let request = {
            name : name,
            content : content
        }; 
        axios.post(`${window.origin}/delete/link`,request)
        .then((response)=>{
          alert('링크가 삭제되었습니다.')
        }).catch((error)=>{
            console.log(error)});
        e.target.parentNode.style.display = 'none';
    },
    getLink : async function(e){
        try{
           const response =  await axios.post(`${window.origin}/get/links`)
           console.log(response.data)
           if(response.data !== {}){
               const links =  response.data
               for(let name in links){
                   this.makeLink(name,links[name]);
               }
           }
        }catch(error){
            console.log(error)
        }
       
        //link div 안에 집어넣기
    },
    makeLink : function(name,link){ 
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('link-submit');
        const linkName = document.createElement('div');
        linkName.classList.add('input-box');
        linkName.classList.add('link-name');
        linkName.innerHTML = String(name);
        const linkDel = document.createElement('a');
        linkDel.classList.add('delete');
        linkDel.innerText = '삭제';
        //삭제 click 시 삭제 
        linkDel.addEventListener('click',this.delLink);
        const linkContent = document.createElement('div');
        linkContent.classList.add('input-box');
        linkContent.classList.add('link-content');
        linkContent.innerHTML = String(link);

        linkDiv.appendChild(linkName);
        linkDiv.appendChild(linkDel);
        linkDiv.appendChild(linkContent);
        this.area.appendChild(linkDiv); 
    }
}
links.set();