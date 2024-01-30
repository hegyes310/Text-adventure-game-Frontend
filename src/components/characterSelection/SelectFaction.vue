<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    factionList: Object,
    selectChoosen: Function,
    exit: Function,
});

const factions = computed(() => {
    return props.factionList
});

const choosenFaction = ref();

const setChoosen = (faction) => {
    console.log("faction: ", faction)
    choosenFaction.value = faction;
};



</script>

<template>
    <div class="popup">
        <div class="popup-inner">
            <div class="patches">
                <div class="factionPatch" v-for="faction in factions">
                    <img @click="setChoosen(faction)" :src="faction.path" style="height: 100px; margin-bottom: 15px;" />
                </div>
            </div>
            <button @click="selectChoosen(choosenFaction)">Select</button>
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
}
.popup-inner {
    background: #fff;
    padding: 32px;
    
}

.patches {
    display: flex;
}
</style>