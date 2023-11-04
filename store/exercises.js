
const state = {
    exercises: [],
}

const mutations = {
    SET_EXERCISES(state, exercises) {
        state.exercises = exercises
    },
}

const actions = {
    async fetchExercises({commit, state}) {
        try {
            if (state.exercises.length > 0) {
                return
            }

            const options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises',
                params: {limit: '1324'},
                headers: {
                    'X-RapidAPI-Key': '0103c033f1msh9c2bdc9210ec870p13323cjsn4936eff52802',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };
            
            const response = await this.$axios.request(options);
            const exercises = response.data
            commit('SET_EXERCISES', exercises)

        } catch (error) {
            console.error('error:', error)
        }
    }
}

const getters = {
    getAllExercises: (state) => {
        return state.exercises
    },
    getExercisesByNames: (state) => (exerciseNames) => {
        return state.exercises.filter((exercise) => exerciseNames.includes(exercise.name));
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}