<script setup lang="ts">
  const props = defineProps({
    anim: String
  });
</script>

<template>
    <el-aside :class="['sidenav', anim]">
      <el-menu :router="true">
        <el-menu-item index="1" route="/">
          Home
        </el-menu-item>
        <el-menu-item index="2" route="/me">
          Profile
        </el-menu-item>
        <el-menu-item index="3" route="/credentials">
          Credentials
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>