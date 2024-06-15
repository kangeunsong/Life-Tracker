import { auth } from './firebase.js';

function logout() {
    auth.signOut()
        .then(() => {
            alert('로그아웃 되었습니다.');
            window.location.href = "startPage.html";
        })
        .catch((error) => {
            console.error('로그아웃 실패:', error);
            alert('로그아웃에 실패하였습니다.');
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout');

    logoutButton.addEventListener('click', () => {
        logout();
    });
});

