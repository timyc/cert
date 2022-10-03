<script setup lang="ts">
    type Degree = {
        name: string,
        type: number
        begin: string,
        end: string
    }
    const props = defineProps<{
        name: String,
        degree: Degree,
    }>();
    const degrees:string[] = ["None", "B.S.","M.S.","PhD"];
</script>

<template>
    <el-card style="width:90vw" class="mt-1">
        <el-row class="center">
            <el-col>
                <h3>{{ name }}</h3>
            </el-col>
            <el-col class="text-success">
                {{ degrees[degree.type] }} in {{ degree.name }}
            </el-col>
            <el-col>
                <p>{{ degree.begin }}-{{ degree.end }}</p>
            </el-col>
        </el-row>
    </el-card>
</template>