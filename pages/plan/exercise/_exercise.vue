<template>
    <div>
        <Header :title="this.$route.params.exercise" />
        <div class="plan-form__container">
            <div class="border-main shadow-main plan-form__form-container">
                <ExerciseList :plan="plan" @openModal="openModal" />
                <div style="align-self: flex-end;">
                    <button class="btn btn-light btn-outline-dark border-2 rounded-0 border-black ml-auto " style="justify-self: end;" @click="deletePlan">Delete</button>
                    <nuxt-link class="btn btn-light btn-outline-dark border-2 rounded-0 border-black ml-auto " style="justify-self: end;" :to="`/plan/exercise/session/${this.$route.params.exercise}`">Start</nuxt-link>
                </div>
            </div>
        </div>
        <Modal v-if="showModal" titleData="Instructions" :bodyData="modalDescription"  @closeModal="showModal = false" />
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import Header from "@/components/Header"
import ExerciseList from "@/components/ExerciseList.vue"
import Modal from '@/components/Modal.vue'

export default {
    layout: 'plain',
    components: {
        Header, ExerciseList, Modal
    },
    data(){
        return {
            modalDescription: [],
            showModal: false,
        }
    },
    computed: {
        ...mapGetters({
            getPlanByName: 'plans/getPlanByName',
            getExercisesByNames: 'exercises/getExercisesByNames'
        }),
        plan() {
            const plan = this.getPlanByName(this.$route.params.exercise)
            if (plan) {
                const data = this.getExercisesByNames(plan.exercises);
                return data;
            } else {
                return [];
            }
        }
    },
    methods: {
        openModal(description) {
            this.modalDescription = description; // Mengatur data untuk modal
            this.showModal = true;
        },
        deletePlan() {
            this.$store.dispatch('plans/deletePlan', this.$route.params.exercise);
            this.$router.go(-1)
        }
    }
}
</script>
<style>
/* .exercise-container {
    background-color: white;
    width: 100%;
    height: 100vh;
    padding: 80px 0 150px 0;
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

.plan-exercises-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    padding: 80px 0 150px 0;
}

.delete-plan_btn {
    background-color: white;
    border: 3px solid black;
    padding: 10px 20px;
    margin-right: 20px;
    cursor: pointer;
}

.start-session_btn {
    color: black;
    text-decoration: none;
    border: 3px solid black;
    padding: 10px 20px;
}

.btn_container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0px 10px 10px 10px;
} */

</style>