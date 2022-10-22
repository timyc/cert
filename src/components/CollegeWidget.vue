<script setup lang="ts">
    type Degree = {
        degree_name: string,
        highest_degree: number
        begin_date: string,
        end_date: string
    }
    const props = defineProps<{
        name: String,
        degree: Degree,
    }>();
    const degrees:string[] = ["None", "B.S.","B.A.","M.S.","PhD"];
</script>

<template>
    <el-card style="width:90vw" class="mt-1">
        <el-row class="center">
            <el-col>
                <h3>{{ name }}</h3>
            </el-col>
            <el-col class="text-success">
                {{ degrees[degree.highest_degree] }} in {{ degree.degree_name }}
            </el-col>
            <el-col>
                <p>{{ degree.begin_date }} to {{ degree.end_date }}</p>
            </el-col>
        </el-row>
    </el-card>
</template>