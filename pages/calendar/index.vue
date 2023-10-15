<template>
    <div class="calendar_container">
        <!-- <FullCalendar
            :options="calendarOptions"
            @eventClick="showSession"
        /> -->

        <div class="calendar-events_container">
            <div class="calendar-events_events-container">
                <div v-for="(event, i) in events" :key="i" class="calendar-events_event-container">
                    <h1 @click="toggleEvent(i)">{{ event.summary }}!!!!!</h1>
                    <p v-if="selectedEvent === i">{{ event.description }}</p>
                    <button v-if="selectedEvent === i" @click="deleteEvent(event.id)">delete</button>
                </div>
            </div>
            <button @click="listEvents">event</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
// import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
    layout: 'dashboard',
    // components: {
    //     FullCalendar
    // },
    data() {
        return {
            eventsCalendar: [],
            selectedEvent: null,
        }
    },
    async mounted() {
        await this.listEvents()
    },
    computed: {
        ...mapGetters({
            getSessions: 'session/getSessions',
            getCalendarId: 'google/getCalendarId'
        }),
        events() {
            console.log(this.eventsCalendar)
            return this.eventsCalendar
        }
    },
    methods: {
        toggleEvent(index) {
            if(this.selectedEvent === index) {
                this.selectedEvent = null
            } else {
                this.selectedEvent = index
            }
        },
        async listEvents() {
            console.log(this.getCalendarId)
            let response = null
            try {
                response = await gapi.client.calendar.events.list({'calendarId': this.getCalendarId})
            } catch (err) {
                console.log(err)
                return;
            }

            this.eventsCalendar = response.result.items
        }, 
        async deleteEvent(id) {
            try {
                const event = {
                    'calendarId': this.getCalendarId,
                    'eventId' : id
                }
                const response = await gapi.client.calendar.events.delete(event)
                console.log('delete response', response)
                this.listEvents()
            } catch (err) {
                console.log(err)
                return;
            }
        }
    },
    // created() {
    //     // Panggil metode untuk menginisialisasi events di kalender
    //     this.updateCalendarEvents();
    // },
}
</script>
<style>
.calendar_container {
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: white;
    padding: 80px 0 150px 0;
}

.calendar_calendar-container {
    max-width: 500px;
}

.fc {
    font-family: var(--ff-primary);
}

.fc-toolbar-title {
    font-family: var(--ff-heading);
}

.fc .fc-button-primary {
    background-color: inherit;
    border: 2px solid black;
    color: black;
    border-radius: 0;
}

.fc-theme-standard .fc-scrollgrid {
    border: 1px solid black;
}

.calendar-events_container {
    width: 90%;
    padding: 10px;
    border: 3px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
}

.calendar-events_events-container {
    border: 3px solid black;
    align-self: stretch;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}

.calendar-events_events-container::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.calendar-events_event-container {
    border: 1px solid black;
    padding: 10px 20px;
}

.calendar-events_event-container h1{
    font-size: 30px;
    font-weight: 700;
}

.calendar-events_event-container p {
    padding: 20px 0px;
}

</style>