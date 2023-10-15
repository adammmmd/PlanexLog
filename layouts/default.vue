<template>
    <div>
        <HomeHeader />

        <Nuxt />

    </div>
</template>

<script>
// memanggil component sesuai lokasi masing masing file
import HomeHeader from "@/components/HomeHeader.vue"

export default {
    // Dideklarasikan agar dapat diakses oleh template
    components: {
        HomeHeader
    }
}
</script>

<style>

</style>