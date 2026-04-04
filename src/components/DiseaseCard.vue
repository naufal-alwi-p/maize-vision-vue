<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'

interface Props {
  diseaseId: string
  diseaseName: string
  severity: 'Severe' | 'Moderate' | 'Mild'
  diseaseImage: string
  characteristic: string
  solution: string
  category: string
}

defineProps<Props>()
</script>

<template>
  <div class="border-b border-[#e7eddc] py-6 last:border-b-0">
    <Card class="overflow-hidden rounded-2xl border border-[#e2ead6] bg-white shadow-[0_12px_28px_rgba(63,83,48,0.06)]" :pt="{ body: { class: 'p-0' } }">
      <template #content>
        <div class="grid grid-cols-1 items-center gap-6 md:grid-cols-[280px_1fr]">
          <div class="overflow-hidden rounded-xl bg-[#f1f5eb] p-4 ml-0 md:ml-6">
            <img
              :src="diseaseImage"
              :alt="diseaseName"
              class="h-60 w-full object-cover"
            />
          </div>

          <div class="flex flex-col justify-between py-6 pl-6 md:pl-0 pr-6">
            <div>
              <div class="mb-3 flex items-center gap-2">
                <h3 class="text-xl font-bold text-[#355223]">{{ diseaseName }}</h3>
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
                    severity === 'Severe'
                      ? 'bg-[#fee2e2] text-[#b91c1c]'
                      : severity === 'Moderate'
                        ? 'bg-[#fef3c7] text-[#b45309]'
                        : 'bg-[#dcfce7] text-[#15803d]',
                  ]"
                >
                  {{ severity }}
                </span>
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

            <Button
              label="Learn More"
              icon="pi pi-arrow-right"
              iconPos="right"
              class="w-fit rounded-full border-0 bg-[#35591d] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(53,89,29,0.18)] transition hover:bg-[#2e4f19]"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
