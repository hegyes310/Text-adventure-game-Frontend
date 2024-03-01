import { defineStore } from 'pinia';

const pictureStore = defineStore('pictureStore', {
    state: () => ({
      characterSelectPF: {
        loners1: "src/assets/Loners_pf/stalker_loners1.png",
        loners2: "src/assets/Loners_pf/stalker_loners2.png",
        loners3: "src/assets/Loners_pf/stalker_loners3.png",
        freedom1: "src/assets/Freedom_pf/stalker_freedom1.png",
        freedom2: "src/assets/Freedom_pf/stalker_freedom2.png",
        freedom3: "src/assets/Freedom_pf/stalker_freedom3.png",
        freedom4: "src/assets/Freedom_pf/stalker_freedom4.png",
        duty1: "src/assets/Duty_pf/stalker_duty1.png",
        duty2: "src/assets/Duty_pf/stalker_duty2.jpg",
        duty3: "src/assets/Duty_pf/stalker_duty3.png",
        bandits1: "src/assets/Bandits_pf/stalker_bandits1.png",
        bandits2: "src/assets/Bandits_pf/stalker_bandits2.png",
        bandits3: "src/assets/Bandits_pf/stalker_bandits3.jpg",
        default: "src/assets/Unknown/unknown.png",
      },
      gamePictures: {
        gamemaster: "src/assets/images/gameicons/game_master.png",
      }
    }),
    actions: {
    }
});

export default pictureStore;
