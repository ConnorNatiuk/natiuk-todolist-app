const navigateHome = document.querySelector(".navigate-home");
const usernameLogin = document.querySelector(".username-login");
const loginConfirmation = document.querySelector(".login-confirmation");

localStorage.removeItem("userCredentials");

navigateHome.addEventListener('click', function() {
    window.location.href = "../home-page/homepage.html";
})

loginConfirmation.addEventListener('click', function() {
    const savedInfo = saveCurrentUser();

    if (!savedInfo) {
        return;
    }

    usernameLogin.value = '';
    window.location.href = "../home-page/homepage.html";
})

function saveCurrentUser() {
    const username = usernameLogin.value.trim();

    if (username === "") {
        return false;
    }

    localStorage.setItem("currentUser", JSON.stringify({
        name: username
    }));

    return true;
}