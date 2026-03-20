<script setup lang="ts">
import Button from "primevue/button"
</script>

<template>
  <main>
    <h1>Halo</h1>

    <Button severity="info" @click="console.log('Halo')">Click</Button>

    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </main>
</template>
