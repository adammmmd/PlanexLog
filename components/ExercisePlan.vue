<template>
    <div>
        <nuxt-link class="exercise-plan_link" :to="`/plan/exercise/${planName}`" >{{planName}}</nuxt-link>
    </div>
</template>
<script>
export default {
    props: {
        planName: String // Menerima prop "planName" untuk menampilkan nama rencana latihan
    }
};
</script>