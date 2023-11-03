<template>
    <div class="plan__your-plan-container">
        <h1 class="fs-900">Recommendations</h1>
        <div class="plan__plan-rec-container" v-for="plan in recommendation" :key="plan.plan_name">
            <h2 class="fs-800">{{ plan.plan_name }}</h2>
            <div class="plan__plan-container">
                <div v-for="workout in plan.workout_list" :key="workout.workout_name">
                    <div class="plan__card shadow-main border-main">
                        <nuxt-link class="fs-700" :to="`/plan/recommend_plan/${workout.workout_name}`" >{{workout.workout_name}}</nuxt-link>
                    </div>
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