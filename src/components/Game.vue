<script setup>
import useAdventureStore from '../stores/adventureStore';
import ScrollPanel from 'primevue/scrollpanel';
import { computed } from 'vue';
const adventureStore = useAdventureStore();

function apicall() {
  adventureStore.sendPlayerMessage();
}

const getMessages = computed(() => {
  return adventureStore.openAIAnswers;
})

let objectToStore = {
        input: "kerdes egy",
        respone: "valasz egy"
}

adventureStore.openAIAnswers.push(objectToStore);

objectToStore = {
        input: "kerdes ketto",
        respone: "valasz ketto"
}
adventureStore.openAIAnswers.push(objectToStore);
</script>

<template>
  <div class="container">
    <ScrollPanel class="panel">
      <p v-for="answer in getMessages">
        {{ answer.input }} <br>
        {{ answer.respone }}
      </p>
    </ScrollPanel>
    <input class="inputText" v-model="adventureStore.playerMessage">
    <button class="submitButton" @click="apicall()">Submit</button>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(6, 5em);
  grid-template-rows: repeat(4, 5em);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
.inputText {
  background-color: white;
  height: minmax(1em , 3em);
  grid-area: 4 / 1 / 4 / 4;
}

.submitButton {
  grid-area: 4 / 4 / 4 / 4;
}

.panel {
  grid-area: 1 / 1 / 4 / 4;
  background-color:aliceblue;
}
</style>
