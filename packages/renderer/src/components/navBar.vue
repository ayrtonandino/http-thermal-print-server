<script setup lang="ts">
    import favicon from '/@/assets/favicon.ico'

    function closeWindow() {
        window.api.closeWindow()
    }

    const appVersion = import.meta.env.VITE_APP_VERSION || 'DEVELOPMENT'
</script>

<template>
    <nav class="bg-gray-800">
        <header class="mx-auto px-4">
            <div class="flex h-10 items-center justify-between">
                <div class="flex items-center">
                    <img :src="favicon" class="mr-3 h-6 w-6" name="ANDROMEDA" alt="ANDROMEDA" />

                    <h6 class="font-semibold text-white">HTTP Thermal Print Server - {{ appVersion }}</h6>
                </div>

                <button type="button" class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="closeWindow">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </header>
    </nav>
</template>
