import { auth, db, ref, set } from './firebase.js';

// DOM Loaded event listener
document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('submit-btn');

    saveButton.addEventListener('click', function () {
        const diaryContent = document.getElementById('diary-textarea').value.trim();

        // Check if diary content is empty
        if (diaryContent === '') {
            alert('Please enter your diary!');
            return;
        }

        saveDiary(diaryContent);
    });
});

async function saveDiary(diaryContent) {
    try {
        // Get the current user
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User not authenticated');
        }

        // Get current date
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-indexed, so add 1
        const day = ('0' + currentDate.getDate()).slice(-2); // Pad day with leading zero if needed

        // Generate the key based on current date (YYYYMMDD)
        const diaryKey = `${year}${month}${day}`;

        // Store user diary in Realtime Database
        console.log('Storing user diary in Realtime Database');
        await set(ref(db, `diary/${user.uid}/${diaryKey}`), {
            content: diaryContent
        });

        const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayOfWeek = dayOfWeekNames[currentDate.getDay()];
        alert(dayOfWeek + ' ' + day + ' ' + month + ' ' + year + '\nDiary Submission Success!');
    } catch (error) {
        console.error('Error during diary submission:', error);
        alert('Diary Submission Fail!\nPlease try again');
    }
}