import { defineStore } from 'pinia';

const pictureStore = defineStore('pictureStore', {
    state: () => ({
      characterSelectPF: {
        loners1: "src/assets/Loners_pf/stalker_loners1.png",
        loners2: "src/assets/Loners_pf/stalker_loners2.png",
        loners3: "src/assets/Loners_pf/stalker_loners3.png"
      },
      gamePictures: {
        gamemaster: "src/assets/images/gameicons/game_master.png",
      }
    }),
    actions: {
    }
});

export default pictureStore;
