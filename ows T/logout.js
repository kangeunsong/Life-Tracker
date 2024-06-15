// logout.js

import { auth } from './firebase.js';

// 로그아웃 함수
function logout() {
    auth.signOut()
        .then(() => {
            // 로그아웃 성공 시 처리
            alert('로그아웃 되었습니다.');
            // 여기서 필요한 UI 변경 등을 수행할 수 있음
            window.location.href = "index.html"; // 로그아웃 후 이동할 페이지 설정
        })
        .catch((error) => {
            // 로그아웃 실패 시 처리
            console.error('로그아웃 실패:', error);
            alert('로그아웃에 실패하였습니다.');
        });
}

// 이벤트 핸들러 등록
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-button');

    logoutButton.addEventListener('click', () => {
        logout();
    });
});