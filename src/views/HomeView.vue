<script setup lang="ts">
import Button from "primevue/button"

const pesan = "<b>Makan Nasi</b>";
</script>

<template>
  <h1>Halo</h1>

  <p>{{ pesan.toUpperCase() }}</p>

  <Button severity="info" @click="console.log('Halo')">Click</Button>

  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>

  <div class="h-250"></div>
</template>
