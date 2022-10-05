<script lang="ts">
import { auth } from '@/firebase/config';
import firebase from "firebase/compat/app";
// VSCode may suggest to remove the asterisk BUT IT WILL BREAK EVERYTHING !!11
import * as firebaseui from "firebaseui";
import { defineComponent } from 'vue';
import "firebaseui/dist/firebaseui.css";
import router from '@/router';
export default defineComponent({
    mounted() {
        const ui = new firebaseui.auth.AuthUI(auth);
        // 2 Login Methods: Google and Plaintext email/password
        const uiConfig = {
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
            signInFlow: 'popup',
            callbacks: {
                signInSuccessWithAuthResult: function (authResult: any) {
                    console.log('within callback')
                    router.push('/');
                    // Since the UI is initialized in mounted(), it needs to be destroyed so it can be re-rendered
                    ui.delete();
                    return false;
                }
            }
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }

});
</script>
<template>
    <section id="firebaseui-auth-container"></section>
</template>