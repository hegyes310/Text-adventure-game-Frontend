<script setup>
import SelectFaction from '../characterSelection/SelectFaction.vue';
import { computed, ref, onMounted } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
    factionList: Object,
    playerFaction: Object,
    setPlayersFactionProp: Function
});

const factions = computed(() => {
    return props.factionList
});

const choosenFaction = ref();
const isThePlayerSelectingFaction = ref(false);

const selectChoosen = (faction) => {
    console.log("faction: ", faction)
    choosenFaction.value = faction;
};


const selectFaction = () => {
    isThePlayerSelectingFaction.value = !isThePlayerSelectingFaction.value;
}
console.log("factionList: ", props.factionList);

const setPlayersFaction = (choosenFaction) => {
    props.setPlayersFactionProp(choosenFaction);
    //player.playerFaction = choosenFaction;
}
</script>

<template>
    <div class="factionviewGrid">
        <div class="imgwithbutton">
            <img :src="props.playerFaction.path" @click="selectChoosen"/>
            <p>Current faction: {{ props.playerFaction.name }} </p>
        </div>
        
        <div class="FactionsInfo">
            <div class="FactionScroller">
                <div class="FactionPatches" v-for="faction in props.factionList">
                    <img :src="faction.path" @click="setPlayersFaction(faction)"/>
                </div>
            </div>
            <div class="factionInformation">
                <p>{{ props.playerFaction.description }}</p>
            </div>
        </div>
    </div>
</template>

<style>
.factionviewGrid{
    /*
    display: grid;
    grid-template-rows: 33% 70%;
    */
    min-width: 100%;
    min-height: 100%;
    img {
        max-height: 100px;
        max-width: 100px;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        /*
        margin-bottom: 15px;
        */
    }
}

.imgwithbutton {
    text-align: center;
    grid-row: 1;
}

p {
    text-align: center;
}

.FactionsInfo {
    /*
    display: grid;
    min-width: 100%;
    min-height: 100%;
    grid-template-rows: 20% 80%;
    */
}

.FactionScroller {
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    max-height: 100%;
    grid-row: 1;
}

.FactionChooser {
    margin: 10px;
}

.FactionPatches {
    img {
        min-width: 30px;
    }
}

.factionInformation {
    grid-row: 2;
}
</style>