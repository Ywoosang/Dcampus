
const $ = (cls) => document.querySelector(cls);

const createButton = $('.create');
const updateButton = $('.update');
const deleteButton = $('.delete'); 
const introText = $('.intro');
let userId;


axios.post(`${window.location.origin}/api`)
.then((res)=>{
    userId = res.data 
    if(updateButton !==null){
        updateButton.addEventListener('click',()=>
        {
            axios.put(`${window.location.origin}/profile/${userId}`,{
                intro : introText.value
            }).then((res)=>{
                location.reload() 
            }).catch((err)=>{

            })
        })
    }
    if(deleteButton !== null){
        deleteButton.addEventListener('click',()=>{
            axios.delete(`${window.location.origin}/profile/${userId}`)
            .then((res)=>{
                location.reload() 
            }).catch((err)=>{
                console.log(err);
            })
        })
    }

}).catch((err)=> console.log(err));


// createButton.addEventListener('click',()=>
// {
//     axios.post(`${window.location.origin}/profile/${userId}`,{
//         intro : introText.value
//     }).then((res)=>{

//     }).catch((err)=>{

//     })
// })