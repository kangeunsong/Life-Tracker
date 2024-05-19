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
  
  // 체크박스 생성
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // 체크박스의 체크 상태를 저장하기 위해 id 설정
  checkbox.id = "checkbox-" + newToDoObj.id; 
  // 체크박스 상태 변경 시 이벤트 리스너 추가
  checkbox.addEventListener("change", handleCheckBoxChange);
  
  // 레이블 생성
  const label = document.createElement("label");
  label.setAttribute("for", checkbox.id);
  label.innerText = newToDoObj.text;
  
  const btn = document.createElement("button");
  btn.innerText = "Delete";
  btn.addEventListener("click", deleteToDo);

  saveToDo();

  li.appendChild(checkbox); // 체크박스를 li 요소에 추가
  li.appendChild(label); // 레이블을 li 요소에 추가
  li.appendChild(btn);
  toDoList.appendChild(li);
}

function handleCheckBoxChange(event) {
  const checkboxId = event.target.id;
  const todoId = parseInt(checkboxId.split("-")[1]);
  const todoItem = document.getElementById(todoId);
  
  if (event.target.checked) {
    todoItem.classList.add("completed"); // 체크된 경우 완료된 스타일을 추가
  } else {
    todoItem.classList.remove("completed"); // 체크가 해제된 경우 완료된 스타일을 제거
  }
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
