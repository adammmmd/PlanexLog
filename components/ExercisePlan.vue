<template>
    <div class="card d-flex align-items-center justify-content-center border-2 rounded-0 border-black bg-white me-3" style="width: 10rem; height: 7rem;">
        <nuxt-link class="card-title text-center text-decoration-none" :to="`/plan/exercise/${planName}`" >{{planName}}</nuxt-link>
    </div>
</template>
<script>
export default {
    props: {
        planName: String // Menerima prop "planName" untuk menampilkan nama rencana latihan
    }
};
</script>