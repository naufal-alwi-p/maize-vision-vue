<script setup lang="ts">
import DiseaseCard from '@/components/DiseaseCard.vue'
import Footer from '@/components/Footer.vue'
import CommonRustImage from '@/assets/common-rust.jpg'
import GLSImage from '@/assets/gray-leaf-spot.jpg'
import NCBImage from '@/assets/northern-leaf-blight.jpg'
import PestDamageImage from '@/assets/pest-damage.jpg'

interface Disease {
  id: string
  name: string
  image: string
  characteristic: string
  solution: string
  category: string
}

const diseases: Disease[] = [
  {
    id: 'common-rust',
    name: 'Common Rust',
    image: CommonRustImage,
    characteristic:
      'Fungal disease with small, circular to elongate brown pustules on both leaf surfaces. Pustules appear in scattered patterns and may coalesce as the disease progresses.',
    solution:
      'Plant resistant varieties, ensure good crop sanitation, use fungicide sprays during early stages of infection, and maintain adequate plant spacing.',
    category: 'Fungal',
  },
  {
    id: 'gray-leaf-spot',
    name: 'Gray Leaf Spot',
    image: GLSImage,
    characteristic:
      'Rectangular gray or tan lesions with distinct parallel edges between leaf veins. Lesions may have a dark brown border and often appear in linear patterns on the leaf.',
    solution:
      'Use disease-resistant hybrids, practice crop rotation to reduce pathogen survival, remove crop residue, ensure proper spacing, and apply fungicides when conditions are favorable.',
    category: 'Fungal',
  },
  {
    id: 'northern-corn-leaf-blight',
    name: 'Northern Corn Leaf Blight',
    image: NCBImage,
    characteristic:
      'Fungal disease causing long, elliptical gray-green lesions on corn leaves. Lesions appear with a tan or brown center and may have a yellow halo. Typically starts on lower leaves and progresses upward.',
    solution:
      'Use resistant corn hybrids, practice crop rotation, remove infected crop debris, apply fungicide if needed, and ensure proper spacing for air circulation.',
    category: 'Fungal',
  },
  {
    id: 'pest-damage',
    name: 'Pest Damage',
    image: PestDamageImage,
    characteristic:
      'Physical damage to corn leaves caused by insect feeding, including irregular holes, leaf edges being consumed, or skeletonized patterns. Common pests include armyworms, corn borers, and grasshoppers.',
    solution:
      'Monitor fields regularly for pest presence, use integrated pest management strategies, apply appropriate insecticides if thresholds are exceeded, and plant resistant varieties when available.',
    category: 'Pest',
  },
]
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