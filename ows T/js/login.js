import { auth, signInWithEmailAndPassword } from './firebase.js';

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert('로그인 성공');
        window.location.href = "scheduler.html";
    } catch (error) {
        alert('로그인 실패: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');

    loginButton.addEventListener('click', () => {
        const email = document.getElementById('account').value;
        const password = document.getElementById('pw').value;
        login(email, password);
    });

    signupButton.addEventListener('click', () => {
        window.location.href = "signup.html";
    });
});
