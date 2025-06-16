const TOKEN ="7713827858:AAGyNcthBCbbV4lkJY4YwqxIG5-T51WG-NI"
const CHAT_ID ="-1002659983654"

const usernameInput=document.querySelector("#username")
const phoneInput=document.querySelector("#phone")
const emailInput=document.querySelector("#email")
const butlesInput=document.querySelector("#buttonles")

let username;
let phone;
let email;

usernameInput.addEventListener("input", () => {
    username = usernameInput.value;
})
phoneInput.addEventListener("input", () => {
    phone = phoneInput.value;
})
emailInput.addEventListener("input", () => {
    email = emailInput.value;
})

const sendMessage = ()=> {
    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: `Имя ${username} Телефон ${phone} email ${email} зарегистрировался на бесплатный вебинар `
        })
    })
}
butlesInput.addEventListener("click",(e)=>{
    e.preventDefault();
    sendMessage()
    usernameInput.value = ''
    phoneInput.value = ''
    emailInput.value = ''
})