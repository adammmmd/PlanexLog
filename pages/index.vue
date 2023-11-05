<template>
    <div class="home-container">
        <h1>hello</h1>
        <Modal />
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
    components: {
        Modal
    },
}


</script>

<style>
.home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: var(--ff-primary);
    background-color: white;
    color: black;
    height: 100vh;
}
</style>