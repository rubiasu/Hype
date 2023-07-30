import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";

const firebaseConfig = {

    apiKey: "AIzaSyB2OPEp6fV8D7mZw1qTO6AV5YKytU0i9WU",
  
    authDomain: "hype-dev-4e0c8.firebaseapp.com",
  
    projectId: "hype-dev-4e0c8",
  
    storageBucket: "hype-dev-4e0c8.appspot.com",
  
    messagingSenderId: "758984972172",
  
    appId: "1:758984972172:web:4a66188e9d327e169ca8a9",
  
    measurementId: "G-L58YFK8CCS"
  
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    onAuthStateChanged(auth, (user) => {
      set(user)
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  }
}

export const user = userStore();