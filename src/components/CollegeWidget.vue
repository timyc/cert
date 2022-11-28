<script setup lang="ts">
import { degreeString } from '@/helpers/Degree';
    type Degree = {
        degree_name: string,
        highest_degree: number
        begin_date: string,
        end_date: string,
        holder?: string,
    }
    const props = defineProps<{
        name: String,
        degree: Degree,
    }>();
</script>

<template>
    <el-card style="width:90vw" class="mt-1">
        <el-row class="center">
            <el-col>
                <h3>{{ name }}</h3>
            </el-col>
            <el-col class="text-success">
                {{ degreeString(degree.highest_degree, degree.degree_name) }}
            </el-col>
            <el-col>
                <p>{{ degree.begin_date }} to {{ degree.end_date }}</p>
            </el-col>
            <el-col v-if="degree.holder">
                <p>Holder: {{ degree.holder }}</p>
            </el-col>
        </el-row>
    </el-card>
</template>