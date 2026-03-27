<script setup lang="ts">
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import { type MenuItem } from 'primevue/menuitem';
import { ref } from "vue";
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
</script>

<template>
    <nav class="sticky top-0 z-10 shadow">
        <Menubar
            :model="items"
            :breakpoint="'768px'"
            :pt="{
                root: {
                    class: 'border-none rounded-none justify-between',
                },
                end: {
                    class: 'md:ms-0',
                },
            }"
        >
            <template #start>
                <div class="flex items-center gap-x-2">
                    <img class="w-7" :src="MaizeVisionIcon" alt="Maize Vision Logo">
                    <p class="font-bold text-xl hidden md:block">Maize Vision</p>
                </div>
            </template>
            <template #end>
                <div class="flex items-center gap-x-2">
                    <!-- <Button icon="pi pi-moon" severity="contrast" size="small" variant="text" /> -->
                    <Button label="Start Detection" rounded />
                </div>
            </template>
        </Menubar>
    </nav>
</template>
