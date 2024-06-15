import { auth, db, ref, get, set, getUserInfo } from './firebase.js';

let isMouseDown = false;
let selectedColor = ''; // 초기 선택된 색상 ID는 빈 문자열
let previousSelectedCell = null;

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
let day = ('0' + currentDate.getDate()).slice(-2);
let dateKey = `${year}${month}${day}`;
let startflag = 0;
let startindex = 0;

// 첫 번째 테이블의 셀을 클릭할 때 색상을 선택하는 함수
document.querySelectorAll('#colorTable td div').forEach(function (cell) {
    cell.addEventListener('click', function () {
        // 이전에 선택된 셀이 있다면 그림자를 원래대로 되돌림
        if (previousSelectedCell) {
            previousSelectedCell.classList.remove('selected');
        }

        // 현재 선택된 셀에 그림자 추가하고, ID 저장
        this.classList.add('selected');
        selectedColor = this.parentElement.id; // 부모 td의 id를 가져옴
        previousSelectedCell = this;
    });
});

// 두 번째 테이블의 셀의 배경색을 토글하는 함수
function toggleCellBackground(cell) {
    if (cell.style.backgroundColor === selectedColor) {
        cell.style.backgroundColor = 'white';
    } else {
        cell.style.backgroundColor = selectedColor;
    }
}

function setTimeTable(cell, index, color, flag){
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const userInfo = await getUserInfo(user.uid);
                const userUid = userInfo.uid;

                const path = `scheduler/${userUid}/${dateKey}/timeTable/${index}`; // 데이터베이스 경로

                if(flag == 1){
                    await set(ref(db, path), {
                        color: color,
                        select: true
                    });
                } else {
                    await set(ref(db, path), {
                        color: null,
                        select: null
                    });
                }
            } catch (error) {
                console.error('사용자 정보를 가져오는 중 에러 발생:', error);
            }
        } else {
            console.log('사용자가 로그인하지 않았습니다.');
        }
    });                
}

// 마우스 버튼이 떼어질 때 드래그 상태 해제
document.body.addEventListener('mouseup', function () {
    isMouseDown = false;
});

// 첫 번째 테이블의 셀을 클릭할 때 색상을 선택하는 함수
document.querySelectorAll('#colorTable td div').forEach(function (cell) {
    cell.addEventListener('click', function () {
        // 이전에 선택된 셀이 있다면 그림자를 원래대로 되돌림
        if (previousSelectedCell) {
            previousSelectedCell.classList.remove('selected');
        }

        // 현재 선택된 셀에 그림자 추가하고, ID 저장
        this.classList.add('selected');
        selectedColor = this.parentElement.id; // 부모 td의 id를 가져옴
        previousSelectedCell = this;
    });
});

// 두 번째 테이블의 셀에 클릭 및 드래그 이벤트 리스너 추가
document.querySelectorAll('#mainTable td').forEach(function (cell, index) {
    cell.addEventListener('mousedown', function () {
        isMouseDown = true;
        toggleCellBackground(this);
        if(!startflag){
            if(cell.style.backgroundColor != 'white'){
                setTimeTable(cell, index, selectedColor, 1);
            } else {
                setTimeTable(cell, index, selectedColor, 0);
            }
            startindex = index;
        }
    });

    cell.addEventListener('mouseenter', function () {
        if (isMouseDown) {
            if(index!=startindex){
                toggleCellBackground(this);
                if(cell.style.backgroundColor != 'white'){
                    setTimeTable(cell, index, selectedColor, 1);
                } else {
                    setTimeTable(cell, index, selectedColor, 0);
                }
            }
        }
    });

    cell.addEventListener('mouseup', function () {
        isMouseDown = false;
        startflag = 0;
        startindex = 0;
    });
    
    // 두 번째 테이블의 셀의 배경색을 토글하는 함수
    function toggleCellBackground(cell) {
        if (cell.style.backgroundColor === selectedColor) {
            cell.style.backgroundColor = 'white';
        } else {
            cell.style.backgroundColor = selectedColor;
        }
    }
});

// 마우스 버튼이 떼어질 때 드래그 상태 해제
document.body.addEventListener('mouseup', function () {
    isMouseDown = false;
});