const toDoForm = document.querySelector(".js-todo-form"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-todo-list");

const TODOS_LS = "toDos";
let toDos = [];

function deleteBtn(event) {
  const li = event.target.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function paintToDos(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  const toDosObj = {
    text: text,
    id: newId,
  };
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteBtn);
  span.innerText = text;
  li.id = newId;
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);
  toDos.push(toDosObj);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDos(currentValue);
  toDoInput.value = "";
}

function askForToDos() {
  toDoForm.addEventListener("submit", handleSubmit);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDos(toDo.text);
    });
  } else {
    askForToDos();
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
