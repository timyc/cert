<script lang="ts">
import { defineComponent, computed } from 'vue';
import { firebaseStore } from '@/stores/firebase';
import { signOut } from "firebase/auth";
import { auth } from '@/firebase/config';
export default defineComponent({
    setup() {
        const userStore = firebaseStore();
        /*
         * setUser() SHOULD ONLY BE CALLED ONCE because it sets up the same listener every call
         * UserWidget is guaranteed to be rendered only once, so it's safe to call setUser() here
         */
        userStore.setUser();
        const creds = computed(() => userStore.loggedIn);
        const user = computed(() => userStore.user);
        return { creds, user, userStore };
    },
    methods: {
        logOut() {
            signOut(auth).then(() => {
                this.$router.push('/');
            }).catch((error) => {
                console.log(error);
            });
        }
    }
});
</script>

<template>
    <el-icon :size="30" color="#3A3535" class="no-inherit">
        <Avatar />
    </el-icon>
    <router-link to="/auth" class="d-flex" v-if="!creds">Sign In</router-link>
    <div class="d-flex" v-else>
        <el-dropdown>
            {{ user.displayName }}
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logOut">Sign Out</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

    </div>
</template>