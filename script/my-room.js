document.getElementById("my-room-but").addEventListener("click", function() {
    document.getElementById("my-modal-reg").classList.add("open");
})
document.getElementById("close-my-modal1").addEventListener("click", function() {
    document.getElementById("my-modal-reg").classList.remove("open");
})

document.getElementById("switch-to-login").addEventListener("click", function() {
    document.getElementById("my-modal-login").classList.add("open");
    document.getElementById("my-modal-reg").classList.remove("open");
})
document.getElementById("close-my-modal2").addEventListener("click", function() {
    document.getElementById("my-modal-login").classList.remove("open");
})
document.getElementById("create-account").addEventListener("click", function() {
    document.getElementById("my-modal-reg").classList.add("open");
    document.getElementById("my-modal-login").classList.remove("open");
})