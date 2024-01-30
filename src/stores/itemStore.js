import { defineStore } from 'pinia';

const itemStore = defineStore('itemStore', {
    state: () => ({
      equpments: [],
      playerEqupments: []
    }),
    actions: {
      async getEquipments() {
        const messageIGotBack = await fetch('http://127.0.0.1:5000/getItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const messageContent = await messageIGotBack.json();
        //console.log("messageContent itemekkel elv: ", messageContent);
        messageContent.forEach(element => {
          this.equpments.push(element)
        });
        console.log("feltöltve: ", this.equpments);

      },

      returnSRC(item) {
        console.log("item: ", item);
        return "src/assets/images/equipments/"+ item.Name +".png"
      }
    }
});

export default itemStore;
