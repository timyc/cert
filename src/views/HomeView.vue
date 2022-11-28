<script setup lang="ts">
import Searchbar from '@/components/Searchbar.vue';
import HomeCard from '@/components/HomeCard.vue';
</script>
<template>
  <el-row class="x-center" justify="center" style="width:270px">
    <div>
    <h1 class="top-text">Certitude is <span class="seam">Seamless</span></h1>
  </div>
  </el-row>
  <el-row justify="center">
    <p style="text-align:center">
      Our revolutionary education verification<br />
      platform is simple, instant, and secure
    </p>
  </el-row>
  <el-row class="mb-3" justify="center">
    <Searchbar />
  </el-row>
  <el-row justify="center">
    <HomeCard />
  </el-row>
</template>
