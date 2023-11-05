<template>
    <div class="calendar__container">
        <!-- <FullCalendar
            :options="calendarOptions"
            @eventClick="showSession"
        /> -->

        <Calendar />

        <div class="calendar-list__container shadow-main border-main">
            <button class="btn" @click="listEvents" style="margin-bottom: 1rem;">Refresh</button>
            <div class="plan-form__list-container border-main">
                <div  class="plan-form__accordion-item" v-for="(event, i) in events" :key="i">
                    <div class="plan-form__accordion-header"  @click="toggleAccordion(i)">
                        <div class="plan-form__accordion-title">
                            <p class="fs-700">{{ event.summary }}</p>
                        </div>
                        <div class="plan-form__accordion-arrow">
                            <img src="@/assets/svg/dash-circle.svg" v-if="activeAccordion === i">
                            <img src="@/assets/svg/plus-circle.svg" v-else>
                        </div>
                    </div>
                    <div class="plan-form__accordion-collapse" :class="{ 'collapse-open': activeAccordion === i }">
                        <div class="plan-form__accordion-body">
                            <div>
                                <h2>{{ event.summary }}</h2>
                                <div>
                                    <img src="@/assets/svg/three-dots-vertical.svg" >
                                    <button @click="deleteEvent(event.id)" style="display: hidden;">delete</button>
                                </div>
                            </div>
                            <div>
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
            activeAccordion: null,
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
        toggleAccordion(index) {
            if (this.activeAccordion === index) {
                this.activeAccordion = null;
            } else {
                this.activeAccordion = index;
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