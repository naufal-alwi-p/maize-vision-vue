<script setup lang="ts">
import DiseaseCard from '@/components/DiseaseCard.vue'
import Footer from '@/components/Footer.vue'
import { diseases } from '@/scripts/DiseaseCatalog'
</script>

<template>
  <main class="bg-[#f7f8f3]">
    <section class="bg-[#456b2a]">
      <div class="mx-auto w-[min(1160px,calc(100%-1rem))] px-0 py-16 text-center lg:py-20">
        <h1 class="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Corn Disease Encyclopedia
        </h1>
        <p class="mt-3 text-base text-white/85 md:text-lg">
          Learn about common corn diseases, their symptoms, and treatment methods
        </p>
      </div>
    </section>

    <section class="mx-auto w-[min(1160px,calc(100%-1rem))] px-0 py-12 lg:py-16">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-[#355223]">All Diseases</h2>
        <p class="mt-2 text-[#6d7965]">
          Browse through our database of corn diseases and learn how to manage them.
        </p>
      </div>

      <div class="space-y-0">
        <DiseaseCard
          v-for="disease in diseases"
          :key="disease.id"
          :disease-id="disease.id"
          :disease-name="disease.name"
          :disease-image="disease.image"
          :characteristic="disease.characteristic"
          :solution="disease.solution"
          :category="disease.category"
        />
      </div>
    </section>
  </main>

  <Footer color="green" />
</template>