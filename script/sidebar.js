const burgerMenu = document.querySelector('.menu-icon')
const sidebar = document.querySelector('.sidebar')
const closeBtn = document.querySelector('.close-ico')

burgerMenu.addEventListener("click", () => {
    sidebar.classList.toggle('active')
})
closeBtn.addEventListener("click", () => {
    sidebar.classList.remove('active')
})