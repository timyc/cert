<script lang="ts">
import { defineComponent, computed } from 'vue';
import { firebaseStore } from '@/stores/firebase';
import ProfileUniWidget from '@/components/ProfileUniWidget.vue';
import { yearsBetween, degreeString } from '@/helpers/Degree';
import HTTP from '@/helpers/HTTP';
export default defineComponent({
    data() {
        return {
            results: [] as any,
            loading: true,
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
            }).finally(() => {
                this.loading = false;
            });
    },
    methods: {
        yearsBetween(begin: Date, end: Date) {
            return yearsBetween(begin, end);
        },
        degreeString(highest_degree: number, degree_name: string) {
            return degreeString(highest_degree, degree_name);
        },
    }
});
</script>

<template>
    <div v-if="loading">
    loading...
    </div>
    <div v-if="!loading">
        <el-row>
            <el-tag class="ml-2" type="success">Verified User</el-tag>
        </el-row>
        <el-row justify="center">
            <el-avatar :size="200" :src="user.photoURL" fit="fill" />
        </el-row>
        <el-row justify="center">
            <h1>{{ user.displayName }}</h1>
        </el-row>
        <el-row justify="center" class="mt-1" v-for="result in results">
            <ProfileUniWidget :name="result.name" :image="result.image" :json="JSON.parse(result.json)" />
        </el-row>
        <el-row justify="center" class="mt-1">
            <el-button type="success" style="font-size:30px;padding:30px">Submit</el-button>
        </el-row>
    </div>

</template>