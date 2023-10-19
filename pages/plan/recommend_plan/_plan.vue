<template>
    <div>
        <Header :title="this.$route.params.plan"/>
        <div class="card border-1 rounded-0 border-black d-flex flex column justify-content-between align-items-stretch p-4 my-5" style="max-height: 100vh;">
            <ExerciseList :plan="recommendPlan" />
            <button class="btn btn-light btn-outline-dark border-2 rounded-0 border-black ml-auto align-self-end" style="justify-self: end;" @click="addPlan">Add to Plan</button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import Header from "@/components/Header.vue"
import ExerciseList from "@/components/ExerciseList"

export default {
    layout: 'plain',
    components: {
        Header, ExerciseList
    },
    computed: {
        ...mapGetters({
            getRecommendByName: 'recommendation/getRecommendByName',
            getExercisesByNames: 'exercises/getExercisesByNames'
        }),
        recommendPlan() {
            const recommend = this.getRecommendByName(this.$route.params.plan)
            const data = this.getExercisesByNames(recommend)
            return data
        }
    },
    methods: {
        addPlan() {
            const recommend = {
                plan_name: this.$route.params.plan,
                exercises: this.getRecommendByName(this.$route.params.plan)
            }
            this.$store.dispatch('plans/savePlan', recommend);
            this.$router.go(-1)
        }
    }
}
</script>
<style>
.exercise-container {
    background-color: white;
    width: 100%;
    height: 100vh;
    padding: 80px 0 150px 0;
}



.add_plan {
    align-self: flex-end;
    font-size: 15px;
    margin: 0px 10px 10px 10px;
    border: 3px solid black;
    background-color: white;
    justify-items: flex-end;
    width: 100px;
    height: 50px;
    cursor: pointer;
}

/*  */

.exercise-list-container {
    border: 3px solid black;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:stretch;
    overflow: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}

.exercise-list::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.exercise-list {
    border-bottom: 1px solid #aaa;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 20px;
}

.exercise-desc {
    margin-left: 10px;
}





</style>