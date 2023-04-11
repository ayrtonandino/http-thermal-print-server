<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import navBar from '/@/components/navBar.vue'
    import defaultConfig from '/@/components/defaultConfig.vue'
    import TestConnection from '/@/components/testConnection.vue'

    // eslint-disable-next-line no-undef
    const defaultData = ref<App.Config>({
        printerUrl: '',
        printerPort: '',
        printerModel: '',
    })

    const printerUrl = ref('')

    const printerPort = ref('')

    const printerModel = ref('')

    onMounted(() => {
        getData()
    })

    function submit() {
        window.api.setCoreData({
            printerUrl: printerUrl.value,
            printerPort: printerPort.value,
            printerModel: printerModel.value,
        })

        getData()
    }

    function getData() {
        const data = window.api.getCoreData()

        defaultData.value = data

        printerUrl.value = data.printerUrl
        printerPort.value = data.printerPort
        printerModel.value = data.printerModel
    }
</script>

<template>
    <nav-bar />

    <div class="mx-4 my-3">
        <div class="-mx-4 flex flex-wrap">
            <div class="w-1/2 space-y-3 px-4">
                <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6">
                                <label for="printer-url" class="block text-sm font-medium text-gray-700">Printer URL</label>

                                <input
                                    id="printer-url"
                                    v-model="printerUrl"
                                    type="text"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6">
                                <label for="printer-port" class="block text-sm font-medium text-gray-700">Printer Port</label>

                                <input
                                    id="printer-port"
                                    v-model="printerPort"
                                    type="number"
                                    min="0"
                                    max="65535"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6">
                                <label for="printer-model" class="block text-sm font-medium text-gray-700">Printer Model</label>

                                <select
                                    id="printer-model"
                                    v-model="printerModel"
                                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="EPSON">EPSON</option>

                                    <option value="STAR">STAR</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between border-t bg-gray-100 px-4 py-3 sm:px-6">
                        <button
                            type="button"
                            class="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            @click="getData"
                        >
                            Reload
                        </button>

                        <button
                            type="button"
                            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            @click="submit"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <div class="w-1/2 space-y-3 px-4">
                <default-config :printer-url="defaultData?.printerUrl" :printer-port="defaultData?.printerPort" :printer-model="defaultData?.printerModel" />

                <test-connection />
            </div>
        </div>
    </div>
</template>
