<template>
  <div class="session_container">
    <Header :title="stopwatchDisplay" />
    <!-- <header class="session_header-container">
        <div @click="cancelSession" class="session_header-back-btn">&#10005;</div>
        <h2 class="session_header-title"></h2>
      </header> -->
    <div>
      <p v-if="isResting" >{{ formatRestTime }}</p>
      <button v-if="isResting" @click="stopRest()">stop rest</button>
    </div>
    <form class="session_form-container">
      <div class="session_form-head">
        <p class="title">{{ this.$route.params.session }}</p>
        <div class="session-weight-location">
          <input v-model="form.body_weight" type="number" placeholder="body weight (kg)">
          <input v-model="form.location" type="text" placeholder="location">
        </div>
      </div>
      <div class="session_form-body">
        <div class="session_exercise-container" v-for="(exercise, i) in plan" :key="i">
          <div class="session_exercise" @click="toggleSession(i)">
            <div class="session_exercise-desc">
              <img class="session_exercise-img" :src="exercise.gifUrl" :alt="exercise.name">
              <p>{{ exercise.name }}</p>
            </div>
            <p>&#65086;</p>
          </div>
          <div v-if="activeSessionIndex === i">
            <div class="session_rep-weight" v-for="(set, index) in exercise.sets" :key="index">
              <div>
                <input v-model="set.reps" type="number" name="repetition" :id="`${exercise.name}repetition${index}`" placeholder="Rep" required>
                <input v-model="set.weight" type="number" name="weight" :id="`${exercise.name}weight${index}`" placeholder="Weight" required>
              </div>
              <div>
                <button class="session_btn delete" type="button" @click="deleteSet(exercise, set)">&#10005;</button>
                <button v-if="!set.rest_time" class="session_btn done" type="button" @click="doneSet(exercise.name, index)">&#10004;</button>
              </div>
            </div>
          </div>
          <button class="session_add-btn" type="button" @click="tambahSet(exercise.name)" v-if="activeSessionIndex === i">add</button>          
        </div>
      </div>
      <nuxt-link class="session_save-btn" to="/plan"><a @click="save">save session</a></nuxt-link>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import Header from '@/components/Header.vue'

export default {
  layout: 'plain',
  components: {
    Header
  },
  data() {
    return{
      form: {
        session_name: this.$route.params.session,
        body_weight: 0,
        location: "",
        start: {
          dateTime: "",
          timeZone: ""
        },
        end: {
          dateTime: "",
          timeZone: ""
        },
        exercises: []
      },
      stopwatch: null,
      stopwatchDisplay: "00:00:00",
      activeSessionIndex: null,
      restTimer: null, // Timer istirahat
      restTime: 0,    // Waktu istirahat dalam milidetik  
      isResting: false
    }
  },
  mounted() {
    const plan = this.getPlanByName(this.$route.params.session);
    if (plan) {
      this.sets(plan);
    }
    this.form.start.dateTime = new Date().toISOString();
    this.setAutoTimeZone();
    this.startStopwatch();
  },
  beforeDestroy() {
    this.stopStopwatch();
  },
  computed: {
    ...mapGetters({
      getPlanByName: 'plans/getPlanByName',
      getExercisesByNames: 'exercises/getExercisesByNames',
      getCalendarId: 'google/getCalendarId'
    }),
    plan() {
      const plan = this.getPlanByName(this.$route.params.session)

      if (plan) {
        const dataExercise = this.getExercisesByNames(plan.exercises);
        const hasilData = dataExercise.map(exercise => {
          const matchingPlan = this.form.exercises.find(plan => plan.exercise_name === exercise.name);
          if (matchingPlan) {
            exercise.sets = matchingPlan.sets;
          }
          return exercise;
        });

        return hasilData;
      } else {
        return [];
      }
    },
    formatRestTime() {
      const minutes = Math.floor(this.restTime / 60000);
      const seconds = Math.floor((this.restTime % 60000) / 1000);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
  },
  methods: {
    cancelSession() {
      this.$router.go(-2)
    },
    sets(plan) {
      console.log(plan)
      plan.exercises.forEach(exercise => this.form.exercises.push({
        exercise_name: exercise,
        sets: [
          {
            reps: 0,
            weight: "",
            rest_time: 0,
          }
        ]
      }))
    },
    tambahSet(exerciseName) {
      const matchingExercise = this.form.exercises.find(exercise => exercise.exercise_name === exerciseName);
      if (matchingExercise) {
        matchingExercise.sets.push({
          reps: 0,
          weight: "",
          rest_time: ""
        });
      }
    },
    deleteSet(exercise, set) {
      const matchingExercise = this.form.exercises.find(item => item.exercise_name === exercise.name);
      if (matchingExercise) {
        const setIndex = matchingExercise.sets.indexOf(set);
        if (setIndex !== -1) {
          matchingExercise.sets.splice(setIndex, 1);
        }
      }
    },
    doneSet(exerciseName, index) {
      console.log(exerciseName, index)
      this.restTime = 60000;
      this.isResting = true;

      this.restTimer = setInterval(() => {
        if (this.restTime <= 0) {
          this.stopRest(exerciseName, index);
        } else {
          const targetExercise = this.form.exercises.find(exercise => exercise.exercise_name === exerciseName);
          if (targetExercise) {
            targetExercise.sets[index].rest_time += 1000;
          }
          this.restTime -= 1000
        }
      }, 1000);
    },
    stopRest() {
      clearInterval(this.restTimer); // Hentikan timer
      this.isResting = false;
      this.restTime = 0; // Setel waktu istirahat ke 0
    },
    generateCalendarDescription(data) {

      function formatRestTime(restTime) {
        const minutes = Math.floor(restTime / 60000);
        const seconds = Math.floor((restTime % 60000) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }

      let description = `**Nama Sesi:** ${data.session_name}\n`;
      description += `**Berat Badan:** ${data.body_weight} kg\n`;
      description += `**Lokasi:** ${data.location}\n`;
      description += `**Waktu Mulai:** ${new Date(data.start.dateTime).toLocaleString('id-ID', { timeZone: data.start.timeZone })}\n`;
      description += `**Waktu Selesai:** ${new Date(data.end.dateTime).toLocaleString('id-ID', { timeZone: data.end.timeZone })}\n\n`;

      // Menambahkan daftar latihan
      description += `**Daftar Latihan:**\n`;

      data.exercises.forEach((exercise, index) => {
        description += `${index + 1}. **${exercise.exercise_name}**\n`;
        exercise.sets.forEach((set, setIndex) => {
          description += `   - Set ${setIndex + 1}: ${set.reps} repetisi, Berat ${set.weight} kg\n`;
          description += `   - Istirahat: ${formatRestTime(set.rest_time)}\n\n`;
        });
      });

      return description;
    },
    async generateEvent() {
      const event = {
        'summary': `PlanEx ${this.form.session_name}`,
        'description': this.generateCalendarDescription(this.form),
        'start': {
          'dateTime' : this.form.start.dateTime,
          'timeZone' : this.form.start.timeZone
        },
        'end': {
          'dateTime' : this.form.end.dateTime,
          'timeZone' : this.form.end.timeZone
        }
      }

      console.log(event)

      console.log(this.getCalendarId)
      let request 
      try {
        request = await gapi.client.calendar.events.insert({
          'calendarId': this.getCalendarId,
          'resource': event
        });
      } catch(err) {
        console.log(err)
      }
      console.log('sukses', request)
    },
    save() {
      this.stopStopwatch();
      this.form.end.dateTime = new Date().toISOString();
      console.log(this.form);
      this.generateEvent()
    },
    startStopwatch() {
      this.stopwatch = setInterval(() => {
        this.form.end.dateTime = new Date().toISOString();
        this.updateStopwatchDisplay();
      }, 1000);
    },
    stopStopwatch() {
      clearInterval(this.stopwatch);
    },
    updateStopwatchDisplay() {
      if (this.form.start.dateTime) {
        const start = new Date(this.form.start.dateTime);
        const end = new Date(this.form.end.dateTime);
        const duration = end - start;
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        this.stopwatchDisplay = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
    },
    setAutoTimeZone() {
      this.form.start.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.form.end.timeZone = this.form.start.timeZone;
    },
    toggleSession(index) {
      if (this.activeSessionIndex === index) {
        this.activeSessionIndex = null;
      } else {
        this.activeSessionIndex = index;
      }
    },
  }
}
</script>  
<style>
/* .session_header-container {
    border: 3px solid black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    color: black;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.session_header-back-btn {
    font-size: 30px;
    background-color: white;
    border: 3px solid black;
    width: 50px;
    aspect-ratio: 1;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.session_header-title {
    color: black;
    font-family: var(--ff-heading);
    font-size: 30px;
    margin-left: 30px;
}

.session_container {
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
background-color: white;
padding: 80px 0 150px 0;
}

.session_form-container {
    width: 90%;
    border: 3px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:stretch;
}

.session_form-head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 30px;
    padding: 20px;
}

.session_form-head > .title {
    font-family: var(--ff-heading);
    font-size: 30px;
}

.session_weight-location > input {
    border: 1px solid black;
}

.session_exercise-container {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;

    align-items: center;
}


.session_exercise {
    border: 3px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    align-self: stretch;
}

.session_exercise-desc {
display: flex;
align-items: center;
}

.session_exercise-img {
border: 1px solid black;  
width: 50px;
aspect-ratio: 1;
margin-right: 10px;
}

.session_rep-weight {
    border: 3px solid black;
    padding: 10px;
    width: 90%;
    display: flex;
    justify-content: space-between;
}

.session_btn {
background-color: inherit;
border: 1px solid black;
border-radius: 0;
}

.delete {
background-color: red;
}

.done {
background-color: greenyellow;
}

.session_add-btn {
    border: 2px solid black;
    border-radius: 0;
    background-color: inherit;
    width: 90%;
    justify-self: stretch;
}

.session_save-btn {
    align-self: flex-end;
    margin: 10px;
    border: 3px solid black;
    background-color: inherit;
    padding: 10px;
    cursor: pointer;
} */
</style>