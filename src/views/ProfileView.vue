<script lang="ts">
import { defineComponent, computed } from 'vue';
import { firebaseStore } from '@/stores/firebase';
import ProfileUniWidget from '@/components/ProfileUniWidget.vue';
import HTTP from '@/helpers/HTTP';
export default defineComponent({
    data() {
        return {
            results: [] as any,
        }
    },
    components: {
        ProfileUniWidget,
    },
    setup() {
        const userStore = firebaseStore();
        const user = computed(() => userStore.user);
        return { user };
    },
    mounted() {
        HTTP.retrieveProfileInfo()
            .then(response => {
                this.results = response.data.msg;
                console.log(this.results);
            })
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
    <template v-if="results.length > 0">
        <el-row justify="center">
            <b>5th Year</b>
        </el-row>
        <el-row justify="center">
            <b>PhD in Gender Studies</b>
        </el-row>
    </template>
    <template v-else>
        <el-row justify="center">
            No Degree
        </el-row>
    </template>

    <el-row justify="center" class="mt-1" v-for="result in results">
        <ProfileUniWidget :name="result.name" :image="result.image" />
    </el-row>
    <el-row justify="center" class="mt-1">
        <el-button type="success" style="font-size:30px;padding:30px">Submit</el-button>
    </el-row>
</template>