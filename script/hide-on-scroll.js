// Сохраняем последнее значение прокрутки для компьютерной версии
let lastScroll = 0;

// Получаем элемент хедера для компьютеров (класс .header-computer)
const header = document.querySelector('.header-computer');

// Навешиваем обработчик события прокрутки страницы
window.addEventListener('scroll', () => {
    // Текущее значение вертикальной прокрутки
    const currentScroll = window.pageYOffset;

    // Проверяем: если прокручиваем вниз и уже прокрутили больше чем на 100 пикселей
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Прокрутка вниз — добавляем класс, который скрывает хедер
        header.classList.add('hide-header');
    } else {
        // Прокрутка вверх — удаляем класс, чтобы показать хедер
        header.classList.remove('hide-header');
    }

    // Обновляем значение последней прокрутки
    lastScroll = currentScroll;
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////


// Сохраняем последнее значение прокрутки для мобильной версии
let lastScrollmob = 0;

// Получаем элемент хедера для мобильных устройств (класс .mobile-header)
const headermob = document.querySelector('.mobile-header');

// Ещё один обработчик прокрутки — для мобильного хедера
window.addEventListener('scroll', () => {
    // Текущее значение вертикальной прокрутки
    const currentScroll = window.pageYOffset;

    // Проверяем: если прокручиваем вниз и уже прокрутили больше чем на 100 пикселей
    if (currentScroll > lastScrollmob && currentScroll > 100) {
        // Прокрутка вниз — добавляем класс, скрывающий мобильный хедер
        headermob.classList.add('hide-header');
    } else {
        // Прокрутка вверх — убираем класс, показываем хедер
        headermob.classList.remove('hide-header');
    }

    // Обновляем значение последней прокрутки
    lastScrollmob = currentScroll;
});
