import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import OpenAI from 'openai';

const useAdventureStore = defineStore('adventureStore', {
  state: () => ({
    playerMessage: "",
    textBoxMessage: "",
    openAIAnswers: [],
    firstMessageFromGameMaster: "",
    shopItems: [],
    shopComponent: false,
    fightComponent: false,
    probaLista: [
      {
          "Name": "CS-3a body armor",
          "Type": "Armor",
          "Description": "This body armor was designed for conducting search operations in areas of low anomalous activity. Its higher quality materials result in greater durability. Includes a container capable of holding one artifact",
          "Cost": 5000,
          "Weight": 4,
          "Statistics": {
              "Burn": 8,
              "Electric_shock": 8,
              "Chemical_burn": 8,
              "Radiation": 8,
              "Telepathy": 0,
              "Rupture": 2.5,
              "Bulletproof_cap": 1.1,
              "Impact": 2.5
          }
      },
      {
          "Name": "Viper 5",
          "Type": "Weapon",
          "Description": "This submachine gun has gained popularity around the world thanks to its reliability, ease of use and accuracy. Over the last few decades the Viper 5 was in service with special armed forces and police units worldwide. Not surprisingly, having flooded the global black markets, it eventually made its way to the Zone.",
          "Cost": 1100,
          "Statistics": {
              "Accuracy": 1.2,
              "Handling": 8.8,
              "Damage": 3.6,
              "Fire_Rate": 8
          }
      }
    ],

  }),
  actions: {
    async main() {
      const data = { "messages" : this.playerMessage }
      const messageIGotBack = await fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const messageContent = await messageIGotBack.json();

      console.log("messageContent.response[0]: ", messageContent[0])
      console.log("messageContent.response: ", messageContent)

      let objectToStore;
      const input = this.playerMessage;
      objectToStore = {
        input: input,
        respone: messageContent["response"],
        speakerName: messageContent["speaker"],
        speakerImage: messageContent["speakerImage"]
      }
      this.openAIAnswers.push(objectToStore);
      this.playerMessage = "";

      /*
      if (messageContent[0]["Situation"] === "fight" || messageContent[0]["Situation"] === "Fight") {
        const input = this.playerMessage;
        const messageResponse = "Player weapon: " + messageContent[1] + ", Enemy weapon: " + messageContent[2];
        objectToStore = {
          input: input,
          respone: messageResponse
        }
        this.fightComponent = true;
      }

      if (messageContent[0]["Situation"] === "trade") {
        this.shopItems = messageContent[0]["Data"];
        this.shopComponent = true;

        const input = this.playerMessage;
        
        let objectToStore = {
          input: input,
          respone: "As you wish."
        };
        
        this.openAIAnswers.push(objectToStore);
        this.playerMessage = "";
      }
      */
      
    },

    async startGame(playerObject) {
      const firstMessage = await fetch('http://127.0.0.1:5000/createNewGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerObject)
      });

      const firstMessageContent = await firstMessage.json();

      console.log("firstMessageContent: ", firstMessageContent);
      const input = this.playerMessage;
        
        let objectToStore = {
          input: input,
          respone: firstMessageContent.response,
          speakerName: firstMessageContent["speaker"],
          speakerImage: firstMessageContent["speakerImage"]
        };
        
        this.openAIAnswers.push(objectToStore);
        this.playerMessage = "";

    },

    async setSelectedGame(selectedSavedGame) {
      const responseFetch = await fetch('http://127.0.0.1:5000/setSelectedGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedSavedGame)
      });
  
      const firstMessageContent = await responseFetch.json();

      console.log("firstMessageContent: ", firstMessageContent);

      return firstMessageContent;
    },

    async deleteGame(gameName) {
      const responseFetch = await fetch('http://127.0.0.1:5000/deleteGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameName)
      });

      const deleteMessageContent = await responseFetch.json();

      console.log("is delete succesfully: ", deleteMessageContent);

      return deleteMessageContent;
    }

  }
})

export default useAdventureStore;