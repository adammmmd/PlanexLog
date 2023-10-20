<template>
<div>
    <p>Google Calendar API Quickstart</p>

    <!-- Add buttons to initiate auth sequence and sign out -->
    <button id="authorize_button" @click="handleAuthClick">Authorize</button>
    <button id="signout_button" @click="handleSignoutClick">Sign Out</button>
    
    <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">

<h1 class="text-center">Demo</h1>

<div class="some-class">
    <h2>Today calendar (default skin)</h2>
    <div class="calendar-container">
        <div id="dycalendar-today" class="dycalendar-container"></div>
    </div>
</div>

<hr/>

<div class="some-class">
    <h2>Month calendar (default skin)</h2>
    <div class="calendar-container">
        <div id="dycalendar-month" class="dycalendar-container"></div>
    </div>
</div>

<hr/>

<div class="some-class">
    <h2>Day calendar (default skin)</h2>
    <div class="calendar-container">
        <div id="dycalendar-day" class="dycalendar-container"></div>
    </div>
</div>

<div class="some-class">
    <h2>Today calendar (skin-blue)</h2>
    <div class="calendar-container">
        <div id="dycalendar-today-with-skin" class="dycalendar-container skin-blue"></div>
    </div>
</div>

<div class="some-class">
    <h2>Today calendar (skin-black shadow-default)</h2>
    <div class="calendar-container">
        <div id="dycalendar-today-with-skin-shadow" class="dycalendar-container skin-black shadow-default"></div>
    </div>
</div>

<hr/>

<div class="some-class">
    <h2>Month calendar (default current month) (skin-red)</h2>
    <div class="calendar-container">
        <div id="dycalendar-month-with-skin" class="dycalendar-container skin-red"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (21st October 1990) (skin-green shadow-default)</h2>
    <div class="calendar-container">
        <div id="dycalendar-month-with-skin-shadow" class="dycalendar-container skin-green shadow-default"></div>
    </div>
</div>

<hr/>

<div class="some-class">
    <h2>Month Calendar 1 target class = "dycalendar-month"</h2>
    <div class="dycalendar-month dycalendar-container skin-purple"></div>
</div>

<div class="some-class">
    <h2>Month Calendar 2 target class = "dycalendar-month"</h2>
    <div class="dycalendar-month dycalendar-container skin-blue shadow-default"></div>
</div>

<hr/>

<div class="some-class">
    <h2>Month Calendar with prev-next-button id = "dycalendar-month-prev-next-button"</h2>
    <div id="dycalendar-month-prev-next-button" class="dycalendar-container skin-green shadow-default"></div>
</div>

<div class="some-class">
    <h2>Month Calendar with prev-next-button class = "dycalendar-month-prev-next-button"</h2>
    <div class="dycalendar-month-prev-next-button dycalendar-container skin-red shadow-default"></div>
</div>

<div class="some-class">
    <h2>Month Calendar with prev-next-button class = "dycalendar-month-prev-next-button"</h2>
    <div class="dycalendar-month-prev-next-button dycalendar-container skin-purple shadow-default"></div>
</div>

<hr/>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge shadow-default)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge shadow-default"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge shadow-black)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge shadow-black"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge shadow-blue)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge shadow-blue"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge shadow-green)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge shadow-green"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge shadow-purple)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge shadow-purple"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge shadow-red)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge shadow-red"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge shadow-spacegray)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge shadow-spacegray"></div>
    </div>
</div>

<hr/>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge default skin gradient)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge gradient"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge skin-black gradient)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge skin-black gradient"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge skin-blue gradient)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge skin-blue gradient"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge skin-green gradient)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge skin-green gradient"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge skin-purple gradient)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge skin-purple gradient"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge skin-red gradient)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge skin-red gradient"></div>
    </div>
</div>

<div class="some-class">
    <h2>Month calendar (default current month) (round-edge skin-spacegray gradient)</h2>
    <div class="calendar-container">
        <div class="dycalendar-month dycalendar-container round-edge skin-spacegray gradient"></div>
    </div>
</div>

</div>

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

<style scoped>
.dycalendar-container{display:inline-block;border:1px solid #eee}.dycalendar-container.round-edge{border-radius:5%;-o-border-radius:5%;-moz-border-radius:5%;-webkit-border-radius:5%}.dycalendar-day-container{padding:10px;text-align:center;font-family:Arial}.dycalendar-day-container div{padding:0;margin-bottom:10px}.dycalendar-day-container .dycalendar-span-day{font-size:110%}.dycalendar-day-container .dycalendar-span-date{font-size:250%}.dycalendar-day-container .dycalendar-span-month-year{font-size:90%}.dycalendar-month-container{padding:10px;text-align:center;font-family:Arial}.dycalendar-month-container div{padding:0;margin-bottom:10px}.dycalendar-month-container .dycalendar-header{position:relative}.dycalendar-month-container .dycalendar-header .dycalendar-prev-next-btn{position:absolute;top:0;cursor:pointer}.dycalendar-month-container .dycalendar-header .dycalendar-prev-next-btn.prev-btn{left:0}.dycalendar-month-container .dycalendar-header .dycalendar-prev-next-btn.next-btn{right:0}.dycalendar-month-container .dycalendar-span-month-year{margin:5px;cursor:pointer}.dycalendar-month-container .dycalendar-body table tr td{padding:5px}.dycalendar-month-container .dycalendar-target-date,.dycalendar-month-container .dycalendar-today-date{background-color:#111;color:#fff;border-radius:2px}.dycalendar-container.gradient{background:#fff;background:linear-gradient(#fff,#d3d3d3);background:-o-linear-gradient(#fff,#d3d3d3);background:-moz-linear-gradient(#fff,#d3d3d3);background:-webkit-linear-gradient(#fff,#d3d3d3)}.dycalendar-container.skin-black{color:#fff;background-color:#111;border:0}.dycalendar-container.skin-black.gradient{background:#111;background:linear-gradient(#555,#111);background:-o-linear-gradient(#555,#111);background:-moz-linear-gradient(#555,#111);background:-webkit-linear-gradient(#555,#111)}.dycalendar-container.skin-black .dycalendar-target-date,.dycalendar-container.skin-black .dycalendar-today-date{background-color:#fff;color:#111;border-radius:2px}.dycalendar-container.skin-blue{color:#fff;background-color:#3c99d3;border:0}.dycalendar-container.skin-blue.gradient{background:#3c99d3;background:linear-gradient(#5ebbf5,#3c99d3);background:-o-linear-gradient(#5ebbf5,#3c99d3);background:-moz-linear-gradient(#5ebbf5,#3c99d3);background:-webkit-linear-gradient(#5ebbf5,#3c99d3)}.dycalendar-container.skin-blue .dycalendar-target-date,.dycalendar-container.skin-blue .dycalendar-today-date{background-color:#fff;color:#3c99d3;border-radius:2px}.dycalendar-container.skin-green{color:#fff;background-color:#2bb063;border:0}.dycalendar-container.skin-green.gradient{background:#2bb063;background:linear-gradient(#3dd175,#2bb063);background:-o-linear-gradient(#3dd175,#2bb063);background:-moz-linear-gradient(#3dd175,#2bb063);background:-webkit-linear-gradient(#3dd175,#2bb063)}.dycalendar-container.skin-green .dycalendar-target-date,.dycalendar-container.skin-green .dycalendar-today-date{background-color:#fff;color:#2bb063;border-radius:2px}.dycalendar-container.skin-purple{color:#fff;background-color:#975ea4;border:0}.dycalendar-container.skin-purple.gradient{background:#975ea4;background:linear-gradient(#ca82d7,#975ea4);background:-o-linear-gradient(#ca82d7,#975ea4);background:-moz-linear-gradient(#ca82d7,#975ea4);background:-webkit-linear-gradient(#ca82d7,#975ea4)}.dycalendar-container.skin-purple .dycalendar-target-date,.dycalendar-container.skin-purple .dycalendar-today-date{background-color:#fff;color:#975ea4;border-radius:2px}.dycalendar-container.skin-red{color:#fff;background-color:#e94d40;border:0}.dycalendar-container.skin-red.gradient{background:#e94d40;background:linear-gradient(#fb6f62,#e94d40);background:-o-linear-gradient(#fb6f62,#e94d40);background:-moz-linear-gradient(#fb6f62,#e94d40);background:-webkit-linear-gradient(#fb6f62,#e94d40)}.dycalendar-container.skin-red .dycalendar-target-date,.dycalendar-container.skin-red .dycalendar-today-date{background-color:#fff;color:#e94d40;border-radius:2px}.dycalendar-container.skin-spacegray{color:#fff;background-color:#343d46;border:0}.dycalendar-container.skin-spacegray.gradient{background:#343d46;background:linear-gradient(#454e57,#343d46);background:-o-linear-gradient(#454e57,#343d46);background:-moz-linear-gradient(#454e57,#343d46);background:-webkit-linear-gradient(#454e57,#343d46)}.dycalendar-container.skin-spacegray .dycalendar-target-date,.dycalendar-container.skin-spacegray .dycalendar-today-date{background-color:#fff;color:#343d46;border-radius:2px}.dycalendar-container.shadow-default{-o-box-shadow:0 4px 4px 0 rgba(50,50,50,.4);-moz-box-shadow:0 4px 4px 0 rgba(50,50,50,.4);-webkit-box-shadow:0 4px 4px 0 rgba(50,50,50,.4);box-shadow:0 4px 4px 0 rgba(50,50,50,.4)}.dycalendar-container.shadow-black{-o-box-shadow:0 4px 4px 0 rgba(0,0,0,.4);-moz-box-shadow:0 4px 4px 0 rgba(0,0,0,.4);-webkit-box-shadow:0 4px 4px 0 rgba(0,0,0,.4);box-shadow:0 4px 4px 0 rgba(0,0,0,.4)}.dycalendar-container.shadow-blue{-o-box-shadow:0 4px 4px 0 rgba(60,153,211,.4);-moz-box-shadow:0 4px 4px 0 rgba(60,153,211,.4);-webkit-box-shadow:0 4px 4px 0 rgba(60,153,211,.4);box-shadow:0 4px 4px 0 rgba(60,153,211,.4)}.dycalendar-container.shadow-green{-o-box-shadow:0 4px 4px 0 rgba(43,176,99,.4);-moz-box-shadow:0 4px 4px 0 rgba(43,176,99,.4);-webkit-box-shadow:0 4px 4px 0 rgba(43,176,99,.4);box-shadow:0 4px 4px 0 rgba(43,176,99,.4)}.dycalendar-container.shadow-purple{-o-box-shadow:0 4px 4px 0 rgba(151,94,164,.4);-moz-box-shadow:0 4px 4px 0 rgba(151,94,164,.4);-webkit-box-shadow:0 4px 4px 0 rgba(151,94,164,.4);box-shadow:0 4px 4px 0 rgba(151,94,164,.4)}.dycalendar-container.shadow-red{-o-box-shadow:0 4px 4px 0 rgba(233,77,64,.4);-moz-box-shadow:0 4px 4px 0 rgba(233,77,64,.4);-webkit-box-shadow:0 4px 4px 0 rgba(233,77,64,.4);box-shadow:0 4px 4px 0 rgba(233,77,64,.4)}.dycalendar-container.shadow-spacegray{-o-box-shadow:0 4px 4px 0 rgba(52,61,70,1);-moz-box-shadow:0 4px 4px 0 rgba(52,61,70,1);-webkit-box-shadow:0 4px 4px 0 rgba(52,61,70,1);box-shadow:0 4px 4px 0 rgba(52,61,70,1)}
</style>

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
