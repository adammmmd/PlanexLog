<template>
    <div>
        <Header title="Build Plan"/>
        <div class="my-5">
            <form class="card border-1 rounded-0 border-black d-flex flex-column justify-content-start align-items-stretch p-4 m-auto" style="height: 100vh;" v-on:submit.prevent="handleSubmit">
                <div class="d-flex flex-row justify-content-start align-items-end mb-3">
                    <img class="img-thumbnail border-black border-1 rounded-0" style="object-fit: cover; width: 50px; height: 50px;" src="~/assets/istockphoto-1248698782-612x612.jpg" alt="exercise">
                    <input v-model="form.plan_name" class="form-control form-control-sm border-black border-1 rounded-0 ms-3" type="text" placeholder="Exercise Name" required>
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center my-3">
                    <input class="form-control form-control-sm border-black border-1 rounded-0" type="search" name="search" id="search" v-model="searchText" placeholder="Search">
                    <select class="form-select form-select-sm border-black border-1 rounded-0 w-25 ms-1" name="target" id="target" v-model="selectedTarget">
                        <option value="">select target</option>
                        <option v-for="(target, i) in allTarget" :value="target" :key="i">{{ target }}</option>
                    </select>
                </div>
                <div class="card border-black border-1 rounded-0 mb-2 d-flex flex-column overflow-auto">
                    <div class="card d-flex flex-row align-items-center justify-content-start border-1 border-black rounded-0 p-2 m-0" v-for="exercise in filteredExercises" :key="exercise.id">
                        <label  class="d-flex flex-row align-items-center justify-content-start" :for="exercise.name">
                            <input type="checkbox" :name="exercise.name" :value="exercise.name" :id="exercise.name" v-model="form.exercises">
                            <img class="img-thumbnail border-black border-1 rounded-0 ms-2" style="object-fit: cover; width: 50px; height: 50px;" :src="exercise.gifUrl" :alt="exercise.name">
                            <div class="d-flex flex-column justify-content-start align-items-between ms-2" style="justify-items: stretch;">
                                <h3 class="fs-6 fw-medium m-0">{{ exercise.name }}</h3>
                                <p class="fs-6 m-0">{{ exercise.target }}</p>
                            </div>
                        </label>
                    </div>
                    <div class="d-grid">
                        <button type="button" class="btn btn-outline-dark btn-white rounded-0" @click="addExercise" v-if="hasMoreExercises">Load More</button>
                    </div>
                </div>
                <button type="submit" class="btn btn-outline-dark btn-white rounded-0" style="align-self: end;" :disabled="!form.plan_name || !isAtLeastOneCheckboxSelected">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import allTargetMuscles from "@/assets/all_muscles.json"
import allExercisesData from "@/assets/all_exercise.json"
import Header from "@/components/Header.vue"


export default {
    layout: 'plain',
    components: {
        Header
    },
    data() {
        return{
            allExercises: allExercisesData,
            allTarget: allTargetMuscles,
            searchText: "",
            selectedTarget: "",
            exerciseLimit: 30,
            form: {
                plan_name: '',
                exercises: []
            }
        }
    },
    computed: {
        ...mapGetters({
            getExercises: 'exercises/getAllExercises'
        }),
        filteredExercises() {
            let filteredExercises = this.getExercises
            if (this.searchText) {
                filteredExercises = filteredExercises.filter((exercise) =>
                    exercise.name.toLowerCase().includes(this.searchText.toLowerCase())
                )
            }
            if(this.selectedTarget) {
                filteredExercises = filteredExercises.filter((item) => item.target === this.selectedTarget)
            }
            return filteredExercises.slice(0, this.exerciseLimit)
        },
        hasMoreExercises() {
            return this.exerciseLimit <= this.filteredExercises.length;
        },
        isAtLeastOneCheckboxSelected() {
            return this.form.exercises.length > 0
        },
    },
    methods: {
        handleSubmit() { 
            this.$store.dispatch('plans/savePlan', this.form);
            this.$router.go(-1)
        },
        addExercise() {
            if (this.hasMoreExercises) {
                this.exerciseLimit += 30;
            }
        }
    }

}
</script>

<style>
/* 
.form-container {
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: white;
    padding: 80px 0 150px 0;
}

.add-plans {
    width: 90%;
    border: 3px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:stretch;

}

.plan-header {
    padding: 20px 30px;
    display: flex;
    border-bottom: 2px solid black;
}

.plan-img-logo {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border: 1px solid black;
}

.plan-name {
    background-color: inherit;
    width: 80%;
    border: 2px solid black;
    align-self: flex-end;
    height: 40px;
    margin-left: 20px;
    padding: 0 10px;
    font-size: large;
    color: black;
    font-family: var(--ff-primary);
}

.plan-name:focus {
    border: none;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
}

.input-container {
    display: flex;
    justify-content: space-around;
    padding: 30px 10px;
}

.search-bar-exercise {
    width: 80%;
    height: 40px;
    border: 3px solid black;
    padding: 5px 20px;
    color: black;
    font-family: var(--ff-primary);
}

.sort-exercise {
    border: 3px solid black;
    padding: 5px 20px;
    color: black;
    font-family: var(--ff-primary);
}


.list-container {
    border: 3px solid black;
    align-self: stretch;
    margin: 0 10px 10px 10px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
    -ms-overflow-style: none; 
    scrollbar-width: none;  
}

.list-container::-webkit-scrollbar { 
    display: none;  
}

.exercise-label {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 3px solid black;
}

.exercise-img {
    margin-left: 10px;
    width: 50px;
    border-radius: 5px;
}

.title-desc-container {
    margin-left: 20px;
    color: black;
    font-family: var(--ff-primary);
}

.title-exercise {
    font-size: 15px;
}

.desc-exercise {
    font-size: 13px;
}

.exercise-container {
    background-color: whitesmoke;
    width: 90%;
    height: 60px;
    display: flex;
    padding: 10px 10px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    margin-bottom: 3px;
}

.save-btn {
    color: black;
    border: 4px solid black;
    padding: 10px 20px;
    margin: 0 10px 10px 0;
    aspect-ratio: 3/2;
    align-self: flex-end;
    cursor: pointer;
}

.add-30 {
    border: 3px solid black;
    color: black;
    font-size: larger;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    font-family: var(--ff-primary);
}
 */


</style>