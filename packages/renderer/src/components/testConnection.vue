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
    <div class="shadow overflow-hidden sm:rounded-md">
        <div class="flex items-center justify-center px-4 py-3 bg-gray-50 sm:px-6">
            <button
                type="button"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="testConnection"
            >
                Test Connection
            </button>
        </div>
    </div>
</template>
