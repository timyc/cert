<template>
    <el-col class="d-flex">
        <img class="x-center" src="@/assets/verisplash.png" style="max-width:60%" />
    </el-col>

    <el-card class="box-card center">
        <div class="text item">
            <el-icon :size="30" color="#ff7315" class="no-inherit">
                <Pointer />
            </el-icon>
            <h2>One-Click Check</h2>
            <p>
                Students send credentials instantly through a secure link
            </p>
        </div>
        <el-divider>
            <el-icon>
                <star-filled />
            </el-icon>
        </el-divider>
        <div class="text item">
            <el-icon :size="30" color="#ff7315" class="no-inherit">
                <SetUp />
            </el-icon>
            <h2>Data Belongs to Students</h2>
            <p>
                Business won't share data on signup and only see what you send
            </p>
        </div>
    </el-card>
</template>