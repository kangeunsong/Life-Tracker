import { auth, db, ref, get, set, getUserInfo } from './firebase.js';

document.addEventListener('DOMContentLoaded', function () {
    const currentDateElem = document.getElementById('current-date');
    const prevDateBtn = document.getElementById('prev-date-btn');
    const nextDateBtn = document.getElementById('next-date-btn');
    const saveButton = document.getElementById('submit-btn');
    const emotionCells = document.querySelectorAll('#emotion-table td');

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let day = ('0' + currentDate.getDate()).slice(-2);
    let diaryKey = `${year}${month}${day}`;

    // Set initial date display
    currentDateElem.textContent = `${year}년 ${month}월 ${day}일`;

    // Handle click events for emotion selection
    emotionCells.forEach(function (td) {
        td.addEventListener('click', function () {
            emotionCells.forEach(function (cell) {
                cell.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    // Handle previous date button click
    prevDateBtn.addEventListener('click', function () {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDate();
        loadDiary(diaryKey);
    });

    // Handle next date button click
    nextDateBtn.addEventListener('click', function () {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDate();
        loadDiary(diaryKey);
    });

    // Handle save button click
    saveButton.addEventListener('click', function () {
        const selectedEmotion = document.querySelector('#emotion-table td.selected');
        if (!selectedEmotion) {
            alert('감정을 선택해주세요!');
            return;
        }
        const emotionIndex = Array.from(selectedEmotion.parentNode.children).indexOf(selectedEmotion) + 1;
        const diaryContent = document.getElementById('diary-textarea').value.trim();
        if (diaryContent === '') {
            alert('일기 내용을 입력해주세요!');
            return;
        }
        saveDiary(emotionIndex, diaryContent, diaryKey);
    });

    // Function to update displayed date
    function updateDate() {
        year = currentDate.getFullYear();
        month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        day = ('0' + currentDate.getDate()).slice(-2);
        diaryKey = `${year}${month}${day}`;
        currentDateElem.textContent = `${year}년 ${month}월 ${day}일`;
    }

    // Function to load diary content
    async function loadDiary(diaryKey) {
        try {
            const user = auth.currentUser;
            if (user) {
                const userInfo = await getUserInfo(user.uid);
                if (userInfo) {
                    const userUid = userInfo.uid;
                    const diaryRef = ref(db, `diary/${userUid}/${diaryKey}`);
                    const snapshot = await get(diaryRef);
                    if (snapshot.exists()) {
                        const diaryData = snapshot.val();
                        document.getElementById('diary-textarea').value = diaryData.content;
                        const emotionIndex = diaryData.emotion - 1;
                        emotionCells.forEach((cell, index) => {
                            if (index === emotionIndex) {
                                cell.classList.add('selected');
                            } else {
                                cell.classList.remove('selected');
                            }
                        });
                    } else {
                        document.getElementById('diary-textarea').value = '';
                        emotionCells.forEach((cell) => {
                            cell.classList.remove('selected');
                        });
                    }
                } else {
                    console.error('사용자 정보가 없습니다.');
                }
            } else {
                console.log('사용자가 로그인하지 않았습니다.');
            }
        } catch (error) {
            console.error('일기를 불러오는 중 에러 발생:', error);
        }
    }

    // Function to save diary content
    async function saveDiary(emotion, diaryContent, diaryKey) {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('사용자 인증되지 않음');
            }
            console.log('사용자 일기를 Realtime Database에 저장 중');
            await set(ref(db, `diary/${user.uid}/${diaryKey}`), {
                emotion: emotion,
                content: diaryContent,
            });
            const dayOfWeekNames = ['일', '월', '화', '수', '목', '금', '토'];
            const dayOfWeek = dayOfWeekNames[currentDate.getDay()];
            alert(dayOfWeek + ' ' + day + ' ' + month + ' ' + year + '\n일기 제출 성공!');
        } catch (error) {
            console.error('일기 제출 중 오류 발생:', error);
            alert('일기 제출 실패!\n다시 시도해주세요');
        }
    }

    // Check authentication state and load diary if user is authenticated
    auth.onAuthStateChanged((user) => {
        if (user) {
            loadDiary(diaryKey);
        } else {
            console.log('사용자가 로그인하지 않았습니다.');
        }
    });
});