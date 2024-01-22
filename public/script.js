
var socket = io();
const btn = document.getElementsByClassName('login-submit')[0];
const form = document.getElementById("login");
let username = "";

const sendBtn = document.getElementById("send-message")
const message = document.getElementById("message-input");

let chatContainer = document.querySelector(".chatroom-container");
let messageContainer = document.querySelector(".chat-box");




btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const userInput = document.getElementById("user-name");
    if(userInput){
        username = userInput.value;
        console.log(username);
        form.style.display = "none";
        chatContainer.style.display = "block";
        
    }
    userInput.value ="";
})


sendBtn.addEventListener('click',(e)=>{
e.preventDefault();

const data = {
    id:socket.id,
    username:username,
    message : message.value
}

socket.emit("secretMessage",data);
renderMessage(data,"SENT");
})

function renderMessage(data,status){
    const div = document.createElement("div");
    div.innerText =`${data.username}:${data.message}`;
    if(status == "SENT"){
        div.setAttribute('class','message right');
    }else if(status == "RECIEVED"){
        div.setAttribute('class','message');
    }
    messageContainer.appendChild(div);
}

socket.on('ioSecretMessage',data=>{
    if(data.id !== socket.id){
        renderMessage(data,"RECIEVED");
    }
  
})