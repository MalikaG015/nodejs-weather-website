//const { response } = require("express")
//client -side javascript file

console.log('client side javascript file')
fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

const weatherForm=document.querySelector('form')
const searchData=document.querySelector('input')
const messageOne=document.querySelector("#msg-1")
const messageTwo=document.querySelector("#msg-2")

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=searchData.value

    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
    if(data.error){
        messageOne.textContent=data.error
        
    }
    else{
        console.log(data.forecast)
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast
        }

})
})
})