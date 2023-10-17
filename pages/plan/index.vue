<template>
    <div>  
        <section class="mb-5">
            <h1 class="fs-1">Your Plan</h1>
            <div class="d-flex px-5 overflow-auto">
                <div>
                    <div class="card d-flex align-items-center justify-content-center border-2 rounded-0 border-black bg-white me-3" style="width: 10rem; height: 7rem;">
                        <nuxt-link class="card-title text-center text-decoration-none" to="/plan/form">+</nuxt-link>
                    </div>
                </div>
                <div v-for="(plan, i) in plans" :key="i">
                    <ExercisePlan :planName="plan.plan_name" />
                </div>
            </div>
        </section>
        <RecommendList :recommendation="recommendation" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import MyPlan from "@/components/MyPlan.vue"
import ExercisePlan from "@/components/ExercisePlan.vue"
import RecommendList from "@/components/RecommendList.vue"

export default {
    layout: 'dashboard',
    components: {
        MyPlan, ExercisePlan, RecommendList
    },
    computed: {
        ...mapGetters({
            getPlans: 'plans/getPlans',
            getRecommendation: 'recommendation/getRecommendation',
            getExercises: 'exercises/getAllExercises'
        }),
        ...mapActions({
            fetch: 'exercises/fetchExercises'
        }),
        plans() {
            return this.getPlans
        },
        recommendation() {
            return this.getRecommendation
        },
        datafetch() {
            return this.fetch
        },
        exercisess() {
            return this.getExercises
        }
    },
    async mounted() {
        try {
            await this.$store.dispatch('exercises/fetchExercises')
            await this.$store.dispatch('session/loadSessionFromLocalStorage')
            await this.$store.dispatch('plans/loadPlansFromLocalStorage')
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    }
}
</script>

<style>
/* .plan-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: whitesmoke;
    color: black;
    height: 100%;
    padding: 10px 0px 100px 0px;
}

.plan-list_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px 40px;
    margin-bottom: 50px;
    width: 100%;
}

.plan-list_title {
    font-family: var(--ff-heading);
    font-size: 25px;
    margin-bottom: 20px;
}

.plan-recommend_container {
    margin-bottom: 20px;
}

.plan-list_recommend {
    margin-bottom: 10px;
    font-size: 20px;
}

.plan-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow: auto;
    -ms-overflow-style: none; 
    scrollbar-width: none;  
}

.plan-list::-webkit-scrollbar { 
    display: none;
}

.exercise-plan {
    background-color: white;
    margin-right: 20px;
    width: 200px;
    aspect-ratio: 3/2;
    border: 3px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.exercise-plan_link {
    color: black;
    text-decoration: none;
    text-align: center;
}

.add-plan {
    border-radius: 10px;
    color: white;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
} */
</style>