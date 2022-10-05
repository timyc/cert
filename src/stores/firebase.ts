import { defineStore } from "pinia";
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/firebase/config';

export const firebaseStore = defineStore("userStore", {
    state: () => {
        return {
            user: undefined as unknown as User,
            loggedIn: false, // conditional for rendering templates
            loading: false, // may be useful for a spinner
        }
    },
    actions: {
        setUser() { // initializes the listener for auth state changes
            this.loading = true;
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    console.log('User is signed in');
                    this.user = user;
                    this.loading = false;
                    this.loggedIn = true;
                } else {
                    console.log('User is signed out');
                    this.user = undefined as unknown as User;
                    this.loggedIn = false;
                    this.loading = false;
                }
            });
        },
    },
    persist: true,
});
