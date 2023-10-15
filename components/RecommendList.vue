<template>
    <div class="plan-list_container">
        <h1 class="plan-list_title">Recommendations</h1>
        <div v-for="plan in recommendation" :key="plan.plan_name">
        <h2 class="plan-list_recommend">{{ plan.plan_name }}</h2>
        <div class="plan-list">
            <div v-for="workout in plan.workout_list" :key="workout.workout_name" class="exercise-plan">
                <nuxt-link class="exercise-plan_link" :to="`/plan/recommend_plan/${workout.workout_name}`" >{{workout.workout_name}}</nuxt-link>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import ExercisePlan from "@/components/ExercisePlan.vue"

export default {
    props: {
        recommendation: Array
    },
    components: {
        ExercisePlan,
    },
}

</script>