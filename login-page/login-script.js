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
        console.log("Nothing here")
        return false;
    }
    const key = `todoAppState:${encodeURIComponent(username)}`;
    const savedUser = localStorage.getItem(key);

    if (!savedUser) {
        return false;
    }
    
    let parsed;
    try {
        parsed = JSON.parse(savedUser)
    } catch (error) {
        console.log(error)
        return false;
    }

    parsedName = parsed.currentUser.name;

    if (username === parsedName) {
        const confirmed = window.confirm(
        `Are you sure you want to delete the user "${username}" and all of their to-do items?`
        );
        if (!confirmed) { return false };
        localStorage.removeItem(`todoAppState:${encodeURIComponent(username)}`);
        usernameLogin.value = '';

        return true;
    }

    return false;
}