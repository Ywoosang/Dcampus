document.addEventListener('DOMContentLoaded',getLocalPlans);  
const planWindow = document.querySelector('.makePlan');
const hideWindow = document.querySelector('.hide');
const mainPage = document.getElementsByClassName('main')[0];
const showWindow = document.getElementById('add-btn');  

showWindow.addEventListener('click',()=>{
    mainPage.style.opacity = 0.3;
    planWindow.style.display = "flex";
});
hideWindow.addEventListener('click',()=>{
    mainPage.style.opacity = 1;
    planWindow.style.display ="none";
});

//글 쓰고 나서 붙여넣기
//등록 버튼 클릭했을 때 만들어 붙이기
/*
<div class="todo">
<button class='complete-btn'>
<i class='fas fa-check'></i>
</button>
<button class='trash-btn'>
<i class='fas fa-trash'></i>
</button>
<text-area class="todo-item">계획</text-area>
</div>
*/
const planList = document.querySelector('.todo-list');
const inputText = document.querySelector(".plan-input");  
const registerButton = document.querySelector(".register-btn");

registerButton.addEventListener('click',addPlan);  
planList.addEventListener('click',trashPlan); 
function addPlan(event){
    //제출 버튼의 refresh 를 prevent
    event.preventDefault();
    const planDiv = document.createElement('div');
    planDiv.classList.add('todo');
    const planText = document.createElement('textarea');
    planText.classList.add('todo-item'); 
    // console.log(typeof inputText.value);
    planText.value =  String(inputText.value);
    saveLocalPlans(String(inputText.value)); 
    console.log(planText.value);
    planDiv.appendChild(planText);
   
    const completedButton = document.createElement('button');
    completedButton.innerHTML ="<i class='fas fa-check'></i>";
    completedButton.classList.add('complete-btn');
    planDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add('trash-btn');
    planDiv.appendChild(trashButton);
    console.log(planDiv);
    planList.appendChild(planDiv);
    inputText.value = '';  
    mainPage.style.opacity = 1;
    planWindow.style.display ="none";    
};

function trashPlan(event){
    const item = event.target;
    if(item.classList[0]=="trash-btn"){
        const plan = item.parentNode;
        plan.classList.add('fall');
        removeLocalTodos(plan.children[0].value);
        plan.addEventListener('transitionend',function(){
            plan.remove();
        }); 
    }
}; 
function saveLocalPlans(plan){
    let plans;
    if(localStorage.getItem('plans')== null){
        plans = [];
    }else{
        plans = JSON.parse(localStorage.getItem('plans'));
    }
    console.log(plans);
    plans.push(plan);
    localStorage.setItem('plans',JSON.stringify(plans))
}; 
function removeLocalTodos(plan){
    let plans;
    if(localStorage.getItem('plans')==null){
        plans= []
    }else{
        plans = JSON.parse(localStorage.getItem('plans'));
    }
    console.log(plans);
    const planIndex = plans.indexOf(String(plan)); 
    plans.splice(planIndex,1);
    localStorage.setItem('plans',JSON.stringify(plans));
}
function getLocalPlans(){
    let plans;
    if(localStorage.getItem('plans') == null){
        plans =[]; 
    }else{
        plans = JSON.parse(localStorage.getItem('plans'));
    }
    plans.forEach(function(plan,el,all){    
        const planDiv = document.createElement('div');
        planDiv.classList.add('todo');
        const planText = document.createElement('textarea');
        planText.classList.add('todo-item'); 
        planText.value = String(plan);
        planDiv.appendChild(planText);
        const completedButton = document.createElement('button');
        completedButton.innerHTML ="<i class='fas fa-check'></i>";
        completedButton.classList.add('complete-btn');
        planDiv.appendChild(completedButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add('trash-btn');
        planDiv.appendChild(trashButton);
        planList.appendChild(planDiv);
    });
}; 