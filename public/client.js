const socket=io();

let username;
do{
    username=prompt("Please Enter your name");
}while(!username)


let textarea=document.querySelector("#textarea");
let messageArea=document.querySelector(".message__area")
textarea.addEventListener("keyup",(e)=>{
    if(e.key=="Enter"){
        sendMessage(e.target.value);
    }
});

//send message

function sendMessage(message){
    let msg={
        user:username,
        message:message.trim()
    }

    //append message
    appendMessage(msg,'outgoing');
    textarea.value="";
    scrolToBottom();

    //send to server
    socket.emit('message',msg);

};

function appendMessage(msg,type){
    let mainDiv=document.createElement('div');
    let className=type;
    mainDiv.classList.add(className,'message');

    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);
};


//Recieve mesaages

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
});


//scroll to bottom
function scrolToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
    scrolToBottom();
}