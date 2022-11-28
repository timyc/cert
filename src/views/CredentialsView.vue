<script lang="ts">
import { defineComponent } from 'vue';
import HTTP from '@/helpers/HTTP';
import QrcodeVue from 'qrcode.vue';
import Searchbar from '@/components/Searchbar.vue';
import { firebaseStore } from '@/stores/firebase';
import { ElLoading } from 'element-plus';
import CollegeWidget from '@/components/CollegeWidget.vue';
export default defineComponent({
    setup() {
        const store = firebaseStore();
        return {
            store,
        };
    },
    data() {
        return {
            results: [] as any,
            clicked: false,
            dialogVisible: false,
            link: 'https://m.certitude-demo.delta.games',
        }
    },
    components: {
        QrcodeVue,
        CollegeWidget,
        Searchbar,
    },
    mounted() {
        if (!this.store.loggedIn) {
            this.$router.push('/auth');
        }
        HTTP.retrieveProfileInfo().then(response => {
            this.results = response.data.msg[0];
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        handleClose(done: () => void) {
            done();
        },
        loading() {
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });
            HTTP.profileLink().then(response => {
                this.link = response.data.msg;
                setTimeout(() => {
                    this.clicked = true;
                    this.link = window.location.origin + '/profile/' + response.data.msg;
                    loading.close();
                }, 1000);
            }).catch(error => {
                console.log(error);
            });
        }
    }
});
</script>

<template>
    <el-row justify="center">
        <h1>Your Credentials</h1>
        <template v-for="result in results">
            <CollegeWidget v-for="res in JSON.parse(result.json)" :name="result.name" :degree="res" />
        </template>

    </el-row>
    <el-row justify="center" class="mt-3" v-if="!clicked" @click="dialogVisible = true">
        <el-icon :size="60" color="#3A3535">
            <DocumentAdd />
        </el-icon>
    </el-row>
    <el-row justify="center" class="mt-3" v-if="!clicked">
        <el-icon :size="60" color="#3A3535" @click="loading">
            <Promotion />
        </el-icon>
    </el-row>
    <el-row justify="center" class="mt-1" v-if="clicked">
        <qrcode-vue :value="link" :size="200" level="H" />
    </el-row>
    <el-dialog v-model="dialogVisible" title="Add Credentials" width="80%">
        <Searchbar />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>