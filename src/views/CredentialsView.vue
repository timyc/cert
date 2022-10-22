<script lang="ts">
import { defineComponent } from 'vue';
import HTTP from '@/helpers/HTTP';
import QrcodeVue from 'qrcode.vue';
import CollegeWidget from '@/components/CollegeWidget.vue';
export default defineComponent({
    data() {
        return {
            results: [] as any,
            clicked: false,
        }
    },
    components: {
        QrcodeVue,
        CollegeWidget,
    },
    mounted() {
        HTTP.retrieveProfileInfo().then(response => {
            this.results = response.data.msg;
            console.log(this.results);
        }).catch(error => {
            console.log(error);
        });
    }
});
</script>

<template>
    <el-row justify="center">
        <h1>Your Credentials</h1>
        <CollegeWidget v-for="result in results" :name="result.name" :degree="JSON.parse(result.json)" />
    </el-row>
    <el-row justify="center" class="mt-3" v-if="!clicked">
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
</template>