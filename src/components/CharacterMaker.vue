<script setup>
import CharacterInformation from './characterSelection/CharacterInformation.vue';
import Inventory from './characterSelection/Inventory.vue';
import { computed, ref, onMounted } from 'vue';
import playerStore from '../stores/playerStore';

const player = playerStore();

const addMoney = (howMany, equipment) => {
    player.addMoney(howMany, equipment);
};

const subtractMoney = (howMany, equipment) => {
    player.subMoney(howMany, equipment);
};

const setPlayerFaction = (faction) => {
    player.playerFaction = faction;
};

const setPlayerPortrait = (portrait) => {
    player.playerPortrait = portrait;
};

const startGame = () => {
    player.startGame();
}

const setPlayerName = (name) => {
    player.playerName = name;
}
</script>

<template>
    <div class="newGameGrid">
        <div class="valami">
            <CharacterInformation :player-money="player.playerMoney" :set-player-faction-props="setPlayerFaction" :set-player-portrait-porps="setPlayerPortrait" :player-faction="player.playerFaction" :player-portrait="player.playerPortrait" :set-player-name-props="setPlayerName"></CharacterInformation>
        </div>
        <div class="valami2">
            <Inventory :player-money="player.playerMoney" :add-money="addMoney" :sub-money="subtractMoney">

            </Inventory>
        </div>
        <div class="startNewGame">
            <button @click="startGame()">Start game</button>
        </div>
    </div>
</template>

<style>
.newGameGrid {
    display: grid;
    grid-template-columns: 40% 40%;
    grid-template-rows: 10% 10%;
    grid-gap: 4em;
}

.valami {
    max-width: 100%;
    margin-right: 1em;
}

.valami2 {
    max-height: 62%;
}
</style>