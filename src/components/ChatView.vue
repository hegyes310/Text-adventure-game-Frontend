<script setup>
import ScrollPanel from 'primevue/scrollpanel';
import { computed } from 'vue';
import Fieldset from 'primevue/fieldset';
import playerStore from '../stores/playerStore';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import useAdventureStore from '../stores/adventureStore';
import Avatar from 'primevue/avatar';

const player = playerStore();
const adventureStore = useAdventureStore();

const addPlayermessage = () => {
    adventureStore.main();
}

const getMessages = computed(() => {
  return adventureStore.gamemasterMessages;
});

const isSubmitButtonDisabled = computed(() => {
    return adventureStore.playerMessage.length === 0;
});
</script>

<template>
    <div class="chatComponent">
        <ScrollPanel class="panel"
        :pt="{
            root: { 
            style: { width: '100%', height: '200px' }
        },
            barY: { class: 'bg-primary', state: true }
            }">
            <p v-for="answer in getMessages">
                <Fieldset v-if="answer.input">
                    <template #legend>
                        <div class="flex align-items-center pl-2">
                            <Avatar :image="player.playerPortrait" shape="circle" />
                            <span class="font-bold">{{player.playerName}}</span>
                        </div>
                    </template>
                    {{ answer.input }}
                </Fieldset>
                <Fieldset v-if="answer.respone" legend="Game master">
                    <template #legend>
                        <div class="flex align-items-center pl-2">
                            <Avatar :image="answer.speakerImage" shape="circle" />
                            <span class="font-bold">{{ answer.speakerName }}</span>
                        </div>
                    </template>
                    {{ answer.respone }}
                </Fieldset>
            </p>
        </ScrollPanel>
        <InputText class="inputNameText" type="text" v-model="adventureStore.playerMessage"></InputText>
        <Button type="button" label="Submit" severity="danger" class="submitButton" :disabled="isSubmitButtonDisabled" @click="addPlayermessage"></Button>
    </div>
    
</template>

<style>
.chatComponent {
    min-height: 97.5vh;
    display: grid;
    grid-template-rows: 70% 20% 10%;
}


.inputNameText {
    margin-bottom: 10px;
}

.panel {
    min-width: 1vh;
    min-height: 95%;
}

.submitButton {
    margin: 10px;
}

.p-scrollpanel-bar > .p-scrollpanel-bar-y > .bg-primary {
    border: 10px solid red;
}
</style>