<template>
    <form class="add-plans" v-on:submit.prevent="handleSubmit">
        <div class="plan-header">
            <img class="plan-img-logo" src="~/assets/istockphoto-1248698782-612x612.jpg" alt="exercise">
            <input v-model="form.plan_name" class="plan-name" type="text" placeholder="Exercise Name" required>
        </div>
        <div class="input-container">
            <input class="search-bar-exercise" type="search" name="search" id="search" v-model="searchText">
            <select class="sort-exercise" name="target" id="target" v-model="selectedTarget">
                <option value="">select target</option>
                <option v-for="target in allTarget" :value="target">{{ target }}</option>
            </select>
        </div>
        <div class="list-container">
            <label v-for="exercise in filteredExercises" class="exercise-label" :for="exercise.name" :key="exercise.id">
                <input class="exercise-check" type="checkbox" :name="exercise.name" :value="exercise.name" :id="exercise.name" v-model="form.exercises">
                <img class="exercise-img" :src="exercise.gifUrl" :alt="exercise.name">
                <div class="title-desc-container">
                    <h3 class="title-exercise">{{ exercise.name }}</h3>
                    <p class="desc-exercise">{{ exercise.target }}</p>
                </div>
            </label>
            <div class="add-30" @click="addExercise" v-if="hasMoreExercises">Load More</div>
        </div>
        <button type="submit" class="save-btn" :disabled="!form.plan_name || !isAtLeastOneCheckboxSelected">Save</button>
    </form>
</template>
<script>
</script>