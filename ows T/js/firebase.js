import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, get} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { v4 as uuidv4 } from "https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMwHPB2y4xe5X4RATspyh-vdeQDxP3_co",
    authDomain: "life-tracker-1d8ad.firebaseapp.com",
    databaseURL: "https://life-tracker-1d8ad-default-rtdb.firebaseio.com",
    projectId: "life-tracker-1d8ad",
    storageBucket: "life-tracker-1d8ad.appspot.com",
    messagingSenderId: "849733791983",
    appId: "1:849733791983:web:75ac483e5f011e9a21eb1a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, ref, set, get, uuidv4 };

export async function getUserInfo(uid) {
    try {
        const userRef = ref(db, `users/${uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}