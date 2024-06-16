import { auth, db, ref, get, set, getUserInfo, uuidv4 } from './firebase.js';

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
let day = ('0' + currentDate.getDate()).slice(-2);
let dateKey = `${year}${month}${day}`;

// 할 일 폼, 입력 요소, 할 일 리스트를 DOM에서 가져옵니다.
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

// 할 일 목록을 저장할 배열을 초기화합니다.
let toDos = [];
let selectedNum = 0;

// Firebase에서 할 일 목록을 가져와 화면에 추가합니다.
auth.onAuthStateChanged(async (user) => {
  if (user) {
    try {
      const userInfo = await getUserInfo(user.uid);
      const userUid = userInfo.uid;
      const path = `scheduler/${userUid}/${dateKey}/todoList`;
      const snapshot = await get(ref(db, path));

      if (snapshot.exists()) {
        const data = snapshot.val();
        selectedNum = data.selectedNum || 0;

        if(data.selectedNum == null){
          await set(ref(db, path), {
            selectedNum: 0
          });
        } else {
          selectedNum = data.selectedNum;
        }
        if(data.totalNum == null){
          await set(ref(db, path), {
            totalNum: 0
          });
        }

        // 현재 페이지 로드 시, 할 일 목록 및 화면에 추가
        for (const key in data) {
          if (key !== 'totalNum' && key !== 'selectedNum' && data[key].todoText) {
            const newToDoObj = {
              text: data[key].todoText,
              todoID: key
            };
            toDos.push(newToDoObj);
            addToDo(newToDoObj);
          }
        }
      }
    } catch (error) {
      console.error('사용자 정보를 가져오는 중 에러 발생:', error);
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
          todoText: newToDoObj.text
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
  checkbox.id = "checkbox-" + newToDoObj.todoID;
  console.log(checkbox.id);
  checkbox.addEventListener("change", handleCheckBoxChange);
  
  const span = document.createElement("span");
  const btn = document.createElement("button");
  span.innerText = newToDoObj.text;
  btn.innerText = "Delete";
  btn.addEventListener("click", (event) => deleteToDo(event, newToDoObj));

  saveToDo(newToDoObj);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(btn);
  toDoList.appendChild(li);
}

function handleCheckBoxChange(event, newToDoObj) {
  const todoId = event.target.id
  const todoItem = document.getElementById(todoId);

  // if (!todoItem) {
  //   console.error('Todo item not found for id:', todoId);
  //   return;
  // }

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const userInfo = await getUserInfo(user.uid);
        const userUid = userInfo.uid;

        const path = `scheduler/${userUid}/${dateKey}/todoList/${newToDoObj.todoID}`; 
        const snapshot = await get(ref(db, path));
        const target = snapshot.val();
    
        if (event.target.checked) {
          target.value = true;
          todoItem.classList.add("completed");
          selectedNum++;
        } else {
          target.value = false;
          todoItem.classList.remove("completed");
          selectedNum--;
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
  console.log(newToDo);
}