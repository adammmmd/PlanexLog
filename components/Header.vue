<template>
    <header class="header_container">
        <div class="header_back-btn" @click="goToPrev">&#8249;</div>
        <h2 class="header_title">{{ title }}</h2>
    </header>
</template>
<script>

export default {
    props: {
        title: String
    },
    methods: {
        goToPrev() {
            this.$router.go(-1);
        },
    }
}

</script>
<style>
.header_container {
    border: 3px solid black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    color: black;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.header_back-btn {
    font-size: 30px;
    background-color: white;
    border: 3px solid black;
    width: 50px;
    aspect-ratio: 1;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.header_title {
    color: black;
    font-family: var(--ff-heading);
    font-size: 30px;
    margin-left: 30px;
}
</style>