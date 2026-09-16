const navigateHome = document.querySelector(".navigate-home");
const usernameLogin = document.querySelector(".username-login");
const loginConfirmation = document.querySelector(".login-confirmation");
const deleteUserButton = document.querySelector(".delete-user");

localStorage.removeItem("userCredentials");

navigateHome.addEventListener('click', function() {
    window.location.href = "../home-page/homepage.html";
})

deleteUserButton.addEventListener('click', function() {
    deleteCurrentUser();
});

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

function deleteCurrentUser() {
    const username = usernameLogin.value.trim();

    if (username === "") {
        return false;
    }

    localStorage.removeItem(`todoAppState:${encodeURIComponent(username)}`);

    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.name === username) {
            localStorage.removeItem("currentUser");
        }
    }

    usernameLogin.value = '';

    return true;
}