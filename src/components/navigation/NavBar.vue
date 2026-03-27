<script setup lang="ts">
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import { type MenuItem } from 'primevue/menuitem';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import MaizeVisionIcon from '@/assets/maize-vision-logo.svg';

const items = ref<MenuItem[]>([
    {
        label: 'Home',
        icon: 'pi pi-home',
    },
    {
        label: 'Detection',
        icon: 'pi pi-camera',
    },
    {
        label: 'Diseases',
        icon: 'pi pi-folder',
    },
    {
        label: 'About',
        icon: 'pi pi-info-circle',
    },
]);

const isMobile = ref(false);
let mediaQuery: MediaQueryList | null = null;

const updateIsMobile = () => {
    if (!mediaQuery) return;
    isMobile.value = mediaQuery.matches;
};

onMounted(() => {
    mediaQuery = window.matchMedia('(max-width: 1024px)');
    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);
});

onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', updateIsMobile);
});
</script>

<template>
    <nav class="sticky top-0 z-10 shadow">
        <Menubar
            :model="items"
            :breakpoint="'1024px'"
            :pt="{
                root: {
                    class: 'border-none rounded-none justify-between',
                },
                end: {
                    class: 'lg:ms-0',
                },
            }"
        >
            <template #start>
                <div class="flex items-center gap-x-2">
                    <img class="w-7" :src="MaizeVisionIcon" alt="Maize Vision Logo">
                    <p class="font-bold text-xl hidden lg:block">Maize Vision</p>
                </div>
            </template>
            <template #end>
                <div class="flex items-center gap-x-2">
                    <!-- <Button icon="pi pi-moon" severity="contrast" size="small" variant="text" /> -->
                    <Button label="Start Detection" rounded v-bind="isMobile ? { size: 'small' } : {}" />
                </div>
            </template>
        </Menubar>
    </nav>
</template>
