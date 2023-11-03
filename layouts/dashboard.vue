<template>
    <div>
        <HeaderDashboard />
        <Nuxt />
        <Dashboard />
    </div>
</template>

<script>
// memanggil component sesuai lokasi masing masing file
import Dashboard from "@/components/Dashboard.vue"
import HeaderDashboard from "../components/HeaderDashboard.vue";

export default {
    // Dideklarasikan agar dapat diakses oleh template
    components: {
        Dashboard, HeaderDashboard
    }
}
</script>
