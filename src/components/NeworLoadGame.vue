<script setup>
import { computed, ref, onMounted } from 'vue';
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import playerStore from '../stores/playerStore';
import factionStore from '../stores/factionStore';
import FactionView from './newgame/FactionView.vue';
import pictureStore from '../stores/pictureStore';
import PlayerProfilePicture from './newgame/PlayerProfilePicture.vue';
import PlayerName from './newgame/PlayerName.vue';
import SelectEquipments from './newgame/SelectEquipments.vue';
import useAdventureStore from '../stores/adventureStore';
import NewGameName from './newgame/NewGameName.vue';

const props = defineProps({
    setGameToReady: Function
});

const adventureStore = useAdventureStore();

const playerIsSelectingSavedGame = ref(false);

const selectedSavedGame = ref(null);

const isThePlayerCreatingNewGame = ref(false);

const isThePlayerSelectingFaction = ref(false);

const player = playerStore();

const factions = factionStore();

const pictures = pictureStore();

const response = ref();

const steps = ref(0);

const loadGames = async () => {
    const responseFetch = await fetch('http://127.0.0.1:5000/getSaves', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    response.value = await responseFetch.json();
    console.log("response: ", response.value);
    playerIsSelectingSavedGame.value = true;
};


const setSelectedGame = async () => {
    const createdPlayerInfos = await adventureStore.setSelectedGame(selectedSavedGame.value);
    /*
    const responseFetch = await fetch('http://127.0.0.1:5000/setSelectedGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedSavedGame.value)
    });

    const firstMessageContent = await responseFetch.json();

    if (firstMessageContent.status === "success") {
        console.log("sikeres betöltés");
    }
    */

    player.setPlayerInfos(createdPlayerInfos);
    props.setGameToReady();
};


const createNewGame = () => {
    player.playerFaction = factions.factions.Loners;
    console.log("playerFaction: ", player.playerFaction);
    player.playerPortrait = pictures.characterSelectPF.default;
    isThePlayerCreatingNewGame.value = true;
    setPlayerLocation("Clear sky base");
    steps.value++;
};

const setPlayersFaction = (choosenFaction) => {
    player.playerFaction = choosenFaction;
}

const isThisStep = (step) => {
    return steps.value === step;
};

const changeStepsValueByGivenValue = (step) => {
    steps.value = steps.value + step;
};

const setPlayerPortrait = (portrait) => {
    player.playerPortrait = portrait;
};

const setPlayerLocation = (location) => {
    player.playerLocation = location;
};

const isInvalidPlayerName = computed(() => {
    return player.playerName.length <=0 && isThisStep(3);
});

const startTheGame = async () => {
    const newGameInfos = {
        "Name": player.playerName,
        "Faction": player.playerFaction,
        "Portrait": player.playerPortrait,
        "Gold": player.playerMoney,
        "Equipments": player.playerEquipments,
        "GameName": player.playerNewGameName,
        "Location": player.playerLocation,
        "NPC": "None"
    };
    console.log("newGameInfos: ", newGameInfos);
    adventureStore.startGame(newGameInfos);
    props.setGameToReady();
};

const isInvalidNewGameName = computed(() => {
    if (player.playerNewGameName.length <= 0) {
        return true;
    } else {
        return false;
    }
});

const isThePlayerSelectedALoad = computed(() => {
    return selectedSavedGame.value !== null; 
});

const deleteSelectedGame = async () => {
    console.log("selected game in delete: ", selectedSavedGame.value);
    adventureStore.deleteGame(selectedSavedGame.value)
};

</script>
<template>
    <div class="containerWithButtons">
        <div class="containerWithoutButton">
            <div v-if="isThisStep(0)" class="neworload">
                <div class="mainpage">
                    <p>Stalker</p>
                </div>
                <Button type="button" label="New game" severity="success" @click="createNewGame"/>
                <Button v-if="!playerIsSelectingSavedGame" label="Load game" severity="success" @click="loadGames"/>
                <Button v-else label="Load selected game" @click="setSelectedGame"></Button>
                <Button v-if="isThePlayerSelectedALoad" @click="deleteSelectedGame" label="Delete selected game" severity="warning"></Button>
                <p v-if="playerIsSelectingSavedGame">Selected game: {{ selectedSavedGame }}</p>
                <Listbox v-if="playerIsSelectingSavedGame" class="listboxClass" v-model="selectedSavedGame" :options="response" ></Listbox>
            </div>

            <FactionView v-if="isThisStep(1)" class="containerWithButtonsFirstRow"  :faction-list="factions.factions" :player-faction="player.playerFaction" :set-players-faction-prop="setPlayersFaction"></FactionView>

            <PlayerProfilePicture v-if="isThisStep(2)" class="containerWithButtonsFirstRow"  :player-portrait="player.playerPortrait" :all-portraits="pictures.characterSelectPF" :set-player-portrait-prop="setPlayerPortrait"></PlayerProfilePicture>

            <PlayerName v-if="isThisStep(3)" />

            <SelectEquipments v-if="isThisStep(4)"></SelectEquipments>

            <NewGameName v-if="isThisStep(5)"></NewGameName>
        </div>
        <div v-if="steps !== 0" class="containerButtons">
            <Button type="button" label="Back" class="backButton" @click="changeStepsValueByGivenValue(-1)"></Button>
            <Button v-if="!isThisStep(5)" type="button" label="Next" class="nextButton" :disabled="isInvalidPlayerName" :class="isInvalidPlayerName" @click="changeStepsValueByGivenValue(1)"></Button>
            <Button v-if="isThisStep(5)" type="button" label="Start game" class="nextButton" :disabled="isInvalidNewGameName" :class="isInvalidPlayerName" @click="startTheGame()"></Button>
        </div>
    </div>
</template>

<style>
.containerWithButtons {
    display: grid;
    grid-template-rows: 90vh 8vh;
    
}

.containerButtons {
    grid-row: 2;
    display: grid;
    grid-template-columns: 50% 50%;
    align-content: center;
    padding: 5px;
}

/*
.backButton {
    position: fixed;
    bottom: 0;
    left: 0;
    margin-left: 10px;
    margin-bottom: 10px;
    min-width: 2em !important;
    padding-left: 30px;
    padding-right: 30px;
}

.nextButton {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 10px;
    margin-bottom: 10px;
    min-width: 2em !important;
    padding-left: 30px;
    padding-right: 30px;
}
*/

.containerWithoutButton {
    grid-row: 1;
    min-height: 98vh;
}

.containerWithButtonsFirstRow {
    grid-row: 1;
    max-height: 100%;
}
.neworload {
    display: grid;
    width: 100%;
    justify-content: center;
    justify-items: center;
    grid-gap: 2em;
    grid-template-rows: 10% 10% 10% 10% 60%;
}

.listboxClass {
    grid-row: 5;
}

.newGame {
    display: grid;
    min-width: 100%;
    min-height: 99vh;
    grid-template-rows: 35% 10% 40%;
}

.FactionScroller {
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    max-height: 100%;
    grid-row: 2;
}

.FactionChooser {
    margin: 10px;
}

.FactionPatches {
    img {
        min-width: 30px;
    }
}
</style>