<script setup lang="ts">
import { yearsBetween, degreeString } from '@/helpers/Degree';
type json = {
    begin_date: string,
    end_date: string,
    degree_name: string,
    highest_degree: number
}
const props = defineProps<{
    image: string,
    name: string,
    json: json,
}>();
</script>

<template>
    <div>
        <el-row justify="center">
            <b>{{ yearsBetween(new Date(json.begin_date), new Date(json.end_date)) }}</b>
        </el-row>
        <el-row justify="center">
            <b>{{ degreeString(json.highest_degree, json.degree_name) }}</b>
        </el-row>
    </div>

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