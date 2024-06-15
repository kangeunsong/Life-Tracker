// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, get} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMwHPB2y4xe5X4RATspyh-vdeQDxP3_co",
    authDomain: "life-tracker-1d8ad.firebaseapp.com",
    databaseURL: "https://life-tracker-1d8ad-default-rtdb.firebaseio.com",
    projectId: "life-tracker-1d8ad",
    storageBucket: "life-tracker-1d8ad.appspot.com",
    messagingSenderId: "849733791983",
    appId: "1:849733791983:web:75ac483e5f011e9a21eb1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication 객체 생성
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, ref, set, get };

// export function saveUserInfo(uid, name) {
//     const userRef = ref(db, `users/${uid}`);
//     set(userRef, {
//         name: name
//     });
// }

// 사용자 정보 가져오기 예시
export async function getUserInfo(uid) {
    try {
        const userRef = ref(db, `users/${uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
            return snapshot.val(); // Return user data if exists
        } else {
            return null; // Return null if user data doesn't exist
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error; // Throw error for handling in calling function
    }
}