<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ImageCompare from 'primevue/imagecompare'
import { getDiseaseByClassName } from '@/scripts/DiseaseCatalog'

export interface DetectionResultData {
  original_image: string
  grad_cam_image: string
  scores: number[]
  class_names: string[]
}

const props = defineProps<{
  result: DetectionResultData
}>()

const emit = defineEmits<{
  back: []
}>()

const originalImageSrc = computed(() => `${props.result.original_image}`)
const gradCamImageSrc = computed(() => `${props.result.grad_cam_image}`)

const topIndex = computed(() => {
  let maxIdx = 0
  for (let i = 1; i < props.result.scores.length; i++) {
    if ((props.result.scores[i] ?? 0) > (props.result.scores[maxIdx] ?? 0)) {
      maxIdx = i
    }
  }
  return maxIdx
})

const topClassName = computed(() => props.result.class_names[topIndex.value] ?? '')
const topScore = computed(() => props.result.scores[topIndex.value] ?? 0)
const isHealthy = computed(() => topClassName.value === 'Healthy')

const detectedDisease = computed(() => {
  if (isHealthy.value) return undefined
  return getDiseaseByClassName(topClassName.value)
})

const labelColors: Record<string, string> = {
  'Common_Rust': 'bg-amber-700',
  'Gray_Leaf_Spot': 'bg-gray-400',
  'Blight': 'bg-amber-300',
  'Pest_Damage': 'bg-orange-500',
  'Healthy': 'bg-green-500',
}

function getLabelColor(name: string): string {
  return labelColors[name] ?? 'bg-gray-400'
}

const solutionSteps = computed(() => {
  if (!detectedDisease.value) return []
  return detectedDisease.value.solution.split(', ').map((s) => {
    // Capitalize first letter of each step
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/\.$/, '')
  })
})
</script>

<template>
  <main class="bg-[#f7f8f3] text-[#27411a]">
    <section class="mx-auto w-[min(1200px,calc(100%-1rem))] px-0 pt-7 pb-16">
      <!-- Back link -->
      <button
        class="mb-6 flex items-center gap-2 text-sm font-medium text-[#3f6d1e] hover:text-[#2f4a1f] transition-colors cursor-pointer"
        @click="emit('back')"
      >
        <i class="pi pi-arrow-left text-xs"></i>
        Kembali ke Deteksi
      </button>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-[420px_1fr]">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Image Compare Card -->
          <Card
            class="overflow-hidden rounded-2xl border border-[#e3ead9] bg-white shadow-[0_12px_28px_rgba(63,83,48,0.08)]"
            :pt="{ body: { class: 'p-0' } }"
          >
            <template #content>
              <div class="p-5">
                <div class="mb-3 flex items-center gap-2 text-[#4f6d2f]">
                  <i class="pi pi-images"></i>
                  <span class="text-sm font-semibold">Gambar yang Dianalisis</span>
                </div>
                <div class="overflow-hidden rounded-xl w-3/4 mx-auto md:mx-0 md:w-full">
                  <ImageCompare
                    :pt="{
                      root: { style: 'aspect-ratio: 1/1;' },
                    }"
                  >
                    <template #left>
                      <img :src="originalImageSrc" alt="Original image" />
                    </template>
                    <template #right>
                      <img :src="gradCamImageSrc" alt="Grad-CAM visualization" />
                    </template>
                  </ImageCompare>
                </div>
                <div class="mt-3 flex items-center justify-end">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-[#1a2e10]/80 px-3 py-1 text-xs font-medium text-white">
                    <i class="pi pi-sparkles text-[10px]"></i>
                    Analisa AI
                  </span>
                </div>
              </div>
            </template>
          </Card>

          <!-- Detected Disease Card -->
          <Card
            class="overflow-hidden rounded-2xl border border-[#e3ead9] shadow-[0_12px_28px_rgba(63,83,48,0.08)]"
            :class="isHealthy ? 'bg-[#f0fdf4]' : 'bg-[#2f4a1f]'"
            :pt="{ body: { class: 'p-0' } }"
          >
            <template #content>
              <div class="p-5">
                <p
                  class="mb-1 text-xs font-semibold uppercase tracking-wider"
                  :class="isHealthy ? 'text-green-600' : 'text-[#a3c48e]'"
                >
                  {{ isHealthy ? 'HASIL DETEKSI' : 'PENYAKIT TERDETEKSI' }}
                </p>
                <h2
                  class="text-xl font-bold"
                  :class="isHealthy ? 'text-green-800' : 'text-white'"
                >
                  {{ topClassName }}
                </h2>
                <div class="mt-2 flex items-baseline gap-2">
                  <span
                    class="text-4xl font-extrabold"
                    :class="isHealthy ? 'text-green-700' : 'text-white'"
                  >
                    {{ topScore.toFixed(2) }}%
                  </span>
                  <span
                    class="text-sm"
                    :class="isHealthy ? 'text-green-600' : 'text-[#b0c8a0]'"
                  >
                    Confidence Score
                  </span>
                </div>
                <div class="mt-4 flex items-center gap-2 text-xs" :class="isHealthy ? 'text-green-600' : 'text-[#8faa7c]'">
                  <i class="pi pi-info-circle"></i>
                  <span>Berdasarkan analisis pola dan gejala daun oleh AI</span>
                </div>
              </div>
            </template>
          </Card>

          <!-- All Label Scores -->
          <Card
            class="overflow-hidden rounded-2xl border border-[#e3ead9] bg-white shadow-[0_12px_28px_rgba(63,83,48,0.08)]"
            :pt="{ body: { class: 'p-0' } }"
          >
            <template #content>
              <div class="p-5">
                <div class="mb-4 flex items-center gap-2 text-[#4f6d2f]">
                  <i class="pi pi-chart-bar"></i>
                  <span class="text-sm font-semibold">Confidence Score</span>
                </div>
                <div class="space-y-4">
                  <div
                    v-for="(name, idx) in result.class_names"
                    :key="idx"
                    class="space-y-1.5"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span v-if="idx === topIndex" class="text-sm">🏆</span>
                        <span class="text-sm font-medium text-[#3c5726]">{{ name }}</span>
                        <span
                          v-if="idx === topIndex"
                          class="rounded-full bg-[#e8f5e0] px-2 py-0.5 text-[10px] font-semibold text-[#3f6d1e]"
                        >
                          Terdeteksi
                        </span>
                      </div>
                      <span class="text-sm font-semibold text-[#4f6d2f]">{{ result.scores[idx]?.toFixed(2) }}%</span>
                    </div>
                    <div class="h-2 w-full overflow-hidden rounded-full bg-[#f1f5eb]">
                      <div
                        class="h-full rounded-full transition-all duration-500"
                        :class="getLabelColor(name)"
                        :style="{ width: `${result.scores[idx]?.toFixed(2)}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Healthy success state -->
          <template v-if="isHealthy">
            <Card
              class="overflow-hidden rounded-2xl border border-green-200 bg-linear-to-br from-green-50 to-emerald-50 shadow-[0_12px_28px_rgba(63,83,48,0.08)]"
              :pt="{ body: { class: 'p-0' } }"
            >
              <template #content>
                <div class="p-8 text-center">
                  <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <i class="pi pi-check-circle text-4xl text-green-600"></i>
                  </div>
                  <h2 class="text-2xl font-bold text-green-800">Daun Jagung Sehat! 🌽</h2>
                  <p class="mt-3 text-base leading-relaxed text-green-700">
                    Berdasarkan hasil analisis AI, daun jagung yang Anda unggah terdeteksi dalam kondisi
                    <strong>sehat</strong> dan tidak menunjukkan gejala penyakit apapun.
                  </p>
                  <div class="mt-6 rounded-xl bg-green-100/80 p-5 text-left">
                    <div class="mb-3 flex items-center gap-2 text-green-800">
                      <i class="pi pi-lightbulb"></i>
                      <span class="text-sm font-semibold">Tips Menjaga Kesehatan Tanaman</span>
                    </div>
                    <ul class="space-y-2 text-sm text-green-700">
                      <li class="flex items-start gap-2">
                        <i class="pi pi-check mt-0.5 text-xs text-green-600"></i>
                        <span>Lakukan pemantauan rutin terhadap kondisi daun secara berkala</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <i class="pi pi-check mt-0.5 text-xs text-green-600"></i>
                        <span>Pastikan nutrisi tanaman tercukupi dengan pemupukan yang tepat</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <i class="pi pi-check mt-0.5 text-xs text-green-600"></i>
                        <span>Jaga kebersihan lahan dari gulma dan sisa tanaman</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <i class="pi pi-check mt-0.5 text-xs text-green-600"></i>
                        <span>Atur jarak tanam untuk sirkulasi udara yang baik</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
            </Card>
          </template>

          <!-- Disease detected state -->
          <template v-else-if="detectedDisease">
            <!-- Disease Info -->
            <Card
              class="overflow-hidden rounded-2xl border border-[#e3ead9] bg-white shadow-[0_12px_28px_rgba(63,83,48,0.08)]"
              :pt="{ body: { class: 'p-0' } }"
            >
              <template #content>
                <div class="p-6">
                  <h2 class="mb-3 text-xl font-bold text-[#2f4a1f]">Informasi Penyakit</h2>
                  <p class="text-sm leading-7 text-[#556150]">
                    {{ detectedDisease.characteristic }}
                  </p>
                </div>
              </template>
            </Card>

            <!-- Gejala yang Terlihat (Characteristics) -->
            <Card
              class="overflow-hidden rounded-2xl border border-[#e3ead9] bg-white shadow-[0_12px_28px_rgba(63,83,48,0.08)]"
              :pt="{ body: { class: 'p-0' } }"
            >
              <template #content>
                <div class="p-6">
                  <div class="mb-4 flex items-center gap-2 text-[#b45309]">
                    <i class="pi pi-exclamation-triangle"></i>
                    <h3 class="text-base font-semibold">Gejala yang Terlihat</h3>
                  </div>
                  <ul class="space-y-3">
                    <li
                      v-for="(line, idx) in detectedDisease.characteristic.split('. ').filter((s) => s.trim())"
                      :key="idx"
                      class="flex items-start gap-3"
                    >
                      <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100">
                        <i class="pi pi-circle-fill text-[6px] text-orange-400"></i>
                      </span>
                      <span class="text-sm leading-relaxed text-[#556150]">{{ line.replace(/\.$/, '') }}</span>
                    </li>
                  </ul>
                </div>
              </template>
            </Card>

            <!-- Solusi & Penanganan -->
            <Card
              class="overflow-hidden rounded-2xl border border-[#e3ead9] bg-white shadow-[0_12px_28px_rgba(63,83,48,0.08)]"
              :pt="{ body: { class: 'p-0' } }"
            >
              <template #content>
                <div class="p-6">
                  <div class="mb-4 flex items-center gap-2 text-[#4f6d2f]">
                    <i class="pi pi-shield"></i>
                    <h3 class="text-base font-semibold">Solusi &amp; Penanganan</h3>
                  </div>
                  <div class="space-y-5">
                    <div
                      v-for="(step, idx) in solutionSteps"
                      :key="idx"
                      class="flex items-start gap-4"
                    >
                      <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3f6d1e] text-sm font-bold text-white">
                        {{ idx + 1 }}
                      </span>
                      <div>
                        <p class="text-sm leading-relaxed text-[#556150]">{{ step }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Warning banner -->
                  <div class="mt-6 flex items-start gap-3 rounded-xl bg-orange-50 border border-orange-200 p-4">
                    <i class="pi pi-megaphone mt-0.5 text-orange-500"></i>
                    <p class="text-sm leading-relaxed text-orange-800">
                      Segera lakukan penanganan untuk mencegah penyebaran ke tanaman lain.
                      Konsultasikan dengan penyuluh pertanian setempat jika infeksi sudah meluas.
                    </p>
                  </div>
                </div>
              </template>
            </Card>
          </template>
        </div>
      </div>

      <!-- Back button bottom -->
      <div class="mt-10 text-center">
        <Button
          label="Kembali ke Halaman Deteksi"
          icon="pi pi-arrow-left"
          severity="secondary"
          outlined
          class="rounded-xl border-[#2f4a1f] text-[#2f4a1f]"
          @click="emit('back')"
        />
      </div>
    </section>
  </main>
</template>
