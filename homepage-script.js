const listInput = document.querySelector(".list-input");
const submitButton = document.querySelector(".submit-todo");
const todoList = document.querySelector(".todo-list");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", function () {
    window.location.href = "login.html";
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
    currentUser: {
        name: "Connor Natiuk",
        email: "connorsemail@gmail.com"
    },
    todos: []
};

function saveState() {
    localStorage.setItem("todoAppState", JSON.stringify(appState))
}

function loadState() {
    const saved = localStorage.getItem("todoAppState")

    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(appState, parsed)
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