<script setup lang="ts">
import Card from 'primevue/card'

interface Props {
  diseaseId: string
  diseaseName: string
  diseaseImage: string
  characteristic: string[]
  solution: string[] | Record<string, string[]>
  category: string
  references: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="py-3 md:py-6">
    <Card class="overflow-hidden rounded-2xl border border-[#e2ead6] bg-white shadow-[0_12px_28px_rgba(63,83,48,0.06)]" :pt="{ body: { class: 'p-0' } }">
      <template #content>
        <div class="grid grid-cols-1 items-start gap-2 md:py-6 md:gap-6 md:grid-cols-[280px_1fr]">
          <div class="overflow-hidden rounded-xl md:bg-[#f1f5eb] p-4 ml-0 md:ml-6">
            <img
              :src="diseaseImage"
              :alt="diseaseName"
              class="md:h-60 w-full object-contain md:object-cover"
            />
          </div>

          <div class="flex flex-col justify-between py-1 pl-6 md:pl-0 pr-6">
            <div>
              <div class="mb-3 flex items-center gap-2">
                <h3 class="text-2xl font-bold text-[#355223]">{{ diseaseName }}</h3>
              </div>

              <p class="mb-4 text-[#6b7c6a]">
                <span class="font-semibold text-[#5a7a37]">Kategori:</span> {{ category }}
              </p>

              <div class="mb-5">
                <p class="mb-2 font-semibold text-[#355223]">Karakteristik:</p>
                <ul class="list-disc pl-5 space-y-1">
                  <li v-for="(item, idx) in characteristic" :key="idx" class="text-sm leading-7 text-[#66715f]">{{ item }}</li>
                </ul>
              </div>

              <div class="mb-6">
                <p class="mb-2 font-semibold text-[#355223]">Solusi:</p>
                <template v-if="Array.isArray(solution)">
                  <ul class="list-disc pl-5 space-y-1">
                    <li v-for="(item, idx) in solution" :key="idx" class="text-sm leading-7 text-[#66715f]">{{ item }}</li>
                  </ul>
                </template>
                <template v-else>
                  <div v-for="(items, key) in solution" :key="key" class="mb-3">
                    <p class="text-sm font-medium text-[#4a6336] mb-1">{{ key }}</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li v-for="(item, idx) in items" :key="idx" class="text-sm leading-7 text-[#66715f]">{{ item }}</li>
                    </ul>
                  </div>
                </template>
              </div>

              <div class="mb-6">
                <p class="mb-2 font-semibold text-[#355223]">Referensi:</p>
                <div class="space-y-3">
                  <p
                    v-for="(ref, idx) in references"
                    :key="idx"
                    class="text-sm leading-7 text-[#66715f] -indent-4 pl-8"
                  >
                    {{ ref }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
