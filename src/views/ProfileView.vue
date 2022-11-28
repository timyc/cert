<script lang="ts">
import { defineComponent, computed } from 'vue';
import { firebaseStore } from '@/stores/firebase';
import ProfileUniWidget from '@/components/ProfileUniWidget.vue';
import { yearsBetween, degreeString } from '@/helpers/Degree';
import { ElMessage, ElMessageBox } from 'element-plus';
import HTTP from '@/helpers/HTTP';
export default defineComponent({
    data() {
        return {
            results: [] as any,
            avatar: '',
            loading: true,
        }
    },
    components: {
        ProfileUniWidget,
    },
    setup() {
        const userStore = firebaseStore();
        const user = computed(() => userStore.user);
        return { user, userStore };
    },
    mounted() {
        if (!this.userStore.loggedIn) {
            this.$router.push('/auth');
            return;
        }
        HTTP.retrieveProfileInfo()
            .then(response => {
                this.results = response.data.msg;
                this.avatar = this.results[1].avatar;
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
        changeAvatar() {
            ElMessageBox.prompt('Please input your avatar URL', 'Tip', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                inputPattern:
                    /(https?:\/\/.*\.(?:png|jpg))/, // not the best regex
                inputErrorMessage: 'Invalid URL',
            })
                .then(({ value }) => {
                    HTTP.updateAvatar(value)
                        .then(response => {
                            ElMessage({
                                type: 'success',
                                message: 'Avatar change success',
                            });
                            this.avatar = value;
                        })
                        .catch(error => {
                            ElMessage({
                                type: 'error',
                                message: 'An error occured, please try again later',
                            });
                        });
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Change canceled',
                    })
                })
        }
    }
});
</script>

<template>
    <div v-if="loading">
        loading...
    </div>
    <div v-if="!loading">
        <el-row v-if="results[1].access > 1">
            <el-tag class="ml-2" type="success">Verified User</el-tag>
        </el-row>
        <el-row justify="center">
            <el-avatar :size="200"
                :src="avatar != '' ? avatar : 'https://i.imgur.com/hkNb2Bi.jpg'" fit="fill"
                @click="changeAvatar" />
        </el-row>
        <el-row justify="center">
            <h1>{{ user.displayName }}</h1>
        </el-row>
        <el-row justify="center" class="mt-1" v-for="result in results[0]">
            <template v-for="res in JSON.parse(result.json)">
                <ProfileUniWidget :name="result.name" :image="result.image" :json="res" />
            </template>

        </el-row>
        <el-row justify="center" class="mt-1">
            <el-button type="success" style="font-size:30px;padding:30px" @click="$router.push('/credentials')">Submit
            </el-button>
        </el-row>
    </div>

</template>