
const $ = (cls) => document.querySelector(cls);

const updateButton = $('.update');
// 이미지 제거
const removeButton = $('.remove-btn');
// 자기소개 제거
const deleteButton = $('.delete-btn');
const introText = $('.intro');
const profileImg = $('#img'); 
const imgSubmit = $('.img-submit');
let userId;

removeButton.addEventListener('click',()=>{
    axios.get(`${window.location.origin}/profile/img`)
    .then(_=>{
        location.reload();
    })
    .catch(err=> alert(err));
})

// 이미지 변경 이벤트 감지, 서버로 이미지 데이터 전송
console.log($('#img'));
profileImg.addEventListener('change',(e)=>{
    imgSubmit.click();
})


if (updateButton !== null) {
    updateButton.addEventListener('click', () => {
        const intro = '<pre>' +introText.value + '</pre>'
        axios.put(`${window.location.origin}/profile`, {
            intro 
        }).then((res) => {
            location.reload();
        }).catch((err) => {

        })
    })
}


// createButton.addEventListener('click',()=>
// {
//     axios.post(`${window.location.origin}/profile/${userId}`,{
//         intro : introText.value
//     }).then((res)=>{

//     }).catch((err)=>{

//     })
// })