<template>
    <nuxt-link class="plan__card shadow-main border-main fs-700" :to="`/plan/exercise/${planName}`" >{{planName}}</nuxt-link>
</template>
<script>
export default {
    props: {
        planName: String // Menerima prop "planName" untuk menampilkan nama rencana latihan
    }
};
</script>