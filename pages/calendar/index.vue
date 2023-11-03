<template>
    <div class="container d-flex flex-row">
        <!-- <FullCalendar
            :options="calendarOptions"
            @eventClick="showSession"
        /> -->

        <Calendar />

        <div class="container border border-black border-1 rounded-0 d-flex flex-column justify-content-start align-items-stretch p-2 m-auto" style="height: 100vh;">
            <button class="btn btn-outline-dark btn-white rounded-0 align-self-end mb-5" @click="listEvents">Refresh</button>
            <div class="accordion accordion-flush border border-black border-1 rounded-0 overflow-auto mb-3" style="max-height: 400px;">
                <div  class="accordion-item border border-black border-1 rounded-0" v-for="(event, i) in events" :key="i">
                    <div class="accordion-header">
                        <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + i">
                            <p class="fs-6 m-0 ms-2">{{ event.summary }}</p>
                        </button>
                    </div>
                    <div class="accordion-collapse collapse" :id="'collapse-' + i">
                        <div class="accordion-body">
                            <button data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Delete Event">&#xF5D3;</button>
                            <button @click="deleteEvent(event.id)">delete</button>
                            <div>
                                <h2>{{ event.summary }}</h2>
                                <div>
                                    <strong>Nama Sesi:</strong> {{ getDescriptionValue(event.description, 'Nama Sesi:') }}
                                </div>
                                <div>
                                    <strong>Berat Badan:</strong> {{ getDescriptionValue(event.description, 'Berat Badan:') }}
                                </div>
                                <div>
                                    <strong>Lokasi:</strong> {{ getDescriptionValue(event.description, 'Lokasi:') }}
                                </div>
                                <div>
                                    <strong>Waktu Mulai:</strong> {{ getDescriptionValue(event.description, 'Waktu Mulai:') }}
                                </div>
                                <div>
                                    <strong>Waktu Selesai:</strong> {{ getDescriptionValue(event.description, 'Waktu Selesai:') }}
                                </div>
                                <div>
                                    <strong>Daftar Latihan:</strong>
                                    <ul>
                                    <li v-for="(exercise, exIndex) in getExerciseList(event.description)" :key="exIndex">
                                        {{ exercise }}
                                    </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import Calendar from '@/components/Calendar.vue';


export default {
    layout: 'dashboard',
    components: {
        Calendar,
    },
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
        },
        getDescriptionValue(description, key) {
            const regex = new RegExp(`${key}: (.*)`);
            const match = description.match(regex);
            if (match && match.length > 1) {
                return match[1].trim();
            }
            return '';
        },
        getExerciseList(description) {
            const exerciseList = [];
            const regex = /\d+\.\s+\*\*(.*?)\*\*/g;
            const matches = description.match(regex);
            if (matches) {
                matches.forEach(match => {
                const exercise = match.replace(/\d+\.\s+\*\*|\*\*/g, '').trim();
                exerciseList.push(exercise);
                });
            }
            return exerciseList;
        }
    },
}
</script>
<style>
/* .calendar_container {
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
    -ms-overflow-style: none;  
    scrollbar-width: none;  
}

.calendar-events_events-container::-webkit-scrollbar { 
    display: none; 
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
} */

</style>