

const socket=io()


let name;

let massageArea=document.querySelector('.massage__area')

let textarea=document.querySelector('#textarea')

let messageArea=document.querySelector('.massage__area')
do{
   
    name=prompt("Please enter your name: ");
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){

        sendMassage(e.target.value)
    }
})

function sendMassage(message){

    let msg={
        user:name,

        message:message.trim()
    }

    //Append

    appendMessage(msg,'outgoing')

    textarea.value=""

    scrollToBottom()

    //Send to servar


    socket.emit('message',msg)
}

function appendMessage(msg,type){
    

    let mainDiv=document.createElement('div')

    let className=type
    mainDiv.classList.add(className,'massage')

    let markup=`
    <h4> ${msg.user} </h4>

    <p>${msg.message}</p>
    
    
    `

    mainDiv.innerHTML=markup

    messageArea.appendChild(mainDiv)
}

///  Recieve message

socket.on('message',(msg)=>{

    appendMessage(msg,'incoming')

    scrollToBottom()
})

function scrollToBottom(){

    messageArea.scrollTop=messageArea.scrollHeight
}