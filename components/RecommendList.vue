<template>
    <div class="pb-5">
        <h1 class="fs-1">Recommendations</h1>
        <div v-for="plan in recommendation" :key="plan.plan_name" class="mb-4">
            <h2 class="fs-2">{{ plan.plan_name }}</h2>
            <div class="d-flex px-5 overflow-auto">
                <div v-for="workout in plan.workout_list" :key="workout.workout_name">
                    <div class="card d-flex align-items-center justify-content-center border-2 rounded-0 border-black bg-white me-3" style="width: 10rem; height: 7rem;">
                        <nuxt-link class="card-title text-center text-decoration-none" :to="`/plan/recommend_plan/${workout.workout_name}`" >{{workout.workout_name}}</nuxt-link>
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