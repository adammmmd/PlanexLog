<template>
    <div class="exercise-list_container">
        <div v-for="exercise in plan" class="exercise-list">
            <img class="exercise-img" :src="exercise.gifUrl" :alt="exercise.name">
            <div class="exercise-desc">
                <h2>{{exercise.name}}</h2>
                <p>{{exercise.target}}</p>
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