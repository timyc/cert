<script setup lang="ts">
const props = defineProps<{
    image: string,
    name: string,
}>();
</script>

<template>
    <el-card style="width:90vw">
        <el-row>
            <el-col :span="12" class="center d-flex">
                <el-image :src="image" fit="contain" />
            </el-col>
            <el-col :span="12" class="center d-flex">
                {{ name }}
            </el-col>
        </el-row>
    </el-card>
</template>