<script setup lang="ts">
import Button from "primevue/button"
import Card from 'primevue/card'
import Footer from '@/components/Footer.vue'
import { RouterLink, useRouter } from 'vue-router'

import heroBackground from '@/assets/hero-section-bg.jpg'

type Feature = {
  icon: string
  title: string
  description: string
}

type Step = {
  number: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: 'pi pi-upload',
    title: 'Easy Upload',
    description: 'Capture a corn leaf photo or drag and drop a clear image to begin.',
  },
  {
    icon: 'pi pi-sparkles',
    title: 'AI Analysis',
    description: 'Advanced computer vision inspects the leaf for disease patterns in seconds.',
  },
  {
    icon: 'pi pi-chart-bar',
    title: 'Accurate Results',
    description: 'Get confidence scores, likely disease matches, and practical treatment guidance.',
  },
  {
    icon: 'pi pi-book',
    title: 'Learn & Prevent',
    description: 'Review prevention tips and follow-up steps to protect future harvests.',
  },
]

const steps: Step[] = [
  {
    number: '1',
    title: 'Upload Image',
    description: 'Take a photo of the affected corn leaf or use an existing image from your device.',
  },
  {
    number: '2',
    title: 'AI Analysis',
    description: 'The model processes the image and identifies disease patterns in seconds.',
  },
  {
    number: '3',
    title: 'Get Results',
    description: 'Receive disease information with treatment recommendations and prevention tips.',
  },
]

const router = useRouter()

const goToDetection = () => {
  router.push('/detection')
}

const goToDiseases = () => {
  router.push('/diseases')
}
</script>

<template>
  <main class="bg-[#faf8f1] text-[#27411a]">
    <section
      class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-cover bg-center"
      :style="{ backgroundImage: `url(${heroBackground})` }"
    >
      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,42,12,0.58)_0%,rgba(18,42,12,0.35)_42%,rgba(18,42,12,0.18)_100%),linear-gradient(180deg,rgba(250,248,241,0.04)_0%,rgba(250,248,241,0.18)_100%)]"></div>

      <div class="relative z-10 mx-auto grid w-[min(1160px,calc(100%-1rem))] grid-cols-1 items-center gap-8 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="max-w-136 text-[#f5f9ef]">
          <span class="inline-flex items-center justify-center rounded-full bg-[rgba(240,246,230,0.9)] px-3 py-2 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#5d7a43]">AI-powered agriculture</span>
          <h1 class="mt-4 max-w-[12ch] text-[clamp(2.7rem,5vw,5rem)] leading-[0.95] tracking-[-0.05em]">Protect Your Corn Harvest with AI</h1>
          <p class="mt-4 max-w-136 text-[1.05rem] leading-7 text-white/88">
            Upload a corn leaf photo and get instant disease detection with actionable treatment guidance.
          </p>

          <div class="mt-8 flex flex-wrap gap-3 max-sm:flex-col">
            <Button
              label="Start Detection"
              icon="pi pi-arrow-right"
              iconPos="right"
              class="rounded-full border-0 bg-[#35591d] px-6 py-3 font-semibold text-white shadow-[0_18px_30px_rgba(53,89,29,0.28)] transition hover:bg-[#2e4f19]"
              @click="goToDetection"
            />
            <Button
              label="View Diseases"
              severity="secondary"
              outlined
              class="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              @click="goToDiseases"
            />
          </div>
        </div>

        <Card class="overflow-hidden rounded-3xl border border-white/45 bg-white/95 shadow-[0_30px_60px_rgba(18,42,12,0.22)] backdrop-blur-md" :pt="{ body: { class: 'p-0' } }">
          <template #content>
            <div class="p-8">
              <span class="inline-flex items-center justify-center rounded-full bg-[#eff6e9] px-3 py-2 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#5d7a43]">Instant crop insights</span>
              <h2 class="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#304b22]">Instant Disease Detection</h2>
              <p class="mt-4 leading-7 text-[#66705e]">
                Upload a corn leaf photo and receive AI-powered identification with treatment recommendations.
              </p>
              <div class="mt-6">
                <Button
                  label="Start Detection"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="rounded-full border-0 bg-[#35591d] px-5 py-3 font-semibold text-white shadow-[0_16px_28px_rgba(53,89,29,0.26)] transition hover:bg-[#2e4f19]"
                  @click="goToDetection"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <section class="mx-auto w-[min(1160px,calc(100%-1rem))] px-0 py-18">
      <div class="text-center">
        <h2 class="text-[clamp(2rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-[#355223]">Why use Maize Vision</h2>
        <p class="mx-auto mt-3 max-w-160 text-[#77836e]">Fast, practical tooling for spotting disease earlier and acting with confidence.</p>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card
          v-for="feature in features"
          :key="feature.title"
          class="overflow-hidden rounded-[1.2rem] border border-[#4d673a]/10 bg-white/95 shadow-[0_20px_40px_rgba(63,83,48,0.08)]"
          :pt="{ body: { class: 'p-0' } }"
        >
          <template #content>
            <div class="p-6">
              <span class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#eff7e7_0%,#dfead0_100%)] text-[#4f6d2f]">
                <i :class="feature.icon"></i>
              </span>
              <h3 class="mb-2 text-[1.05rem] font-semibold text-[#335023]">{{ feature.title }}</h3>
              <p class="leading-7 text-[#6d7965]">{{ feature.description }}</p>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <section class="mx-auto w-[min(1160px,calc(100%-1rem))] px-0 py-12">
      <div class="text-center">
        <h2 class="text-[clamp(2rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-[#355223]">How It Works</h2>
        <p class="mx-auto mt-3 max-w-160 text-[#77836e]">Three simple steps to protect your corn crop.</p>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          v-for="step in steps"
          :key="step.number"
          class="relative overflow-visible rounded-[1.2rem] border border-[#4d673a]/10 bg-white/95 shadow-[0_20px_40px_rgba(63,83,48,0.08)]"
          :pt="{ body: { class: 'p-0' } }"
        >
          <template #content>
            <div class="relative p-6 pt-8">
              <span class="absolute -top-4 left-5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#456f26] text-sm font-bold text-[#f7f8f4] shadow-[0_10px_20px_rgba(69,111,38,0.28)]">{{ step.number }}</span>
              <span class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#eff7e7_0%,#dfead0_100%)] text-[#4f6d2f]">
                <i :class="['pi', step.number === '1' ? 'pi-images' : step.number === '2' ? 'pi-cog' : 'pi-file-check']"></i>
              </span>
              <h3 class="mb-2 text-[1.05rem] font-semibold text-[#335023]">{{ step.title }}</h3>
              <p class="leading-7 text-[#6d7965]">{{ step.description }}</p>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <section class="mx-auto w-[min(1160px,calc(100%-1rem))] px-0 pb-16 pt-4">
      <div class="rounded-[1.8rem] bg-[linear-gradient(135deg,#35591d_0%,#2e4f19_55%,#234013_100%)] px-6 py-14 text-center text-[#f4f8ef] shadow-[0_26px_50px_rgba(30,53,16,0.28)] md:px-8">
        <h2 class="text-[clamp(2rem,3vw,2.7rem)] font-semibold tracking-[-0.04em]">Ready to Protect Your Crops?</h2>
        <p class="mx-auto mt-3 max-w-xl text-white/84">Start using Maize Vision today and detect diseases before they spread.</p>
        <Button
          label="Start Detection Now"
          icon="pi pi-arrow-right"
          iconPos="right"
          severity="secondary"
          class="mt-6 rounded-full border-0 bg-white px-6 py-3 font-semibold text-[#2e4f19] shadow-[0_16px_28px_rgba(0,0,0,0.16)] transition hover:bg-[#f3f7ee]"
          @click="goToDetection"
        />
        <div class="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/85">
          <RouterLink class="border-b border-white/25 pb-0.5 no-underline" to="/diseases">View disease library</RouterLink>
          <RouterLink class="border-b border-white/25 pb-0.5 no-underline" to="/about">Learn more about Maize Vision</RouterLink>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</template>
