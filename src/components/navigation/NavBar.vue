<script setup lang="ts">
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import { type MenuItem } from 'primevue/menuitem';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import MaizeVisionIcon from '@/assets/maize-vision-logo.svg';
import { RouterLink } from 'vue-router';

const items = ref<MenuItem[]>([
    {
        label: 'Home',
        icon: 'pi pi-home',
        route: '/',
    },
    {
        label: 'Detection',
        icon: 'pi pi-camera',
        route: '/detection',
    },
    {
        label: 'Diseases',
        icon: 'pi pi-folder',
        route: '/diseases'
    },
    {
        label: 'About',
        icon: 'pi pi-info-circle',
        route: '/about',
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
    <nav class="sticky top-0 z-50 shadow">
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
            <template #item="{ item, props, hasSubmenu }">
                <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate" :class="`${$route.name === item.label?.toString().toLowerCase() ? 'lg:border-b-2 lg:border-[#2d5016] transition-[border] transition-discrete text-[#2d5016] font-bold' : ''}`">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                    </a>
                </RouterLink>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
            </template>
            <template #end>
                <div class="flex items-center gap-x-2">
                    <!-- <Button icon="pi pi-moon" severity="contrast" size="small" variant="text" /> -->
                    <Button @click="$router.push('/detection')" :class="$route.path === '/detection' ? 'opacity-0 bg-[#35591d] hover:bg-[#2e4f19]' : 'bg-[#35591d] hover:bg-[#2e4f19]'" :disabled="$route.path === '/detection'" label="Start Detection" rounded v-bind="isMobile ? { size: 'small' } : {}" />
                </div>
            </template>
        </Menubar>
    </nav>
</template>
