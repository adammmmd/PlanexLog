<template>
    <div class="plan-form__list-container border-main">
        <div v-for="(exercise, i) in plan" class="plan-form__list" :key="i">
            <div class="plan-form__label">
                <img class="img-thumbnail border-black border-1 rounded-0 ms-2" style="object-fit: cover; width: 50px; height: 50px;" :src="exercise.gifUrl" :alt="exercise.name">
                <div class="d-flex flex-column justify-content-start align-items-between ms-2" style="justify-items: stretch;">
                    <h2 class="fs-6 fw-medium m-0">{{exercise.name}}</h2>
                    <p class="fs-6 m-0">{{exercise.target}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        plan: Array
    }
}

</script>
<style>
.exercise-list_container {
    border: 3px solid black;
    color: black;
    align-self: stretch;
    margin: 10px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}

.exercise-list_container::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.exercise-list {
    border-bottom: 1px solid black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 20px;
}

.exercise-desc {
    margin-left: 10px;
}
</style>