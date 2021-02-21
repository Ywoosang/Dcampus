const $ = cls => document.getElementsByClassName(cls)[0];

const addButton = $('add-btn'); 
const enrollButton = $('enroll-button'); 
const linkArea = $('link');
const enrollContent = $('enroll'); 
const linkName = $('enroll-name'); 
const linkUrl= $('enroll-url'); 
const cancelButton = $('cancel-button');
const deleteButtons = [...document.getElementsByClassName('link-delete')];
const copyButtons = [...document.getElementsByClassName('link-copy')];

const deleteLink = (e)=>{
    const isDelete = confirm('정말로 삭제 하시겠습니까?');
    if(!isDelete){
        return; 
    }
    const linkId = e.target.parentNode.getAttribute('id');
    console.log(linkId);
    axios.delete(`/link/${linkId}`)
    .then((res)=>{
        console.log(res.data.success);
        linkArea.removeChild(e.target.parentNode); 
    })
    .catch((err)=>{
        alert(err.data.warn);
    });
}; 

const copyLink = (e) => {
    const val = e.target.parentNode.getElementsByClassName('link-url')[0].value;
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = val; 
    dummy.select();
    dummy.setSelectionRange(0, 99999); // ios 사파리 고려
    document.execCommand("copy");
    document.body.removeChild(dummy);
};

deleteButtons.forEach(el=>{
    el.addEventListener('click',deleteLink)  
}); 

// const link
addButton.addEventListener('click',(e)=> {
    linkArea.classList.add('blur');
    enrollContent.classList.remove('hide'); 
});

enrollButton.addEventListener('click',(e)=> {
    if(linkUrl.value==''){
        alert('링크를 입력해 주세요');
        return
    }
    const linkNameValue = linkName.value;
    const linkUrlValue = linkUrl.value; 
    axios.post('/link',{
        linkName: linkNameValue,
        linkUrl: linkUrlValue,
    })
    .then((res)=>{
        const linkId = res.data.linkId; 
        console.log('서버받은 링크 아이디',linkId,res.data); 
        linkArea.classList.remove('blur');
        enrollContent.classList.add('hide'); 
        const linkContent = document.createElement('div');
        linkContent.classList.add('link-content');
        linkContent.id = linkId; 
        linkContent.innerHTML = 
        `<div class="link-delete">삭제 <i class="fa fa-trash-o"></i></div>
        <div class="link-copy">링크 복사 <i class="fa fa-file-o"></i></div>
        <input type="text" class="link-name" value="${ linkNameValue }" disabled />
        <textarea class='link-url' disabled>${linkUrlValue}</textarea>`
        const copyButton = linkContent.getElementsByClassName('link-copy')[0];
        const deleteButton = linkContent.getElementsByClassName('link-delete')[0];
        deleteButton.addEventListener('click',deleteLink); 
        copyButton.addEventListener('click',copyLink);
        linkArea.appendChild(linkContent);
        linkName.value = "";
        linkUrl.value = "";
    }).catch((err) => {
        console.log(err);
    })
    
}); 

cancelButton.addEventListener('click',(e)=>{
    linkArea.classList.remove('blur');
    enrollContent.classList.add('hide'); 
})

copyButtons.forEach(el=>{
    el.addEventListener('click',copyLink); 
}); 







