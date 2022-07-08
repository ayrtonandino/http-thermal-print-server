<script setup lang="ts">
    defineProps({
        printerUrl: {
            type: String,
            default: null,
        },
        printerPort: {
            type: [Number, String],
            default: null,
        },
        printerModel: {
            type: String,
            default: null,
        },
    })
</script>

<template>
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Application Information</h3>
        </div>

        <div class="border-t border-gray-200">
            <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium">Printer URL</dt>

                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ printerUrl }}</dd>
                </div>

                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium">Printer Port</dt>

                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ printerPort }}</dd>
                </div>

                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium">Printer Model</dt>

                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ printerModel }}</dd>
                </div>
            </dl>
        </div>
    </div>
</template>
