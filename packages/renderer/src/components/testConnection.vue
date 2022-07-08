<script setup lang="ts">
    import axios from 'axios'
    import Swal from 'sweetalert2'

    function testConnection() {
        axios
            .get('http://localhost:3005/print')
            .then((response) => {
                Swal.fire({
                    title: 'Success',
                    text: response.data.status || 'Connection successful',
                    icon: 'success',
                })
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: error?.response?.data?.error || 'Connection failed',
                    icon: 'error',
                })
            })
    }
</script>

<template>
    <div class="overflow-hidden shadow sm:rounded-md">
        <div class="flex items-center justify-center bg-gray-50 px-4 py-3 sm:px-6">
            <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="testConnection"
            >
                Test Connection
            </button>
        </div>
    </div>
</template>
