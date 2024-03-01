<script setup>
import useAdventureStore from './stores/adventureStore';
import ScrollPanel from 'primevue/scrollpanel';
import { computed, ref } from 'vue';
import TextArea from 'primevue/textarea';
import Fieldset from 'primevue/fieldset';
import Shop from './components/Shop.vue';
import NeworLoadGame from './components/NeworLoadGame.vue';
import ChatView from './components/ChatView.vue';

const adventureStore = useAdventureStore();


const isShopActive = computed(() => {
  return adventureStore.shopComponent;
});

const returnIsFightActive = computed(() => {
  return adventureStore.fightComponent;
});

const thePlayerIsLoadingOrCreateNewGame = ref(true);

const setGameToReady = () => {
  thePlayerIsLoadingOrCreateNewGame.value = false;
};
</script>

<template>
  <div class="container">
    <NeworLoadGame v-if="thePlayerIsLoadingOrCreateNewGame" :set-game-to-ready="setGameToReady"/>
    <ChatView v-if="!thePlayerIsLoadingOrCreateNewGame" />
    <Shop ></Shop>
    <Fight :is-the-player-fighting-prop="returnIsFightActive"></Fight>
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
