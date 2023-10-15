<template>
    <section class="plan-list_container">
        <h1 class="plan-list_title">Your Plan</h1>
        <div class="plan-list">
            <div class="exercise-plan" >
                <nuxt-link class="add-plan" to="/plan/form">+</nuxt-link>
            </div>
            <div v-for="plan in plans" class="exercise-plan">
                <ExercisePlan :planName="plan.plan_name" />
            </div>
        </div>
    </section>
</template>
<script>

export default {
    props: {
        plans: Array,
    }
}

</script>