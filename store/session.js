const state = () => ({
    sessions: []
});

const mutations = {
    ADD_SESSION(state, exerciseSession) {
        // Menggunakan panjang array + 1 sebagai ID
        exerciseSession.id = state.sessions.length + 1;

        state.sessions.push(exerciseSession);
        localStorage.removeItem('session');
        localStorage.setItem('session', JSON.stringify(state.sessions));
    },
    REMOVE_SESSION(state, exerciseSessionId) {
        const index = state.sessions.findIndex(session => session.id === exerciseSessionId);
        if (index !== -1) {
            state.sessions.splice(index, 1);
            localStorage.setItem('session', JSON.stringify(state.sessions));
        }
    },
    RETRIEVE_DATA(state, session) {
        session.forEach(item => state.sessions.push(item));
    }
};

const actions = {
    saveSession({ commit }, exerciseSession) {
        commit("ADD_SESSION", exerciseSession);
    },

    deleteSession({ commit }, sessionId) {
        commit('REMOVE_SESSION', sessionId);
    },

    loadSessionFromLocalStorage({ commit, state }) {
        if (process.client && state.sessions.length === 0) {
            const storedSession = localStorage.getItem('session');
            if (storedSession) {
                commit('RETRIEVE_DATA', JSON.parse(storedSession));
            }
        }
    }
};

const getters = {
    getSessions: (state) => {
        return state.sessions;
    },
    getSessionById: (state) => (id) => {
        return state.sessions.find(session => session.id === id);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
