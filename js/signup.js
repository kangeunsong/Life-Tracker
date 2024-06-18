import { auth, db, ref, set, createUserWithEmailAndPassword } from './firebase.js';

document.addEventListener('DOMContentLoaded', function () {
    const signupButton = document.getElementById('signup-button');

    signupButton.addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const account = document.getElementById('account').value;
        const pw = document.getElementById('pw').value;
        const pwRE = document.getElementById('pwRE').value;
        const birthday = document.getElementById('birthday').value;
        const ph_num = document.getElementById('ph_num').value;

        if (name === '' || account === '' || pw === '' || pwRE === '' || birthday === '' || ph_num === '') {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        if (pw !== pwRE) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        registerUser(account, pw, pwRE, name, birthday, ph_num);
    });
});

async function registerUser(email, password, passwordDB, name, birthday, phone) {
    try {
        console.log('Creating user with email and password');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await set(ref(db, 'users/' + user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            password: passwordDB,
            birthday: birthday,
            phone: phone
        });

        alert('회원가입이 성공하였습니다.');
        window.location.href = "index.html";
    } catch (error) {
        console.error('Error during registration:', error);
        switch (error.code) {
            case 'auth/invalid-email':
                alert('유효하지 않은 이메일 형식입니다.');
                break;
            case 'auth/weak-password':
                alert('비밀번호는 최소 6자 이상이어야 합니다.');
                break;
            case 'auth/email-already-in-use':
                alert('이미 사용 중인 이메일입니다.');
                break;
            default:
                alert('회원가입 실패');
                break;
        }
    }
}