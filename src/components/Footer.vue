<script setup lang="ts">
    const company = import.meta.env.VITE_COMPANY;
</script>
<template>
    <el-footer class="center">
        Copyright &copy; 2022 {{ company }}
    </el-footer>
</template>