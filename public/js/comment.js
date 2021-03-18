$('#summernote').summernote({
    toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'picture']],
        ['view', ['fullscreen', 'codeview', 'help']],
    ],
    minHeight: 100,
    maxHeight: 600,
    focus: true,
    callbacks: {
        onImageUpload: function (files) {
            sendFile(files[0]);
        }
    }

});
function sendFile(file) {
    var data = new FormData();
    data.append("file", file);
    console.log(file);
    $.ajax({
        type: "POST",
        url: "/community/upload/img",
        type: 'POST',
        data: data,
        contentType: false,
        processData: false, // Don't process the files
        success: function (data) {
            console.log(data);
            console.log(data.url)
            const node = document.createElement('p');
            const img = document.createElement('img');
            img.src = data.url;
            img.style.width = "100%";
            const br = document.createElement('br');
            node.appendChild(img);
            node.appendChild(br);
            $('#summernote').summernote("insertNode", node);
        }
    });
}
const commentContent = document.getElementsByClassName('comment-create')[0];
const submitButton = document.getElementsByClassName('comment-submit')[0];
submitButton.addEventListener('click', () => {
    console.log(commentContent.value);
    if (commentContent.value.trim().length == 0) alert('값을 입력해 주세요');
    else {
        axios.post(window.location.href, {
            data: {
                content: commentContent.value,
            }
        }).then((res) => {
            location.reload();
        }).catch((err) => console.log(err))
    }
})

const setScrollEvent = () => {
    document.addEventListener('scroll',() => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if(localStorage.getItem('scroll')){
            localStorage.removeItem('scroll'); 
        }; 
        console.log(scrollPosition)
        localStorage.setItem('scroll',scrollPosition);
    });
}

 


window.onload = async() =>{
    // 새로고침시 스크롤 높이가 저장되어 있다면
    const position = localStorage.getItem('scroll');
    axios.post(`${window.location.href}/check`)
    .then((res)=>{
        const isLike = res.data.like;
        const likeBtn = document.querySelector('.like');
        const disLikeBtn = document.querySelector('.dislike');
        // 추천을 눌렀을 경우 
        if(isLike){
            likeBtn.classList.add('cancel');
            postCancel();
        // 비추천을 눌렀을 경우
        } else if(isLike === false){
            disLikeBtn.classList.add('cancel');
            postCancel();
        // 추천/비추천 모두 누르지 않은 경우
        } else{
            postLike()
            postDisLike() 
        }
    });
    const comments = document.getElementsByClassName('comment');
    // 로드 => 현재 상태 가져오기
    for(let comment of comments){
        const commentNum = comment.querySelector('input').value;
        const commentLikeNumber = comment.querySelector('.coml'); 
        const url = `${window.origin}/community/comment/${commentNum}`
        try{
            const res = await axios.post(url);
            // 추천
            if(res.data.like){
                const likeBtn = comment.querySelector('.like');
                likeBtn.classList.add('cancel');
                commentCancel(comment,commentLikeNumber,commentNum); 
            // 비추천 
            }else if(res.data.like == false ){
                const disLikeBtn = comment.querySelector('.dislike');
                disLikeBtn.classList.add('cancel');
                commentCancel(comment,commentLikeNumber,commentNum); 
            // 추천 또는 비추천을 하지 않은 상태
            } else{
                commentLike(comment,commentLikeNumber,commentNum); 
                commentDisLike(comment,commentLikeNumber,commentNum);
            }
        }catch(err){
            console.log(err);
        }
        window.scrollTo(0,position);
        setScrollEvent();
    }
   
} 

const likeNum = document.querySelector('.num');
 
// 게시글 추천 구현
const postLike = () => {
    const likeBtn = document.querySelector('.like');
    const disLikeBtn = document.querySelector('.dislike');
    likeBtn.addEventListener('click',()=>{
        axios.get(`${window.location.href}/1`)
        .then((res)=>{
            likeNum.innerText = res.data.recommend;
            console.log( res.data.recommend);
            likeBtn.classList.add('cancel');
            const elClone = likeBtn.cloneNode(true);
            likeBtn.parentNode.replaceChild(elClone, likeBtn);
            const disLikeClone = disLikeBtn.cloneNode(true);
            disLikeBtn.parentNode.replaceChild(disLikeClone,disLikeBtn);
            postCancel();
        })
    })
    
}

const postDisLike = ()=>{
    const likeBtn = document.querySelector('.like');
    const disLikeBtn = document.querySelector('.dislike');
    disLikeBtn.addEventListener('click',()=>{
        axios.get(`${window.location.href}/0`)
        .then((res)=>{
            likeNum.innerText = res.data.recommend;
            console.log( res.data.recommend);
            disLikeBtn.classList.add('cancel')
            const elClone = disLikeBtn.cloneNode(true);
            disLikeBtn.parentNode.replaceChild(elClone,disLikeBtn);
            const likeClone = likeBtn.cloneNode(true);
            likeBtn.parentNode.replaceChild(likeClone,likeBtn); 
            postCancel();
        })
    })
}

const postCancel = () => {
    const cancel = document.querySelector('.cancel') 
    cancel.addEventListener('click',()=>{
        if(confirm('취소하시겠습니까?')){
            axios.get(`${window.location.href}/cancel`)
            .then((res)=>{
                likeNum.innerText = res.data.recommend;
                console.log( res.data.recommend);
                cancel.classList.remove('cancel');
                const elClone = cancel.cloneNode(true);
                cancel.parentNode.replaceChild(elClone,cancel);
                postLike();
                postDisLike();
            })
        }
    })
 }
 
// 
/*
추천 클릭시 추천 색깔 변경
비추천 클릭 시 비추천 색깔 변경
한번 더 클릭시 색깔 초기화, 추천수 복구

클릭하면 확인 후 전송
*/

// 이미 구독중이 아닐 경우 
const commentLike = async(comment,commentLikeNumber,commentNum) => {
    const like = comment.querySelector('.like');
    like.addEventListener('click',async()=>{
        const res = await axios.post(`${window.origin}/community/comment/${commentNum}/1`)
        commentLikeNumber.innerText = res.data.recommend;  
        like.classList.add('cancel');
        //이벤트 리스너 제거
        const likeClone = like.cloneNode(true);
        like.parentNode.replaceChild(likeClone,like)
        const disLike = comment.querySelector('.dislike');
        const disLikeClone = disLike.cloneNode(true);
        disLike.parentNode.replaceChild(disLikeClone,disLike);
        commentCancel(comment,commentLikeNumber,commentNum);  
    })
}

const commentDisLike = (comment,commentLikeNumber,commentNum) => {
    const disLike = comment.querySelector('.dislike');
    disLike.addEventListener('click',async()=>{
        const res = await axios.post(`${window.origin}/community/comment/${commentNum}/0`) 
        commentLikeNumber.innerText = res.data.recommend; 
        disLike.classList.add('cancel');
        // 
        const disLikeClone = disLike.cloneNode(true);
        disLike.parentNode.replaceChild(disLikeClone,disLike);
        const like = comment.querySelector('.like');
        const likeClone = like.cloneNode(true);
        like.parentNode.replaceChild(likeClone,like)
        commentCancel(comment,commentLikeNumber,commentNum); 
    })

}
// dislike callback


const commentCancel = (comment,commentLikeNumber,commentNum) => {
    const cancel = comment.querySelector('.cancel');
    cancel.addEventListener('click',async()=>{
        if(confirm('취소하시겠습니까?')){
        const res = await axios.post(`${window.origin}/community/comment/${commentNum}/cancel`) 
        commentLikeNumber.innerText = res.data.recommend; 
        //
        const elClone = cancel.cloneNode(true)
        elClone.classList.remove('cancel')
        cancel.parentNode.replaceChild(elClone,cancel); 
        //
        commentDisLike(comment,commentLikeNumber,commentNum);
        commentLike(comment,commentLikeNumber,commentNum);
        }
    })


}




