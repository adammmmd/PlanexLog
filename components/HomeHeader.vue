<template>
    <nav class="navbar navbar-expand-lg bg-white fixed-top border border-black border-2 p-0">
        <div class="container-fluid pe-0">
            <h2 class="navbar-brand m-0">PlanEx</h2>
            <div class="d-flex">
                <button class="btn btn-dark rounded-0" v-if="!loggedIn" id="authorize_button" @click="handleAuthClick">Authorize</button>
                <nuxt-link class="btn btn-outline-dark border-1 rounded-0" v-if="loggedIn" to="/plan">Dashboard</nuxt-link>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    layout: "dashboard",
    data() {
        return {
            tokenClient: null,
            loggedIn: false,
            gapiInited: false,
            gisInited: false
        }
    },
    async mounted() {
        await this.loadGoogleApi();
        await this.loadGoogleIdentityServices();
    },
    methods: {
        async loadGoogleApi() {
            gapi.load('client', this.initializeGapiClient);
        },
        async initializeGapiClient() {
            await gapi.client.init({
                apiKey: 'AIzaSyDbTy6_1Nsv9bYd2I27QstuSic90ao3YBg',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            });
        },
        async loadGoogleIdentityServices() {
            this.tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: '568918727826-i2gta5g7lj5bmjs2n0ohe3jgia40ut75.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/calendar',
                callback: '', // defined later
            });
            
        },
        handleAuthClick() {
            this.tokenClient.callback = async (resp) => {
                if (resp.error !== undefined) {
                    throw resp;
                } else {
                    this.loggedIn = true
                    this.checkCalendar()
                    this.getData()
                }
            };
            this.gapiInited = true;
            this.gisInited = true;

            if (gapi.client.getToken() === null) {
                this.tokenClient.requestAccessToken({ prompt: 'consent' });
                
            } else {
                this.tokenClient.requestAccessToken({ prompt: '' });
            }
        },

        async checkCalendar() {
            let response = null
            try {
                response = await gapi.client.calendar.calendarList.list()
            } catch (err) {
                return;
            }
            const hasPlanExApp = response.result.items.some(item => item.summary === "PlanEx App");

            if (!hasPlanExApp) {
                try {
                    const buatCalendar = await gapi.client.calendar.calendars.insert({"summary": "PlanEx App"})
                    this.$store.dispatch('google/setCalendarId', buatCalendar.result.id)
                } catch(err) {
                    throw(err)
                }
            } 
            const items = response.result.items
            for(let item of items) {
                if(item.summary === "PlanEx App") {
                    this.$store.dispatch('google/setCalendarId', item.id)
                }
            }    
        },
        async getData() {
            try {
                await this.$store.dispatch('exercises/fetchExercises')
                await this.$store.dispatch('session/loadSessionFromLocalStorage')
                await this.$store.dispatch('plans/loadPlansFromLocalStorage')
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            }
        },
        handleSignoutClick() {
            const token = gapi.client.getToken();
            if (token !== null) {
                google.accounts.oauth2.revoke(token.access_token);
                gapi.client.setToken('');
                this.gapiInited = false
                this.gisInited = false
            }
        },
    },
};

</script>

<!-- <style>
.home-header_container {
    background-color: #ffffff;
    border: 3px solid #000000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.home-header_title {
    color: black;
    font-family: var(--ff-heading);
    font-size: var(--fs-700);
    margin-left: 30px;
}

.home-header_btn {
    font-family: var(--ff-primary);
    padding: 10px 20px;
    border: 4px solid black;
    text-decoration: none;
}


</style>
 -->
