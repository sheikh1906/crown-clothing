import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdJYv4gQgNatR_ysBeex_qa_Eo4iBaChM",
    authDomain: "crown-clothing-db-61b83.firebaseapp.com",
    projectId: "crown-clothing-db-61b83",
    storageBucket: "crown-clothing-db-61b83.appspot.com",
    messagingSenderId: "113703593104",
    appId: "1:113703593104:web:dc8738e9c10c25d5522415"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.lot('Error creating the user', error.message);
        }
    }

    return userDocRef;
}; 