<template>
    <div class="modal fade" id="restTime" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="restModal" @click="stopRest()" v-show="isResting">
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
</template>
<script>
export default {
    props: {
        formatRestTime: String,
        isResting: Boolean,
    },
    methods: {
    stopRest() {
      this.$emit("stopRest");
    }
  }
}
</script>