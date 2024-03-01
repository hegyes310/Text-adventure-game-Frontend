<script setup>
import { computed, ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import playerStore from '../../stores/playerStore';

const player = playerStore();

const props = defineProps({
    isInvalidPlayerName: Boolean
});


const isInvalid = computed(() => {
    if (player.playerNewGameName.length <= 0) {
        return "p-invalid"
    } else {
        return "";
    }
});

</script>

<template>
    <div class="playerNameGird">
        <p class="playerNameInfo">Enter your new game name</p>
        <InputText class="inputNameText" :class="isInvalid" type="text" v-model="player.playerNewGameName"></InputText>
    </div>
</template>

<style>
.playerNameGird {
    margin-top: 10%;
    min-width: 100%;
    min-height: 100%;
    display: grid;
    grid-template-rows: 20% 20% 20%;
    align-items: center;
}

.inputNameText {
    grid-row: 2;
    justify-items: end;
    
}

.playerNameInfo {
    grid-row: 1;
}
</style>