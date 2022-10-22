<script setup lang="ts">
  const props = defineProps({
    anim: String
  });
</script>

<template>
    <el-aside :class="['sidenav', anim]">
      <el-menu :router="true">
        <el-menu-item index="1" route="/" @click="$emit('clicked')">
          Home
        </el-menu-item>
        <el-menu-item index="2" route="/me" @click="$emit('clicked')">
          Profile
        </el-menu-item>
        <el-menu-item index="3" route="/credentials" @click="$emit('clicked')">
          Credentials
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>