// === Вторая форма "Задать вопрос" ===
const TOKEN1 ="7905514951:AAHIfQnc8yqdtaLavOonnHi2azuVCkDjHTQ";
const CHAT_ID1= "-1002659983654"

const usernameInput1 = document.querySelector("#username1");
const phoneInput1 = document.querySelector("#phone1");
const emailInput1 = document.querySelector("#email1");
const questionInput1 = document.querySelector("#question1");
const button1 = document.querySelector("#button1");

const modalQuestionSuccess = document.querySelector("#question-modal");
const closeQuestion = document.querySelector("#close-question-modal");

closeQuestion.addEventListener("click", () => closeModal(modalQuestionSuccess));

const sendQuestion = () => {
    fetch(`https://api.telegram.org/bot${TOKEN1}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID1,
            text: `Имя: ${usernameInput1.value.trim()}\nТелефон: ${phoneInput1.value.trim()}\nEmail: ${emailInput1.value.trim()}\nВопрос: '${questionInput1.value.trim()}'`
        })
    });
};

button1.addEventListener("click", (e) => {
    e.preventDefault();

    [usernameInput1, phoneInput1, emailInput1, questionInput1].forEach(input => input.classList.remove('error'));

    const username1 = usernameInput1.value.trim();
    const phone1 = phoneInput1.value.trim();
    const email1 = emailInput1.value.trim();
    const question1 = questionInput1.value.trim();

    let isValid = true;

    if (!username1) {
        usernameInput1.classList.add('error');
        isValid = false;
    }
    if (!phone1) {
        phoneInput1.classList.add('error');
        isValid = false;
    }
    if (!email1) {
        emailInput1.classList.add('error');
        isValid = false;
    }
    if (!question1) {
        questionInput1.classList.add('error');
        isValid = false;
    }

    if (!isValid) {
        openModal(modalError); // переиспользуем общий модал ошибки
        return;
    }

    sendQuestion();
    openModal(modalQuestionSuccess);

    usernameInput1.value = '';
    phoneInput1.value = '';
    emailInput1.value = '';
    questionInput1.value = '';
});
