<script setup lang="ts">
import Divider from 'primevue/divider';
import MaizeVisionIcon from '@/assets/maize-vision-logo.svg';

const { color = 'white' } = defineProps<{
    color?: 'white' | 'green',
}>();
</script>

<template>
    <footer :class="`py-10 ${color === 'white' ? 'bg-[#f8faf7]' : 'bg-[#2d5016] text-white'}`">
        <div class="mx-auto w-[min(1160px,calc(100%-1rem))]">
            <div>
                <div class="flex justify-center lg:justify-start gap-x-2">
                    <img class="w-4" :src="MaizeVisionIcon" alt="Maize Vision Icon">
                    <p class="font-bold text-lg">Maize Vision</p>
                </div>
                <p class="text-center lg:text-left">AI-powered corn disease detection system for farmers and researchers</p>
            </div>
    
            <Divider  />
    
            <small class="text-center block">@ {{ new Date().getFullYear() }} Maize Vision. All rights reserved. Empowering farmers with AI technology.</small>
        </div>
    </footer>
</template>
