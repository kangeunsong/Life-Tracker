import { auth, db, ref, get, getUserInfo, signInWithEmailAndPassword } from './firebase.js';

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        let username;
        const user = userCredential.user;
        
        try {
            const userInfo = await getUserInfo(user.uid);
            const userUid = userInfo.uid;
            const path = `users/${userUid}`;
            const snapshot = await get(ref(db, path));
    
            if (snapshot.exists()) {
                const data = snapshot.val();
                username = data.name;
            }

            alert(`로그인 성공\n\n${username}님 안녕하세요!`);
            window.location.href = "scheduler.html";
        } catch (error) {
            console.error(error);
        }
        
    } catch (error) {
        alert('로그인 실패\n\n이메일과 비밀번호를 확인해주세요.');
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