// === Данные Telegram ===
const TOKEN ="7713827858:AAGyNcthBCbbV4lkJY4YwqxIG5-T51WG-NI"
const CHAT_ID ="-1002659983654"

// === Элементы формы ===
const usernameInput = document.querySelector("#username");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const butlesInput = document.querySelector("#buttonles");

// === Модальные окна ===
const modalSuccess = document.querySelector("#my-modal");
const modalError = document.querySelector("#error-modal");

const closeSuccess = document.querySelector("#close-my-modal");
const closeError = document.querySelector("#close-error-modal");

// === Открыть и закрыть модалки ===
const openModal = (modal) => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
};

const closeModal = (modal) => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
};

// === Кнопки закрытия модалок ===
closeSuccess.addEventListener("click", () => closeModal(modalSuccess));
closeError.addEventListener("click", () => closeModal(modalError));

// === Отправка в Telegram ===
const sendMessage = () => {
    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: `Имя: ${usernameInput.value.trim()}\nТелефон: ${phoneInput.value.trim()}\nEmail: ${emailInput.value.trim()} зарегистрировался на бесплатный вебинар`
        })
    });
};

// === Обработка клика по кнопке ===
butlesInput.addEventListener("click", (e) => {
    e.preventDefault();

    // Удаляем предыдущие ошибки
    [usernameInput, phoneInput, emailInput].forEach(input => input.classList.remove('error'));

    // Получаем значения
    const username = usernameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    // Проверка
    let isValid = true;
    if (!username) {
        usernameInput.classList.add('error');
        isValid = false;
    }
    if (!phone) {
        phoneInput.classList.add('error');
        isValid = false;
    }
    if (!email) {
        emailInput.classList.add('error');
        isValid = false;
    }

    if (!isValid) {
        openModal(modalError);
        return;
    }

    // Всё хорошо — отправляем и показываем успех
    sendMessage();
    openModal(modalSuccess);

    // Очистить поля
    usernameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
});

