const commonWrap = document.querySelector('.js-commonWrap');
const frontWrap = document.querySelector('.js-frontWrap');
const backWrap = document.querySelector('.js-backWrap');
const devopsWrap = document.querySelector('.js-devopsWrap');
const btn1 = document.querySelector('.js-btn1');
const btn2 = document.querySelector('.js-btn2');
const btn3 = document.querySelector('.js-btn3');
const btn4 = document.querySelector('.js-btn4');

const SHOWING_CLASS = "showing";
const SELECTED_CLASS = "selected";

let selectedPage = 1;

function handleBtn4() {
    commonWrap.classList.remove(SHOWING_CLASS);
    frontWrap.classList.remove(SHOWING_CLASS);
    backWrap.classList.remove(SHOWING_CLASS);
    devopsWrap.classList.add(SHOWING_CLASS);
    btn1.classList.remove(SELECTED_CLASS);
    btn2.classList.remove(SELECTED_CLASS);
    btn3.classList.remove(SELECTED_CLASS);
    btn4.classList.add(SELECTED_CLASS);
    devopsWrap.scrollTo({ top: 0 });
}

function handleBtn3() {
    commonWrap.classList.remove(SHOWING_CLASS);
    frontWrap.classList.remove(SHOWING_CLASS);
    backWrap.classList.add(SHOWING_CLASS);
    devopsWrap.classList.remove(SHOWING_CLASS);
    btn1.classList.remove(SELECTED_CLASS);
    btn2.classList.remove(SELECTED_CLASS);
    btn3.classList.add(SELECTED_CLASS);
    btn4.classList.remove(SELECTED_CLASS);
    backWrap.scrollTo({ top: 0 });
}

function handleBtn2() {
    commonWrap.classList.remove(SHOWING_CLASS);
    frontWrap.classList.add(SHOWING_CLASS);
    backWrap.classList.remove(SHOWING_CLASS);
    devopsWrap.classList.remove(SHOWING_CLASS);
    btn1.classList.remove(SELECTED_CLASS);
    btn2.classList.add(SELECTED_CLASS);
    btn3.classList.remove(SELECTED_CLASS);
    btn4.classList.remove(SELECTED_CLASS);
    frontWrap.scrollTo({ top: 0 });
}

function handleBtn1() {
    commonWrap.classList.add(SHOWING_CLASS);
    frontWrap.classList.remove(SHOWING_CLASS);
    backWrap.classList.remove(SHOWING_CLASS);
    devopsWrap.classList.remove(SHOWING_CLASS);
    btn1.classList.add(SELECTED_CLASS);
    btn2.classList.remove(SELECTED_CLASS);
    btn3.classList.remove(SELECTED_CLASS);
    btn4.classList.remove(SELECTED_CLASS);
    commonWrap.scrollTo({ top: 0 });
}

function init() {
    btn1.addEventListener('click', handleBtn1);
    btn2.addEventListener('click', handleBtn2);
    btn3.addEventListener('click', handleBtn3);
    btn4.addEventListener('click', handleBtn4);
    handleBtn1();
}
var links = document.getElementsByTagName('a')
       
const server = {
    links :  links,
    serverItems : null, 
    doneItems : [],
    created : async function(){
        await this.getItem();
        await this.addId();
        console.log(this.serverItems)
        console.log(this.doneItems)
        this.doneItems = this.serverItems.split('-');
        for(let link of this.links){
            if(this.doneItems.indexOf(link.id) != -1 ){
                link.classList.add('done');
            }
        }
    },
    addId : function(){
        for (let i = 1; i < this.links.length; i++) {
            links[i].id = i;
            links[i].onclick = this.toggleComplete.bind(server)
            //addEventListener('click',this.toggleComplete) 
        }
    },
    getItem : async function(){
        try{ 
            let response = await axios.post(`${window.origin}/get/roadmap/items`);
            console.log(response.data);
            this.serverItems = String(response.data); 
        }catch(error){
            alert(error)
        }
    }, 
    addItem : async function(dom){
        let id = dom.id;
        this.doneItems.push(id);
        let itemString = this.doneItems.slice().join('-');
        let request = {
            items : itemString
        }
        console.log(request) 
        try{
            await axios.post(`${window.origin}/insert/roadmap/items`,request) 
        }catch(error){
            alert(error)
        }
    },
    deleteItem : async function(dom){
        let id = dom.id
        this.doneItems.splice(this.doneItems.indexOf(id),1);
        let itemString = this.doneItems.slice().join('-');
        let request = {
            items : itemString
        }
        console.log(request);
        try{
            await axios.post(`${window.origin}/delete/roadmap/items`,request)
        }catch(error){
            alert(error)
        }
        //서버로 보내서 해당 아이템 삭제
    },
    toggleComplete : function(e){
        console.log(this)
        if(e.target.classList.contains('done')){
            console.log(this)
            this.deleteItem(e.target);
        }else{
            this.addItem(e.target); 
        }
        e.target.classList.toggle('done');
    },
     
    
};
init();
server.created();