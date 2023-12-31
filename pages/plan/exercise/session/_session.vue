<template>
  <div>
    <Header :title="stopwatchDisplay" />
    <div class="modal-container" id="restTime" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="restModal" @click="stopRest()">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="fs-4 m-0">Rest Time</h1>
            <button type="button" @click="stopRest()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="fs-1 m-0">{{ formatRestTime }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-white rounded-0" @click="stopRest()" data-bs-dismiss="modal">stop rest</button>
          </div>
        </div>
      </div>
    </div>

    <div class="plan-form__container">
      <form class="plan-form__form-container border-main shadow-main" v-on:submit.prevent="save">
        <div class="plan-form__form-head-session">
          <p class="fs-800">{{ this.$route.params.session }}</p>
          <div class="plan-form__form-head-input-cont">
            <input class="plan-form__input border-main" v-model="form.body_weight" type="number" placeholder="body weight (kg)">
            <input class="plan-form__input border-main" v-model="form.location" type="text" placeholder="location">
          </div>
        </div>
        <div class="plan-form__list-container border-main">
            <div class="plan-form__accordion-item" v-for="(exercise, i) in plan" :key="i">
              <div class="plan-form__accordion-header" @click="toggleAccordion(i)">
                  <div class="plan-form__accordion-title">
                    <img class="plan-form__label-img" :src="exercise.gifUrl" :alt="exercise.name">
                    <p class="fs-700" style="cursor: pointer;" @click="openModal(exercise.instructions)">{{ exercise.name }}</p>
                  </div>
                  <div class="plan-form__accordion-arrow">
                    <img src="@/assets/svg/dash-circle.svg" v-if="activeAccordion === i">
                    <img src="@/assets/svg/plus-circle.svg" v-else>
                  </div>
              </div>
              <div class="plan-form__accordion-collapse" :class="{ 'collapse-open': activeAccordion === i }">
                <div class="plan-form__accordion-body" >
                  <div class="plan-form__accordion-body-item" v-for="(set, index) in exercise.sets" :key="index">
                    <div>
                      <input v-model="set.reps" type="number" name="reps" :id="`${exercise.name}repetition${index}`" placeholder="Rep" required>
                      <input v-model="set.weight" type="number" name="weight" :id="`${exercise.name}weight${index}`" placeholder="Weight" required>
                    </div>
                    <div>
                      <button type="button" @click="deleteSet(exercise, set)">&#10005;</button>
                      <button v-if="!set.rest_time" type="button" @click="doneSet(exercise.name, index)" data-bs-toggle="modal" data-bs-target="#restTime">&#10004;</button>
                    </div>
                  </div>
                  <button class="btn btn-outline-dark btn-white rounded-0" style="align-self: end;" type="button" @click="tambahSet(exercise.name)">add</button>          
                </div>
              </div>
            </div>
          </div>
        <button type="submit" class="btn btn-outline-dark btn-white rounded-0" style="align-self: end;">save session</button>
      </form>
    </div>
    <Modal v-if="showModal" titleData="Instructions" :bodyData="modalDescription"  @closeModal="showModal = false" />
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import Header from '@/components/Header.vue'
import Modal from "@/components/Modal.vue"

export default {
  layout: 'plain',
  components: {
    Header, Modal
  },
  data() {
    return{
      activeAccordion: null,
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
    openModal(descriptionArray) {
      const descriptionHtml = `<ol>${descriptionArray.map(item => `<li class="fs-600">${item}</li>`).join('')}</ol>`;
      this.modalDescription = descriptionHtml; // Mengatur data untuk modal
      this.showModal = true; // Mengirim data HTML ke parent component
    },
    toggleAccordion(index) {
      if (this.activeAccordion === index) {
        this.activeAccordion = null;
      } else {
        this.activeAccordion = index;
      }
    },
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
          this.stopRest();
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
      this.$refs.restModal.style.display = 'none';
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
      this.$router.push('/plan')
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