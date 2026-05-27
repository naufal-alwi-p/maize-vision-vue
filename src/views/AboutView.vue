<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import Footer from '@/components/Footer.vue'
import { RouterLink } from 'vue-router'

import MaizeVisionIcon from '../assets/maize-vision-logo.svg'

const pillars = [
  {
    icon: 'pi pi-bullseye',
    title: 'Deteksi Penyakit',
    description: 'Identifikasi penyakit umum pada daun jagung dari foto yang diunggah dengan workflow AI yang cepat.',
  },
  {
    icon: 'pi pi-folder',
    title: 'Katalog Penyakit',
    description: 'Jelajahi katalog kondisi tanaman, gejala penyakit, dan penanganan yang praktis.',
  },
  {
    icon: 'pi pi-microchip',
    title: 'Teknologi AI',
    description: 'Gunakan model yang dirancang untuk menganalisis pola daun dan menghasilkan hasil yang jelas serta mudah ditindaklanjuti.',
  },
]

const benefits = [
  'Built for farmers and crop advisors who need quick decisions in the field.',
  'Designed to make disease recognition simpler, faster, and more accessible.',
  'Helps turn image-based diagnosis into treatment and prevention guidance.',
]
</script>

<template>
  <main class="bg-[#f7f8f3] text-[#355223]">
    <section class="border-b border-[#e7eddc] bg-[#f4f7ef]">
      <div class="mx-auto flex w-[min(1160px,calc(100%-1rem))] flex-col items-center px-0 py-16 text-center lg:py-20">
        <span class="inline-flex items-center rounded-full bg-[#e5f0d7] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#6b8b4f]">
          Tentang Maize Vision
        </span>

        <h1 class="mt-6 max-w-4xl text-[clamp(2.4rem,4vw,4.25rem)] font-bold leading-tight tracking-[-0.05em] text-[#42612a]">
          Memanfaatkan Teknologi
          <span class="italic text-[#7cab59]">Artificial Intelligence</span>
          untuk Kesehatan Tanaman yang Lebih Baik
        </h1>

        <p class="mt-5 max-w-3xl text-base leading-8 text-[#6e7c68] md:text-lg">
          Maize Vision memanfaatkan teknologi computer vision untuk membantu petani mendeteksi penyakit daun jagung lebih awal, bertindak lebih cepat, dan melindungi hasil panen dengan lebih percaya diri.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            label="Mulai Deteksi"
            icon="pi pi-arrow-right"
            iconPos="right"
            class="rounded-full border-0 bg-[#35591d] px-6 py-3 font-semibold text-white shadow-[0_16px_28px_rgba(53,89,29,0.26)] transition hover:bg-[#2e4f19]"
            as="RouterLink"
            to="/detection"
          />
          <Button
            label="Lihat Penyakit"
            severity="secondary"
            outlined
            class="rounded-full border border-[#cdd8c1] px-6 py-3 font-semibold text-[#355223] transition hover:bg-white"
            as="RouterLink"
            to="/diseases"
          />
        </div>
      </div>
    </section>

    <section class="mx-auto w-[min(1160px,calc(100%-1rem))] px-0 py-16 lg:py-20">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 class="text-3xl font-bold tracking-[-0.04em] text-[#355223] md:text-[2.4rem]">
            Teknologi di Balik Maize Vision
          </h2>

          <div class="mt-6 space-y-4 text-[0.98rem] leading-8 text-[#66715f] md:text-[1.02rem] text-justify">
              Maize Vision menggunakan teknik computer vision menggunakan salah satu dari model deep learning (ConvNeXt atau MaxViT) untuk menganalisis citra daun jagung dan menyoroti pola yang dapat mengindikasikan penyakit.

              Sistem dilatih untuk mengenali gejala umum, kemudian menghasilkan hasil yang mudah dipahami oleh pengguna.

              Hal ini memungkinkan proses pemeriksaan yang lebih cepat, rekomendasi yang lebih jelas, serta workflow yang praktis untuk penggunaan sehari-hari di kebun jagung.
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <Card
              v-for="pillar in pillars"
              :key="pillar.title"
              class="rounded-2xl border border-[#e2ead6] bg-white/95 shadow-[0_16px_32px_rgba(63,83,48,0.08)]"
              :pt="{ body: { class: 'p-0' } }"
            >
              <template #content>
                <div class="p-5">
                  <span class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#edf5e4] text-[#5a7a37]">
                    <i :class="pillar.icon"></i>
                  </span>
                  <h3 class="mb-2 text-base font-semibold text-[#355223]">{{ pillar.title }}</h3>
                  <p class="text-sm leading-7 text-[#6d7965]">{{ pillar.description }}</p>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <div class="flex justify-center lg:justify-end">
          <div class="rounded-4xl border border-[#e6eddc] bg-white p-8 shadow-[0_20px_45px_rgba(63,83,48,0.1)]">
            <div class="flex h-96 w-full max-w-[18rem] items-center justify-center rounded-3xl bg-[radial-gradient(circle_at_top,rgba(232,242,221,0.92),rgba(255,255,255,1)_60%)] p-6">
              <img
                :src="MaizeVisionIcon"
                alt="Maize Vision logo illustration"
                class="max-h-full w-full object-contain drop-shadow-[0_10px_22px_rgba(76,102,55,0.18)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#315819] text-white">
      <div class="mx-auto w-[min(1160px,calc(100%-1rem))] px-0 py-16 text-center lg:py-20">
        <h2 class="text-[clamp(2rem,3vw,2.7rem)] font-semibold tracking-[-0.04em]">
          Siap Mencoba Maize Vision?
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-white/80">
          Mulai deteksi penyakit daun jagung dengan workflow berbasis AI yang dirancang untuk pengambilan keputusan lebih cepat dan hasil panen yang lebih sehat.
        </p>

        <Button
          label="Mulai Deteksi"
          icon="pi pi-arrow-right"
          iconPos="right"
          class="mt-7 rounded-full border-0 bg-white px-6 py-3 font-semibold text-[#355223] shadow-[0_16px_28px_rgba(0,0,0,0.16)] transition hover:bg-[#f3f7ee]"
          as="RouterLink"
          to="/detection"
        />

        <div class="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/75">
          <RouterLink class="border-b border-white/20 pb-0.5 no-underline" to="/diseases">Lihat Katalog Penyakit</RouterLink>
          <RouterLink class="border-b border-white/20 pb-0.5 no-underline" to="/about">Hubungi Kami</RouterLink>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</template>
