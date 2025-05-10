import { defineStore } from 'pinia';

const playerStore = defineStore('playerStore', {
    state: () => ({
      playerName: "Mico",
      playerFaction: "",
      playerPortrait: "",
      playerNewGameName: "a",
      playerLocation: ""
    }),
    actions: {

      setPlayerFaction(faction) {
        this.playerFaction = faction;
      },

      setPlayerPortrait(portrait) {
        this.playerPortrait = portrait;
      },

      async startGame() {
        const playerItemsToSend = [];
        
        this.playerEquipments.forEach(item => {
          playerItemsToSend.push(item.Name)
        });
        
        const data = { "Name" : this.playerName, "Faction": this.playerFaction.name, "Portrait": this.playerPortrait.split("/")[3], "Money": this.playerMoney, "Items": this.playerEquipments}
        console.log("player: ", data);
        
        const firstMessage = await fetch('http://127.0.0.1:5000/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
    
        const firstMessageContent = await firstMessage.json();
    
        console.log("player: ", firstMessageContent.response);
        
        
      },

      setPlayerInfos(playerInfoArray) {
        console.log("playerInfoArray: ", playerInfoArray);
        this.playerName = playerInfoArray["Name"];
        this.playerFaction = playerInfoArray["Faction"];
        this.playerPortrait = playerInfoArray["Portrait"];
        this.playerLocation = playerInfoArray["Location"]
      }
      
    }
});

export default playerStore;
