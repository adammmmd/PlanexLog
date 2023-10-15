<template>
<div>
    <p>Google Calendar API Quickstart</p>

    <!-- Add buttons to initiate auth sequence and sign out -->
    <button id="authorize_button" @click="handleAuthClick">Authorize</button>
    <button id="signout_button" @click="handleSignoutClick">Sign Out</button>
    
    
</div>
</template>


<script>

export default {
    layout: "dashboard",
    data() {
        return {
            tokenClient: null,
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
            }
            };
            this.gapiInited = true;
            this.gisInited = true;

            if (gapi.client.getToken() === null) {
                this.tokenClient.requestAccessToken({ prompt: 'consent' });
                console.log(gapi.client)
            } else {
                this.tokenClient.requestAccessToken({ prompt: '' });
                console.log(gapi.client)
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

<!-- <script>
import { mapState, mapActions } from 'vuex'

export default {
    layout: 'dashboard',
    // data() {
    //     return {
    //         gapiToken: gapi.client.gapiToken()
    //     }
    // },
    computed: {
        ...mapState('google', ['tokenClient', 'gapiInited', 'gisInited'])
    },
    methods: {
        ...mapActions('google', [
        'loadGoogleApi',
        'loadGoogleIdentityServices',
        'handleAuthClick',
        'handleSignoutClick'
        ])
    },
    async mounted() {
        await this.loadGoogleApi();
        await this.loadGoogleIdentityServices();
    },
}

</script> -->


<!-- <template>

    <div>
        <p>Google Calendar API Quickstart</p>

        <button v-if="visible" id="authorize_button" onclick="handleAuthClick()">Authorize</button>
        <button id="signout_button" onclick="handleSignoutClick()">Sign Out</button>

        <pre id="content" style="white-space: pre-wrap;">{{ content }}</pre>
    </div>

</template>
<script>
// TODO(developer): Set to client ID and API key from the Developer Console


export default {
    layout: "dashboard",
    async asyncData({ params }) {
        const CLIENT_ID = '568918727826-i2gta5g7lj5bmjs2n0ohe3jgia40ut75.apps.googleusercontent.com';
        const API_KEY = 'AIzaSyDbTy6_1Nsv9bYd2I27QstuSic90ao3YBg';

        const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

        const SCOPES = 'https://www.googleapis.com/auth/calendar';

        let tokenClient = null;
        let gapiInited = false;
        let gisInited = false;

        function gapiLoaded() {
            gapi.load('client', initializeGapiClient);
        }

        async function initializeGapiClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            gapiInited = true;
            maybeEnableButtons();
        }

        function gisLoaded() {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: '', // defined later
            });
            gisInited = true;
            maybeEnableButtons();
        }

        function maybeEnableButtons() {
            if (gapiInited && gisInited) {
                this.visible = true;
            }
        }

        async function listUpcomingEvents() {
            let response;
            try {
                const request = {
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime',
                };
            response = await gapi.client.calendar.events.list(request);
            } catch (err) {
                console.log(err)
                return;
            }

            const events = response.result.items;
            if (!events || events.length == 0) {
                this.content = 'No events found.';
                return;
            }
            // Flatten to string to display
            const output = events.reduce(
                (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
            'Events:\n');
                this.content = output;
        }
        
        await gapiLoaded()
        await gisLoaded()
        return {}
    },
    data() {
        return {
            visible: null,
            content: null,
        }
    },
    methods: {
        handleAuthClick() {
            tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
                this.visible = ''
                await listUpcomingEvents();
            };

            if (gapi.client.getToken() === null) {
                // Prompt the user to select a Google Account and ask for consent to share their data
                // when establishing a new session.
                tokenClient.requestAccessToken({prompt: 'consent'});
            } else {
                // Skip display of account chooser and consent dialog for an existing session.
                tokenClient.requestAccessToken({prompt: ''});
            }
        },
        handleSignoutClick() {
            const token = gapi.client.getToken()
            if (token !== null) {
                google.accounts.oauth2.revoke(token.access_token)
                gapi.client.setToken('')
                this.visible = true
            }
        }
    }

}

</script> -->


<!-- <template>
    <div>
        <h1>Supabase and Vuex Example</h1>
        <p>Google Calendar API Quickstart</p>
        <div v-if="data">
            <p>{{ session }}</p>
            <button @click="loginWithGoogle">Login with Google</button>
        </div>
        <div v-else>
            <p>{{ session }}</p>
            <button @click="logout">Logout</button>
        </div>
        <button @click="fetchGoogleCalendarData">fet calendar</button>
    </div>
</template>
<script>
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhYmNka3h4a290dWFoeXhvZWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4MDAzMDIsImV4cCI6MjAxMTM3NjMwMn0.GaCDrYROM6p7bYa4PYsEPC5VCGKAf7WQw8h99nOKwKA";

const supabaseUrl = "https://aabcdkxxkotuahyxoehv.supabase.co";
const supabaseKey = SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
    layout: "dashboard",
    data() {
        return {
            calendar: '',
            data: ''
        };
    },
    computed: {
        async session() {
            const {data:session, error} = await supabase.auth.getSession()
            console.log(session)
            this.data = session
            console.log(this.data)
            return session
        }
    },
    methods: {
        async loginWithGoogle() {
            const {error} = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    scopes: 'https://www.googleapis.com/auth/calendar',
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });
            if (error) {
                console.log(error)
            }
        },
        async fetchGoogleCalendarData() {
            await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList',{
                method: "GET",
                headers: {
                    'Authorization': 'bearer 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'
                }
            }).then((data) => {
                return data.json
            }).then((data) => {
                console.log(data)
            })

        },

        async logout() {
            await supabase.auth.signOut();
        },
    },
}
</script>   -->
