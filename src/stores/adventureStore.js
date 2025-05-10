import { defineStore } from 'pinia'

const useAdventureStore = defineStore('adventureStore', {
  state: () => ({
    playerMessage: "",
    textBoxMessage: "",
    gamemasterMessages: []
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

      let objectToStore;
      const input = this.playerMessage;
      objectToStore = {
        input: input,
        respone: messageContent["response"],
        speakerName: messageContent["speaker"],
        speakerImage: messageContent["speakerImage"]
      }
      this.gamemasterMessages.push(objectToStore);
      this.playerMessage = "";
      
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
      const input = this.playerMessage;
        
        let objectToStore = {
          input: input,
          respone: firstMessageContent.response,
          speakerName: firstMessageContent["speaker"],
          speakerImage: firstMessageContent["speakerImage"]
        };
        
        this.gamemasterMessages.push(objectToStore);
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

      for (let index = 0; index < firstMessageContent["history"].length; index++) {
        if (index % 2 === 1) {
          let objectToStore = {
            input: firstMessageContent["history"][index]["response"],
            speakerName: firstMessageContent["history"][index]["speaker"],
            speakerImage: firstMessageContent["history"][index]["speakerImage"]
          };
          
          this.gamemasterMessages.push(objectToStore);
          this.playerMessage = "";
        } 
        else {
          let objectToStore = {
            respone: firstMessageContent["history"][index]["response"],
            speakerName: firstMessageContent["history"][index]["speaker"],
            speakerImage: firstMessageContent["history"][index]["speakerImage"]
          };

          this.gamemasterMessages.push(objectToStore);
          this.playerMessage = "";
        }
        
      }
      return firstMessageContent["player"];
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
      return deleteMessageContent;
    }

  }
})

export default useAdventureStore;