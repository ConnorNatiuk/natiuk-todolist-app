const listInput = document.querySelector(".list-input");
const submitButton = document.querySelector(".submit-todo");
const todoList = document.querySelector(".todo-list");
const loginButton = document.getElementById("login-button");
const currentUserName = document.getElementById("current-user-name");

const savedUser = localStorage.getItem("currentUser");

const currentUser = savedUser ? JSON.parse(savedUser) : { name: "Guest" };

currentUserName.textContent = currentUser.name;

loginButton.addEventListener("click", function () {
    window.location.href = "../login-page/login.html";
});

submitButton.addEventListener("click", function () {
    addListItem();
});

listInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addListItem();
    }
});

function addListItem() {
    const output = listInput.value.trim();

    if (output === "") {
        return;
    }

    appState.todos.push({
        text: output,
        completed: false
    });

    saveState();
    renderTodos();

    listInput.value = "";
    listInput.focus();
}

const appState = {
    currentUser,
    todos: []
};

loadState();
renderTodos();

function getTodoStorageKey() {
    return `todoAppState:${encodeURIComponent(currentUser.name)}`;
}

function saveState() {
    localStorage.setItem(getTodoStorageKey(), JSON.stringify({
        currentUser: appState.currentUser,
        todos: appState.todos
    }));
}

function loadState() {
    const saved = localStorage.getItem(getTodoStorageKey());

    if (saved) {
        const parsed = JSON.parse(saved);
        appState.todos = Array.isArray(parsed.todos) ? parsed.todos : [];
        return;
    }
}

function renderTodos() {
    todoList.innerHTML = "";

    appState.todos.forEach((todo) => {
        const listItem = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = todo.text;

        if (todo.completed) {
            text.style.textDecoration = "line-through";
        }

        const checkboxButton = document.createElement("button");
        checkboxButton.className = "check-button";
        checkboxButton.innerHTML = '<i class="fa-solid fa-check"></i>';

        if (todo.completed) {
            checkboxButton.classList.add("checked");
        }

        checkboxButton.addEventListener('click', function() {
            todo.completed = !todo.completed;
            saveState();
            renderTodos();
        });
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-x"></i>';

        deleteButton.addEventListener("click", function () {
            const index = appState.todos.indexOf(todo);
            appState.todos.splice(index, 1);
            saveState();
            renderTodos();
        });

        listItem.append(text, checkboxButton, deleteButton);
        todoList.appendChild(listItem);
    });
}