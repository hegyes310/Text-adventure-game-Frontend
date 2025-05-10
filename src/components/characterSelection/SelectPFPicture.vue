<script setup>
import pictureProfile from '../../stores/pictureStore';
import { ref } from 'vue';

const props = defineProps({
    setChoosenPF: Function,
    exit: Function
});

const setPF = (picture) => {
    pf.value = picture;
};

const pfPicturesStore = pictureProfile();

const pf = ref(null);
</script>

<template>
    <div class="popup">
        <div class="popup-inner">
            <div class="patches">
                <div class="factionPatch" v-for="picture in pfPicturesStore.characterSelectPF">
                    <img @click="setPF(picture)" :src="picture" style="height: 100px; margin-bottom: 15px;" />
                </div>
                <img src="src/assets/Loners_pf/stalker_loners1.png" style="height: 100px; margin-bottom: 15px;">
            </div>
            <button v-if="pf !== null" @click="setChoosenPF(pf)">Select</button>
            <button @click="exit">Exit</button>
        </div>
    </div>
</template>

<style>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
}
.popup-inner {
    background: #fff;
    padding: 32px;
}
</style>