const navigateHome = document.querySelector(".navigate-home");
const passwordLogin = document.querySelector(".password-login");
const usernameLogin = document.querySelector(".username-login");

navigateHome.addEventListener('click', async function() {
    const saved = await saveUserCredentials();

    if (!saved) {
        return;
    }

    window.location.href = "homepage.html";
})

async function saveUserCredentials() {
    const username = usernameLogin.value.trim();
    const password = passwordLogin.value;

    if (username === "" || password === "") {
        return false;
    }

    localStorage.setItem("currentUser", JSON.stringify({
        name: username
    }));

    const passwordBuffer = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(password)
    );
    const passwordHash = Array.from(new Uint8Array(passwordBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    localStorage.setItem("userCredentials", JSON.stringify({
        username,
        passwordHash
    }));

    return true;
}