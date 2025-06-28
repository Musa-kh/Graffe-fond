const BASE_URL = "https://15c9476135402b00.mokky.dev";

// === Проверка токена при загрузке страницы ===
window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (token) {
        fetch(`${BASE_URL}/auth_me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.name) {
                    localStorage.setItem("user", JSON.stringify(data));
                } else {
                    logout();
                }
            })
            .catch(() => logout());
    }
});

// === Регистрация ===
document.querySelector('.register-modal-but').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#my-modal-reg input');
    const [loginInput, emailInput, passInput, repeatInput] = inputs;

    const name = loginInput.value.trim();
    const email = emailInput.value.trim();
    const password = passInput.value.trim();
    const repeat = repeatInput.value.trim();

    if (!email || !password || password !== repeat || !name) {
        alert("Пожалуйста, заполните все поля правильно.");
        return;
    }

    fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
    })
        .then(res => res.json())
        .then(data => {
            if (data?.message === "RESOURCE_USER_ALREADY_EXISTS") {
                alert("Пользователь с таким email уже существует!");
            } else if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.data));
                document.getElementById("my-modal-reg").classList.remove("open");
                showProfile(data.data);
                // очистка полей после успешной регистрации
                document.querySelector('#my-modal-reg input[placeholder="Логин"]').value = "";
                document.querySelector('#my-modal-reg input[placeholder="Email"]').value = "";
                document.querySelector('#my-modal-reg input[placeholder="Пароль"]').value = "";
                document.querySelector('#my-modal-reg input[placeholder="Повторить пароль"]').value = "";

            } else {
                alert("Ошибка регистрации: " + (data.message || "Неизвестная ошибка"));
            }
        })
        .catch(() => alert("Ошибка при регистрации"));
});

// === Вход ===
document.querySelector('.login-modal-but').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#my-modal-login input');
    const [emailInput, passInput] = inputs;

    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    if (!email || !password) {
        alert("Введите email и пароль");
        return;
    }

    fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data?.message === "UNAUTHORIZED") {
                alert("Неверный email или пароль!");
            } else if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.data));
                document.getElementById("my-modal-login").classList.remove("open");
                showProfile(data.data);
                // очистка полей после успешного входа
                document.querySelector('#my-modal-login input[placeholder="Логин/Email"]').value = "";
                document.querySelector('#my-modal-login input[placeholder="Пароль"]').value = "";


            } else {
                alert("Ошибка входа: " + (data.message || "Неизвестная ошибка"));
            }
        })
        .catch(() => alert("Ошибка при входе"));
});

// === Показ профиля в модалке ===
function showProfile(user) {
    document.getElementById("user-name-display").innerText = `Имя: ${user.name || "-"}`;
    document.getElementById("user-email-display").innerText = `Email: ${user.email || "-"}`;
    document.getElementById("my-room-modal").classList.add("open");
}

// === Выход ===
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Вы вышли из аккаунта");
    document.getElementById("my-modal-login").classList.add("open");
}

// === Клик по иконке профиля (мобильная версия) ===
document.getElementById("profile-icon-click").addEventListener("click", () => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");

    if (!token || !userRaw) {
        document.getElementById("my-modal-login").classList.add("open");
        return;
    }

    let user;
    try {
        user = JSON.parse(userRaw);
    } catch (e) {
        logout();
        return;
    }

    showProfile(user);
});

// === Клик по "Личный кабинет" (ПК-версия) ===
document.getElementById("my-room-but").addEventListener("click", () => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");

    if (token && userRaw) {
        try {
            const user = JSON.parse(userRaw);
            showProfile(user);
        } catch (e) {
            logout();
        }
    } else {
        document.getElementById("my-modal-login").classList.add("open");
    }
});

// === Закрытие модалки профиля ===
document.getElementById("close-my-modal3").addEventListener("click", () => {
    document.getElementById("my-room-modal").classList.remove("open");
});

// === Кнопка "Выйти с аккаунта" ===
document.getElementById("logout-btn-room").addEventListener("click", () => {
    logout();
    document.getElementById("my-room-modal").classList.remove("open");
});

// === Переключение между регистрацией и входом ===
document.getElementById("close-my-modal1").addEventListener("click", () => {
    document.getElementById("my-modal-reg").classList.remove("open");
});
document.getElementById("close-my-modal2").addEventListener("click", () => {
    document.getElementById("my-modal-login").classList.remove("open");
});
document.getElementById("switch-to-login").addEventListener("click", () => {
    document.getElementById("my-modal-login").classList.add("open");
    document.getElementById("my-modal-reg").classList.remove("open");
});
document.getElementById("create-account").addEventListener("click", () => {
    document.getElementById("my-modal-reg").classList.add("open");
    document.getElementById("my-modal-login").classList.remove("open");
});
