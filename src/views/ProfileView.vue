<script lang="ts">
import { defineComponent, computed } from 'vue';
import { firebaseStore } from '@/stores/firebase';
export default defineComponent({
    setup() {
        const userStore = firebaseStore();
        const user = computed(() => userStore.user);
        return { user };
    }
});
</script>

<template>
    <el-row>
        <el-tag class="ml-2" type="success">Verified User</el-tag>
    </el-row>
    <el-row justify="center">
        <el-avatar :size="200" :src="user.photoURL" fit="fill" />
    </el-row>
    <el-row justify="center">
        <h1>{{ user.displayName }}</h1>
    </el-row>
    <el-row justify="center">
        <b>5th Year</b>
    </el-row>
    <el-row justify="center">
        <b>PhD in Gender Studies</b>
    </el-row>
    <el-row justify="center" class="mt-1">
        <el-card style="width:90vw">
            <el-row>
                <el-col :span="12" class="center d-flex">
                    <el-image src="https://i.imgur.com/w7xiAxP.gif" fit="contain" />
                </el-col>
                <el-col :span="12" class="center d-flex">
                    University of Alabama
                </el-col>
            </el-row>
        </el-card>
    </el-row>
    <el-row justify="center" class="mt-1">
        <el-button type="success" style="font-size:30px;padding:30px">Submit</el-button>
    </el-row>
</template>