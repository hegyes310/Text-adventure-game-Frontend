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
    async probaaaaaaa() {
      console.log("asd");
      const data = { "messages" : this.playerMessage }
      const messageIGotBack = await fetch('http://127.0.0.1:5000/proba', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const messageContent = await messageIGotBack.json();
      console.log("messageContent: ", messageContent);
      console.log("messageContent.response[0]: ", messageIGotBack)


    },
    async main(valamissss) {
      const data = { "messages" : this.playerMessage }
      const messageIGotBack = await fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const messageContent = await messageIGotBack.json();
      console.log("messageContent: ", messageContent);
      console.log("messageContent.response[0]: ", messageContent[0])
      let objectToStore;
      if (messageContent[0] === "fight" || messageContent[0] === "Fight") {
        const input = this.playerMessage;
        const messageResponse = "Player weapon: " + messageContent[1] + ", Enemy weapon: " + messageContent[2];
        objectToStore = {
          input: input,
          respone: messageResponse
        }

      /*
      this.shopItems = messageContent;
      this.shopComponent = true;

      const input = this.playerMessage;
      
      let objectToStore = {
        input: input,
        respone: "As you wish."
      }
      */
      this.fightComponent = true;
      }

      if (messageContent[0] === "trade") {
        console.log("messageContent[0]: ", messageContent[1]);
        this.shopItems = messageContent[1];
        this.shopComponent = true;

        const input = this.playerMessage;
        
        let objectToStore = {
          input: input,
          respone: "As you wish."
        };
        
        this.openAIAnswers.push(objectToStore);
        this.playerMessage = "";
      }

      
      
      this.openAIAnswers.push(objectToStore);
      this.playerMessage = "";
      
    },
    async agentes(valamissss) {
      const data = { "messages" : this.playerMessage }
      const messageIGotBack = await fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const messageContent = await messageIGotBack.json();
      console.log("messageContent: ", messageContent);
      this.shopItems = messageContent;
      this.shopComponent = true;

      const input = this.playerMessage;
      /*
      let objectToStore = {
        input: input,
        respone: "As you wish."
      }
      */

      //this.openAIAnswers.push(objectToStore);
      this.playerMessage = "";
      
    },
    atir(asd){
      this.probaLista.forEach((itemasd) => {
        if (itemasd.Type === "Armor") {
          itemasd.Burn = itemasd.Statistics.Burn;
          itemasd.Electric_shock = itemasd.Statistics.Electric_shock;
          itemasd.Chemical_burn = itemasd.Statistics.Chemical_burn;
          itemasd.Radiation = itemasd.Statistics.Radiation;
          itemasd.Telepathy = itemasd.Statistics.Telepathy;
          itemasd.Rupture = itemasd.Statistics.Rupture;
          itemasd.Bulletproof_cap = itemasd.Statistics.Bulletproof_cap;
          itemasd.Impact = itemasd.Statistics.Impact;
        } else {
          itemasd.Accuracy = itemasd.Statistics.Accuracy;
          itemasd.Handling = itemasd.Statistics.Handling;
          itemasd.Damage = itemasd.Statistics.Damage;
          itemasd.Fire_Rate = itemasd.Statistics.Fire_Rate;
        }
        
      })
      console.log("probalist: ", this.probaLista);
    },
    async proba() {
      const data = { "messages" : this.playerMessage }
      const messageIGotBack = await fetch('http://127.0.0.1:5000/qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const messageContent = await messageIGotBack.json();
      console.log("messageContent: ", messageContent.response);
    },
    async sendPlayerMessage() {
      /*
      const chatCompletion = await this.openAI.chat.completions.create({
        messages: [{ role: 'user', content: this.playerMessage }],
        model: 'gpt-3.5-turbo',
        
      });
      const input = this.playerMessage;
      const respone = chatCompletion.choices[0].message.content ?? "";
      const objectToStore = {
        input: input,
        respone: respone
      }
      this.openAIAnswers.push(objectToStore);
      this.playerMessage = "";
      */
      const data = { "messages" : this.playerMessage }
      const messageIGotBack = await fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const messageContent = await messageIGotBack.json();

      const input = this.playerMessage;

      let objectToStore = {
        input: input,
        respone: messageContent.response
      }
      this.openAIAnswers.push(objectToStore);
      this.playerMessage = "";
  },
  async startGame(playerObject) {
    //const data = { "Name" : playerName, "Faction": playerFaction, "Portrait": palyerPortrait, "Money": playerMoney, "Items": items}
    const firstMessage = await fetch('http://127.0.0.1:5000/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObject)
    });

    const firstMessageContent = await firstMessage.json();

    console.log("player: ", firstMessageContent.response);
  }
}
})

export default useAdventureStore;