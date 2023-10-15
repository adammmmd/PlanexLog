<template>
    <div>
        <Dashboard />

        <Nuxt />

    </div>
</template>

<script>
// memanggil component sesuai lokasi masing masing file
import Dashboard from "@/components/Dashboard.vue"

export default {
    // Dideklarasikan agar dapat diakses oleh template
    components: {
        Dashboard
    }
}
</script>

<style>

</style>