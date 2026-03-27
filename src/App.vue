<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/navigation/NavBar.vue';
</script>

<template>
    <NavBar />

    <main class="p-3">
        <RouterView />
    </main>
</template>
