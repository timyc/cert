<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { firebaseStore } from './stores/firebase';
import { ref, computed } from 'vue';
import Sidebar from './components/Sidebar.vue';
import UserWidget from './components/header/UserWidget.vue';
import Footer from './components/Footer.vue';
const expanded = ref(false);
const anim = ref('mi-right');
const loggedIn = computed(() => firebaseStore().loggedIn);
function collapse(){
  anim.value = 'mo-right';
  setTimeout(() => {
    anim.value = 'mi-right';
    expanded.value = false;
  }, 300);
}
</script>

<template>
  <el-container style="min-height:100vh">
    <Sidebar v-if="expanded" :anim="anim" @clicked="collapse()" />
    <el-header class="mt-1">
      <el-row class="w-100">
        <el-col :span="12" class="d-flex center">
          <el-icon :size="30" color="#3A3535" @click="expanded = true" v-if="!expanded && loggedIn">
            <Expand />
          </el-icon>
        </el-col>
        <el-col :span="12" class="d-flex j-end center">
          <UserWidget />
        </el-col>
      </el-row>
    </el-header>
    <el-main @click="collapse()">
      <RouterView />
    </el-main>
    <Footer />
  </el-container>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
