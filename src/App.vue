<script setup>
import useAdventureStore from './stores/adventureStore';
import ScrollPanel from 'primevue/scrollpanel';
import { computed } from 'vue';
import TextArea from 'primevue/textarea';
import Fieldset from 'primevue/fieldset';
import Shop from './components/Shop.vue';
//import Fight from './components/Fight.vue';
//import CharacterMaker from './components/CharacterMaker.vue';
import NeworLoadGame from './components/NeworLoadGame.vue';

const adventureStore = useAdventureStore();

function apicall() {
  adventureStore.sendPlayerMessage();
}

const getMessages = computed(() => {
  return adventureStore.openAIAnswers;
})

function startGameB() {
  adventureStore.startGame();
}

async function agentTest() {
  await adventureStore.agentes("asd");
}

const getFirstMessageFromGameMaster = computed(() => {
  return adventureStore.firstMessageFromGameMaster;
});

function proba() {
  adventureStore.proba();
}

const add_message_aiandplayer = () => {
  const ai = "heble heble";
  const playerinput = adventureStore.playerMessage;
  let objectToStore = {
        input: playerinput,
        respone: ai
      }
      console.log(adventureStore.playerMessage);
  adventureStore.openAIAnswers.push(objectToStore);
  adventureStore.playerMessage = "";
}

const add_message_ai = () => {
  const ai = "heble heble";
  const playerinput = adventureStore.playerMessage;
  let objectToStore = {
        input: "",
        respone: ai
      }
  adventureStore.openAIAnswers.push(objectToStore);
  adventureStore.playerMessage = "";
}

const add_message_player = () => {
  const ai = "heble heble";
  const playerinput = adventureStore.playerMessage;
  let objectToStore = {
        input: playerinput,
        respone: ""
      }
  adventureStore.openAIAnswers.push(objectToStore);
  adventureStore.playerMessage = "";
}

const isShopActive = computed(() => {
  return adventureStore.shopComponent;
})

/*
<span v-if="answer.respone"><span>Gamemaster: </span>{{ answer.respone }}</span> <br>
        <span v-if="answer.input">You:{{ answer.input }}</span>
*/

/*
<button @click="add_message_aiandplayer()">aiandplayer</button>
    <button @click="add_message_ai()">ai</button>
    <button @click="add_message_player()">player</button>
    <button @click="startGameB()">Start</button>
*/

const returnIsFightActive = computed(() => {
  return adventureStore.fightComponent;
});
const s = false;
</script>

<template>
  <div class="container">
    <NeworLoadGame>

    </NeworLoadGame>
  </div>
  <!--
  <div v-if="s" class="mainGrid">
    <div class="playerInfos">
      <p>Szia</p>
    </div>

    <div class="chat">
      <div class="container">
        <ScrollPanel class="panel">
          <p v-for="answer in getMessages">
            <Fieldset v-if="answer.input" legend="You">
              {{ answer.input }}
            </Fieldset>
            <Fieldset v-if="answer.respone" legend="Game master">
              {{ answer.respone }}
            </Fieldset>
          </p>
        </ScrollPanel>
        <TextArea class="inputText" rows="5" cols="30"  v-model="adventureStore.playerMessage"></Textarea>
    
        <button class="submitButton" @click="adventureStore.probaaaaaaa()">Submit</button>
    <Shop ></Shop>
    
  </div>
    </div>
  </div>
  
  <CharacterInformation v-else></CharacterInformation>
  
  <CharacterMaker v-else>

  </CharacterMaker>
  <Fight :is-the-player-fighting-prop="returnIsFightActive"></Fight>
  -->
</template>

<style scoped>
.container {
  min-height: 98vh;
  max-height: 98vh;
}
.mainGrid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 40% 60%;
}
hr {
  background-color: black;
  width: 80%;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.inputText {
  margin-top: 1em;
  background-color: white;
  max-height: 4em;
  max-width: 100%;
}

.submitButton {
  grid-area: 4 / 4 / 4 / 4;
}

.panel {
  background-color:aliceblue;
  width: 100%;
}

button {
  margin-top: 1em;
}
</style>
