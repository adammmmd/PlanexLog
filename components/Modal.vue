<template>
    <div class="modal" @click="closeModal">
        <div class="modal-dialog border-main shadow-main">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="fs-800">{{ titleData }}</h1>
                    <button class="btn fs-600" @click="closeModal">x</button>
                </div>
                <div class="modal-body">
                    <div v-html="bodyData"></div>
                </div>
                <div class="modal-footer" v-if="showFooter">
                    <button class="btn fs-700">tes</button>
                    <button class="btn fs-700">tess</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titleData: String,
        bodyData: String, // Menerima data untuk body
        methods: Object, // Menerima methods dari luar
    },
    data() {
        return {
        showFooter: false,
        };
    },
    methods: {
        closeModal() {
        this.$emit('closeModal'); // Emit event ke parent component
        },
    },
    watch: {
        methods: {
            immediate: true,
            handler(newMethods) {
                // Cek apakah methods telah diberikan dari luar
                this.showFooter = !!newMethods;
            },
        },
    },
};
</script>
