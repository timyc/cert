import { defineStore } from "pinia";
import { onAuthStateChanged } from 'firebase/auth';
import HTTP from '@/helpers/HTTP';
import type { User } from 'firebase/auth';
import { auth } from '@/firebase/config';

export const firebaseStore = defineStore("userStore", {
    state: () => {
        return {
            user: undefined as unknown as User,
            loggedIn: false, // conditional for rendering templates
            loading: false, // may be useful for a spinner
            jwt: undefined as unknown as string,
        }
    },
    actions: {
        setUser() { // initializes the listener for auth state changes
            this.loading = true;
            onAuthStateChanged(auth, async (user: any) => {
                if (user) {
                    console.log('User is signed in with token', user.accessToken);
                    if (!this.user) {
                        await HTTP.signInUser(user.accessToken).then((response) => {
                            if (response.data.code === "success") {
                                this.user = user;
                                this.jwt = response.data.msg.token;
                                this.loggedIn = true;
                                this.loading = false;
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                } else {
                    console.log('User is signed out');
                    this.user = undefined as unknown as User;
                    this.jwt = undefined as unknown as string;
                    this.loggedIn = false;
                    this.loading = false;
                }
            });
        },
    },
    persist: true,
});
