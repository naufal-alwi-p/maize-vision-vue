<script setup lang="ts">
import Card from 'primevue/card'

interface Props {
  diseaseId: string
  diseaseName: string
  diseaseImage: string
  characteristic: string
  solution: string
  category: string
}

defineProps<Props>()
</script>

<template>
  <div class="py-3 md:py-6">
    <Card class="overflow-hidden rounded-2xl border border-[#e2ead6] bg-white shadow-[0_12px_28px_rgba(63,83,48,0.06)]" :pt="{ body: { class: 'p-0' } }">
      <template #content>
        <div class="grid grid-cols-1 items-center gap-2 md:gap-6 md:grid-cols-[280px_1fr]">
          <div class="overflow-hidden rounded-xl bg-[#f1f5eb] p-4 ml-0 md:ml-6">
            <img
              :src="diseaseImage"
              :alt="diseaseName"
              class="md:h-60 w-full object-contain md:object-cover"
            />
          </div>

          <div class="flex flex-col justify-between py-1 md:py-6 pl-6 md:pl-0 pr-6">
            <div>
              <div class="mb-3 flex items-center gap-2">
                <h3 class="text-xl font-bold text-[#355223]">{{ diseaseName }}</h3>
              </div>

              <p class="mb-4 text-sm text-[#6b7c6a]">
                <span class="font-semibold text-[#5a7a37]">Category:</span> {{ category }}
              </p>

              <div class="mb-5">
                <p class="mb-2 text-sm font-semibold text-[#355223]">Characteristics:</p>
                <p class="text-sm leading-7 text-[#66715f]">{{ characteristic }}</p>
              </div>

              <div class="mb-6">
                <p class="mb-2 text-sm font-semibold text-[#355223]">Solution:</p>
                <p class="text-sm leading-7 text-[#66715f]">{{ solution }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
