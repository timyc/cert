<script lang="ts">
import { defineComponent } from 'vue';
import HTTP from '@/helpers/HTTP';
import QrcodeVue from 'qrcode.vue';
import Searchbar from '@/components/Searchbar.vue';
import { ElMessageBox } from 'element-plus';
import CollegeWidget from '@/components/CollegeWidget.vue';
export default defineComponent({
    data() {
        return {
            results: [] as any,
            clicked: false,
            dialogVisible: false,
        }
    },
    components: {
        QrcodeVue,
        CollegeWidget,
        Searchbar,
    },
    mounted() {
        HTTP.retrieveProfileInfo().then(response => {
            this.results = response.data.msg;
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        handleClose(done: () => void) {
            done();
        }
    }
});
</script>

<template>
    <el-row justify="center">
        <h1>Your Credentials</h1>
        <CollegeWidget v-for="result in results" :name="result.name" :degree="JSON.parse(result.json)" />
    </el-row>
    <el-row justify="center" class="mt-3" v-if="!clicked" @click="dialogVisible = true">
        <el-icon :size="60" color="#3A3535">
            <DocumentAdd />
        </el-icon>
    </el-row>
    <el-row justify="center" class="mt-3" v-if="!clicked">
        <el-icon :size="60" color="#3A3535" @click="clicked = true">
            <Promotion />
        </el-icon>
    </el-row>
    <el-row justify="center" class="mt-1" v-if="clicked">
        <qrcode-vue value="https://google.com" :size="200" level="H" />
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