import recommendationPlan from "@/assets/recommend_plan.json"

export const state = () => ({
    recommend: recommendationPlan
})

export const getters = {
    getRecommendation: (state) => {
        return state.recommend
    },
    getRecommendByName: (state) => (exercise) => {
        const workoutPlan = state.recommend.find(plan => {
            return plan.workout_list.some(workout => workout.workout_name === exercise);
        });
        if (workoutPlan) {
            const workout = workoutPlan.workout_list.find(workout => workout.workout_name === exercise);
            return workout.exercises;
        } else {
            return [];
        }
    }
}
