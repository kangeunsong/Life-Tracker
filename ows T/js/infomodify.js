import { auth, db, ref, set, updatePassword } from './firebase.js';

document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = 'myPage.html';
    });

    const modifyButton = document.getElementById('modify-button');

    modifyButton.addEventListener('click', function () {
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

        modifyUser(pw, name, birthday, ph_num);
    });
});

async function modifyUser(newPassword, name, birthday, phone) {
    try {
        const user = auth.currentUser;

        if (user) {
            // Update the user's password
            await updatePassword(user, newPassword);

            // Update user information in the database
            await set(ref(db, 'users/' + user.uid), {
                uid: user.uid,
                name: name,
                email: user.email, // Use the existing email
                password: newPassword, // Note: Storing passwords in plain text is not secure. Consider hashing the password before storing it.
                birthday: birthday,
                phone: phone
            });

            alert('회원정보 수정이 완료되었습니다.');
            window.location.href = "myPage.html";
        } else {
            alert('로그인된 사용자가 없습니다.');
        }
    } catch (error) {
        console.error('Error during modification:', error);
        alert('회원정보 수정 중 오류가 발생했습니다.');
    }
}