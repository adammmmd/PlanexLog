const state = () => ({
    plans: []
})

const mutations = {
    ADD_PLAN(state, plan) {
        state.plans.unshift(plan)
        localStorage.removeItem('plans')
        localStorage.setItem('plans', JSON.stringify(state.plans))
    },
    REMOVE_PLAN(state, planName) {
    const index = state.plans.findIndex(plan => plan.plan_name === planName);
    if (index !== -1) {
        state.plans.splice(index, 1);
        localStorage.setItem('plans', JSON.stringify(state.plans))
    }
    },
    RETRIEVE_DATA(state, plan) {
        plan.forEach(item => state.plans.push(item))
    }
}

const actions = {
    savePlan({ commit }, planData) {
        commit('ADD_PLAN', planData)
    },
    
    deletePlan({ commit }, planName) {
        commit('REMOVE_PLAN', planName)
    },
    
    loadPlansFromLocalStorage({ commit, state }) {
        if (process.client && state.plans.length === 0) {
            const storedPlans = localStorage.getItem('plans')
            if (storedPlans) {
                commit('RETRIEVE_DATA', JSON.parse(storedPlans))
            }
        }
    },
}

const getters = {
    getPlans: (state) => {
        return state.plans
    },
    getPlanByName: (state) => (name) => {
        return state.plans.find(plan => plan.plan_name == name)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}