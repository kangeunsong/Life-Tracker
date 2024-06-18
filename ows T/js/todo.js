import { auth, db, ref, get, set, getUserInfo, uuidv4 } from './firebase.js';

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
let day = ('0' + currentDate.getDate()).slice(-2);
let dateKey = `${year}${month}${day}`;

let isLoading = true;

// 할 일 폼, 입력 요소, 할 일 리스트를 DOM에서 가져옵니다.
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

// 할 일 목록을 저장할 배열을 초기화합니다.
let toDos = [];
let selectedNum = 0;
let totalNum = 0;

function countSelectedTodos() {
  return toDos.reduce((count, todo) => {
    return count + (todo.value ? 1 : 0);
  }, 0);
}

// Firebase에서 할 일 목록을 가져와 화면에 추가합니다.
auth.onAuthStateChanged(async (user) => {
  if (user) {
    try {
      const userInfo = await getUserInfo(user.uid);
      const userUid = userInfo.uid;
      let path = `scheduler/${userUid}/${dateKey}/todoList`;
      const snapshot = await get(ref(db, path));

      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // 데이터를 불러온 후 selectedNum과 totalNum 값을 설정합니다.
        selectedNum = data.selectedNum || 0;
        totalNum = data.totalNum || 0;

        // 현재 페이지 로드 시, 할 일 목록 및 화면에 추가
        for (const key in data) {
          if (key !== 'totalNum' && key !== 'selectedNum' && data[key].todoText) {
            const newToDoObj = {
              text: data[key].todoText,
              todoID: key,
              value: data[key].value || false
            };
            toDos.push(newToDoObj);
            addToDo(newToDoObj);
          }
        }

        selectedNum = countSelectedTodos();
        await set(ref(db, `${path}/selectedNum`), selectedNum);
      }

    } catch (error) {
      console.error('사용자 정보를 가져오는 중 에러 발생:', error);
    } finally {
      isLoading = false; // 모든 데이터를 불러온 후에 플래그를 비활성화
    } 
  } else {
    console.log('사용자가 로그인하지 않았습니다.');
  }
});

// 할 일 폼이 제출되면 handleToDoSubmit 함수를 호출합니다.
toDoForm.addEventListener("submit", handleToDoSubmit);

async function updateTotalNum(userUid) {
  const path = `scheduler/${userUid}/${dateKey}/todoList/totalNum`;
  await set(ref(db, path), toDos.length);
}

async function updateSelectedNum(userUid, newSelectedNum) {
  const path = `scheduler/${userUid}/${dateKey}/todoList/selectedNum`;
  await set(ref(db, path), newSelectedNum);
}

function saveToDo(newToDoObj) {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const userInfo = await getUserInfo(user.uid);
        const userUid = userInfo.uid;

        const path = `scheduler/${userUid}/${dateKey}/todoList/${newToDoObj.todoID}`;
        await set(ref(db, path), {
          todoText: newToDoObj.text,
          value: newToDoObj.value || false
        });

        await updateTotalNum(userUid);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 에러 발생:', error);
      }
    } else {
      console.log('사용자가 로그인하지 않았습니다.');
    }
  });
}

function deleteToDo(event, newToDoObj) {
  const li = event.target.parentElement;
  toDos = toDos.filter((todo) => todo.todoID !== newToDoObj.todoID);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const userInfo = await getUserInfo(user.uid);
        const userUid = userInfo.uid;

        const path = `scheduler/${userUid}/${dateKey}/todoList/${newToDoObj.todoID}`;
        
        // 선택된 할 일인지 확인
        const snapshot = await get(ref(db, path));
        const target = snapshot.val();
        
        if (target && target.value) {
          selectedNum--;
          await updateSelectedNum(userUid, selectedNum);
        }

        await set(ref(db, path), null);
        await updateTotalNum(userUid);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 에러 발생:', error);
      }
    } else {
      console.log('사용자가 로그인하지 않았습니다.');
    }
  });

  li.remove();
}

function addToDo(newToDoObj) {
  const li = document.createElement("li");
  li.id = newToDoObj.todoID;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = newToDoObj.todoID;

  if (newToDoObj.value) {
    checkbox.checked = true;
    li.classList.add("completed");
  } else {
    checkbox.checked = false;
    li.classList.remove("completed");
  }

  checkbox.addEventListener("change", (event) => {
    if (!isLoading) {
      handleCheckBoxChange(event);
    }
  });

  const span = document.createElement("span");
  span.innerText = newToDoObj.text;

  const btn = document.createElement("button");
  btn.innerText = "Delete";
  btn.addEventListener("click", (event) => deleteToDo(event, newToDoObj));

  saveToDo(newToDoObj);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(btn);
  toDoList.appendChild(li);
}

function handleCheckBoxChange(event) {
  const todoId = event.target.id;
  const todoItem = document.getElementById(todoId);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const userInfo = await getUserInfo(user.uid);
        const userUid = userInfo.uid;

        let path = `scheduler/${userUid}/${dateKey}/todoList/${todoId}`;
        const snapshot = await get(ref(db, path));
        const target = snapshot.val();

        if (event.target.checked) {
          target.value = true;
          todoItem.classList.add("completed");
          selectedNum++;

          await set(ref(db, path), {
            todoText: target.todoText,
            value: true
          });
        } else {
          target.value = false;
          todoItem.classList.remove("completed");
          selectedNum--;

          await set(ref(db, path), {
            todoText: target.todoText,
            value: false
          });
        }

        await updateSelectedNum(userUid, selectedNum);
      } catch (error) {
        console.error('체크 상태 업데이트 중 에러 발생:', error);
      }
    } else {
      console.log('사용자가 로그인하지 않았습니다.');
    }
  });
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    todoID: uuidv4(),
    value: false
  };
  toDos.push(newToDoObj);
  addToDo(newToDoObj);
}
