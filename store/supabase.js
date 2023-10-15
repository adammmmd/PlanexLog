export const state = () => ({
    googleAuth: null,
    calendar_list: null,
    authData: null,
    provider: null,
});

export const mutations = {
    SET_AUTH(state, auth) {
        state.googleAuth = auth;
    },
    CLEAR_AUTH(state) {
        state.googleAuth = null;
    },
    SET_AUTH_DATA(state, data) {
        state.authData= data
    },
    SET_PROVIDER(state, token) {
        state.provider = token
    },
    SET_CALENDAR_LIST(state, data) {
        state.calendar_list = data
    },
};

export const actions = {
    async loginWithGoogle({commit}) {
        try {
            // Gunakan Supabase untuk melakukan otentikasi dengan Google
            const data = await this.$supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    scopes: 'https://www.googleapis.com/auth/calendar',
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });

            // const {dataauth, error} = await this.$supabase.auth.getSession()
            // if(error) {
            //     throw error
            // }
            // console.log('session ', dataauth.session.provider_refresh_token)
            // commit('SET_PROVIDER', dataauth.session.provider_refresh_token)
            // console.log(data)
        } catch (error) {
            console.error('Google login error:', error);
        }   
    },

    async logout({ commit }) {
        try {
            // Gunakan Supabase untuk logout
            await this.$supabase.auth.signOut();
            
            // Hapus informasi pengguna dari Vuex
            commit('CLEAR_AUTH');
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    async getAuth({commit}) {
        if (process.client) {
            const localAuth = localStorage.getItem('sb-aabcdkxxkotuahyxoehv-auth-token')
            console.log(JSON.parse(localAuth))
            commit('SET_AUTH', JSON.parse(localAuth));

        }
    },

    async getProvider({commit}) {
        const {data, error} = await this.$supabase.auth.getSession()
        if(error) {
            throw error
        }
        console.log('session ', data.session.provider_refresh_token)
        commit('SET_PROVIDER', data.session.provider_refresh_token)

    },

    async getCalendarList({state}) {
        try {
            await console.log('masuk action calendar')
            // console.log(state.googleAuth.provider_token)
            // const options = {
            //     method: 'GET',
            //     url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
            //     headers: {
            //         // 'Content-Type': 'application/json',
            //         // 'Access-Control-Allow-Origin': "*",
            //         // 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            //         'Authorization': 'bearer ' + state.googleAuth.provider_token
            //     }
            // };
            
            


            const response = await this.$axios.$get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {'Authorization': 'bearer ' +  state.provider});
            const calendarList = response.data
            console.log(calendarList)
            console.log('lewat calendar')
            commit('SET_CALENDAR_LIST', calendarList)
        } catch(error) {
            console.log(error)
        }
    }
}

export const getters = {
    getAuth: (state) => {
        return state.googleAuth
    },
    getCalendarList: (state) => {
        return state.calendar_list
    }
}