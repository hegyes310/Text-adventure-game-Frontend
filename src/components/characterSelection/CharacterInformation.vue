<script setup>
import { computed, ref, onMounted } from 'vue';
import SelectFaction from './SelectFaction.vue';
import pictureStore from '../../stores/pictureStore';
import SelectPFPicture from './SelectPFPicture.vue';
import InputText from 'primevue/inputtext';

const pictures = pictureStore();

const factions = {
    Duty: {
        name: "Duty",
        description: "Duty is a paramilitary group, whose members live by a clear military charter. The ideology of the faction is to protect the mankind from the dangers of the Zone, and then completely destroy the Zone. Duty deals with the internal problems of the Zone. They fight mutants, anarchists and bandits as well as explore the Zone itself and its creatures in order to fight more effectively.",
        path: "src/assets/images/patches/duty_patch.png"
    },
    Freedom: {
        name: "Freedom",
        description: "Freedom is an anarchist group consisting mainly of free stalkers. The faction's goal is to preserve the Zone as a free territory and oppose the monopoly of the authorities. According to Loki, the elite of Freedom is made up of former hippies, although the group declares itself to be anarchist. In contrast to the regimented, highly disciplined atmosphere of Duty, the members of Freedom have a much more relaxed, informal attitude. They appear to have a more casual command structure, often referring to each other as 'bro', with a number of members shown making regular recreational use of alcohol and marijuana. In spite of this attitude, Freedom members are able to function very effectively as an organized fighting force when necessary.",
        path: "src/assets/images/patches/freedom_patch.png"
    },
    Bandits: {
        name: "Bandits",
        description: "Bandits are a group of mostly ex-criminals who came in the Zone either to escape from the law, trade weapons, or make money. Bandits are ruthless and generally hostile to anyone not in their gang. They are one of the most poorly-equipped factions of the Zone, usually relying on low-grade weaponry and light armors.",
        path: "src/assets/images/patches/bandits_patch.png"
    },
    Loners: {
        name: "Free stalker",
        description: "Stalkers appear in the Zone because of a variety of motives: money, a thirst for adventure, a desire to explore the unknown, or a desire to start a new life. Some stalkers may eventually join the ranks of Duty or Freedom, but most of the free stalkers do not tolerate any control over themselves and prefer to be on their own, while maintaining neutral relations with all factions. The main source of income for stalkers is collecting equipment, artifacts, parts of mutants, and general looting. Sometimes they do jobs for money working for traders, scientists, representatives of other factions, or other stalkers. However, most stalkers also like to spend time hanging out in bars or meeting around campfires listening to stories, jokes, or playing the guitar.",
        path: "src/assets/images/patches/loners_patch.png"
    },
    Clear_sky: {
        name: "Clear Sky",
        description: "A scientific group, whose members are not fighters but researchers, but they know how to use weapons. Their main goals are to study the Zone and keep its balance. The members of the group view the Zone as 'the most amazing thing humankind has ever encountered'. All of its members try to hide from other stalkers in remote and inaccessible territories. The group's fighters regularly receive assignments from their superiors, take measurements in the Swamps, and research anomalous activity. According to members of the faction, they are both soldiers, scientists, and technicians, as there are enough responsibilities for everyone.",
        path: "src/assets/images/patches/clear_sky_patch.png"
    }
};

const isThePlayerSelectingFaction = ref(false);
const isThePlayerSelectingPFPicture = ref(false);

const selectFraction = () => {
    isThePlayerSelectingFaction.value = true;
};

const exitFactionChooser = () => {
    isThePlayerSelectingFaction.value = false;
};

const selectPFPicture = () => {
    isThePlayerSelectingPFPicture.value = true;
};

const exitPFPicture = () => {
    isThePlayerSelectingPFPicture.value = false;
};

const props = defineProps({
    playerMoney: Number,
    setPlayerFactionProps: Function,
    setPlayerPortraitPorps: Function,
    playerPortrait: String,
    playerFaction: Object,
    setPlayerNameProps: Function,
});

onMounted(() => {
    props.setPlayerFactionProps(factions.Loners);
    props.setPlayerPortraitPorps(pictures.characterSelectPF.default);
});

const setPlayerName = () => {
    props.setPlayerNameProps(playerName.value)
}

const playerName = ref("")

</script>

<template>
    <SelectFaction v-if="isThePlayerSelectingFaction" :faction-list="factions" :exit="exitFactionChooser" :select-choosen="props.setPlayerFactionProps" />
    <SelectPFPicture v-if="isThePlayerSelectingPFPicture" :set-choosen-p-f="props.setPlayerPortraitPorps" :exit="exitPFPicture"></SelectPFPicture>
    <div class="fractionChooser">
        <div class="relations">
            <p>Relations:</p>
            <li class="fractionname" v-for="fraction in factions">
                {{ fraction.name }}
            </li>
        </div>
        <div class="information">
            <p>Brief Description:</p>
            <p>{{ props.playerFaction.description }}</p>
        </div>
        
    </div>
    <div class="characterInformation">
            <div class="playerFaction">
                <img :src="props.playerFaction.path" style="height: 100px; margin-bottom: 15px;"/>
                <button @click="selectFraction">Select faction</button>
            </div>

            <div class="playerPortrait">
                <img :src="props.playerPortrait" style="height: 100px; margin-bottom: 15px;"/>
                <button @click="selectPFPicture">Select portrait</button>
            </div>
            <div class="playerNameInput">
                <p>Name: </p><InputText type="text" placeholder="Your name" v-model="playerName" v-on:update:model-value="setPlayerName"></InputText>
                
            </div>
            <div class="playerMoney">
                <p>Money: {{ props.playerMoney }}</p>
            </div>
        </div>
</template>

<style>
.fractionChooser {
    display: grid;
    background-color: aquamarine;
    grid-template-columns: 30% 70%;
 
    width: 100%;
}

.relations {
    display: flex;
    flex-direction: column;
    margin: 10px;
    grid-row: 1;
    grid-column: 1;
}

.fractionname {
    margin-top: 10px;
}

.information {
    margin: 10px;
}

.characterInformation {
    display: grid;
    grid-template-columns: 30% 30% 40%;
    grid-template-rows: 80% 20%;
    grid-area: 2;
    text-align: center;
    justify-items: center;
}

.playerFaction {
    grid-row: 1;
    grid-column: 1;
    height: 100px;
    width: 100px;
    border: 15px solid burlywood;
    background-color: burlywood;
    margin: 5px;
}

.playerPortrait {
    grid-row: 1;
    grid-column: 2;
    height: 100px;
    width: 100px;
    border: 15px solid burlywood;
    background-color: burlywood;
    margin: 5px;
}

.playerNameInput {
    grid-row: 1;
    grid-column: 3;
    text-align: center;
}

.playerMoney {
    margin-top: 5em;
    grid-row: 1;
    grid-column: 3;
    text-align: center;
}
</style>