//할일 추가 삭제하는 함수 모음

const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";
const savedToDo = localStorage.getItem(TODOS_KEY);
let toDos = [];

if (savedToDo !== null) {
  const parsedToDo = JSON.parse(savedToDo);
  toDos = parsedToDo;
  console.log(parsedToDo);
  parsedToDo.forEach(addToDo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

function saveToDo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
  saveToDo();
  li.remove();
}

function addToDo(newToDoObj) {
  const li = document.createElement("li");
  li.id = newToDoObj.id;
  const span = document.createElement("span");
  const btn = document.createElement("button");
  span.innerText = newToDoObj.text;
  btn.innerText = "Delete";
  btn.addEventListener("click", deleteToDo);

  saveToDo();

  li.appendChild(span);
  li.appendChild(btn);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  addToDo(newToDoObj);
  console.log(newToDo);
}
