// login.js
import { auth, signInWithEmailAndPassword } from './firebase.js';

// 로그인 함수
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // 로그인 성공 시 처리
        const user = userCredential.user;
        alert('로그인 성공');
        window.location.href = "scheduler.html";
    } catch (error) {
        // 로그인 실패 시 처리
        alert('로그인 실패: ' + error.message);
    }
}

// DOMContentLoaded 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');

    loginButton.addEventListener('click', () => {
        const email = document.getElementById('account').value;
        const password = document.getElementById('pw').value;
        login(email, password);
    });

    signupButton.addEventListener('click', () => {
        window.location.href = "signup.html"; // signup.html로 이동
    });
});
