<script setup lang="ts">
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue';
import CollegeWidget from '@/components/CollegeWidget.vue';
const clicked = ref(false);
</script>

<template>
    <el-row justify="center">
        <h1>Your Credentials</h1>
        <CollegeWidget name="Cape Cod College" :degree="{name: 'Diamond Mining',type: 1,begin:'1969',end:'1988'}" />
        <CollegeWidget name="University of California, Los Angeles"
            :degree="{name: 'Theoretical Mathematics',type: 3,begin:'2019',end:'2021'}" />
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