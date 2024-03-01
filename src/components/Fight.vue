<script setup>
import { ref, computed } from 'vue';
import svgStore from '../stores/svgStore';

const props = defineProps({
    isThePlayerFightingProp: Boolean
});

const isThePlayerFighting = computed(() => {
    return props.isThePlayerFightingProp;
});

const svg = svgStore();

const definedSize = {
    width: window.innerWidth - 800,
    height: window.innerHeight - 600
}

const configKonva = {
    width: definedSize.width,
    height: definedSize.height
};

const configCircle = {
    x: 120,
    y: 100,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4
}

function szia(enemy) { 
    console.log("találat");
    let clickedEnemyHealt = enemyHealth.value.find(x => x.id === enemy.id)
    enemyHealth.value = enemyHealth.value.filter(x => x.id !== clickedEnemyHealt.id);
    clickedEnemyHealt.points[2] = clickedEnemyHealt.points[2] - 30;

    if (clickedEnemyHealt.points[2] <= (clickedEnemyHealt.points[0])) {
        console.log("meghallt");
        enemyStalker.value = enemyStalker.value.filter(x => x.id !== clickedEnemyHealt.id);
        if (enemyHealth.value.length <= 0) {
            message.value = "SIGMA!!!"
            toggleTimer();
        }
        
    }
    else {
        enemyHealth.value.push(clickedEnemyHealt);
    }

    renderAgain();
    console.log("enemyHealth: ", enemyHealth.value);
}

const enemyStalker = ref([]);
const enemyHealth = ref([]);
const playerHealth = ref([]);

const enemyMaker = (howManyOfThem) => {
    for (let index = 0; index < howManyOfThem; index++) {
        let tempCircle = {
            x: returnRandomNumberBasedOnWindowSize(definedSize.width-50),
            y: returnRandomNumberBasedOnWindowSize(definedSize.height-50),
            scaleX: 4,
            scaleY: 4,
            fill: "black",
            stroke: "black",
            strokeWidth: 4,
            id: index,
            data: svg.stalkerIcon

        };
        let tempHealth = {
            points: getCircleOrigo(tempCircle),
            stroke: 'green',
            strokeWidth: 15,
            lineCap: 'round',
            lineJoin: 'round',
            id: index
        }
        console.log("circle: ", getCircleOrigo(tempCircle));
        console.log("circle: ", getCircleOrigo(tempCircle));
        enemyStalker.value.push(tempCircle);
        enemyHealth.value.push(tempHealth);
        
    }
    playerMaker();
    console.log("playerHealth: ", playerHealth.value);
}

const playerMaker = () => {
    let tempPlayer = {
        points: [50, definedSize.height-150, definedSize.width -50, definedSize.height - 150],
        stroke: 'green',
        strokeWidth: 20,
        lineCap: 'round',
        lineJoin: 'round',
        id: 6940
    };
    playerHealth.value.push(tempPlayer);
}

const getCircleOrigo = (tempCircle) => {
    return [tempCircle.x + 20, tempCircle.y, tempCircle.x + 105, tempCircle.y]
}

const returnRandomNumberBasedOnWindowSize = (maxSize) => {
    return Math.floor(Math.random() * maxSize) + 1;
}



const rerender = ref(0);
function renderAgain() {
    rerender.value = rerender.value + 1;
    console.log("megnövelte");
};

function toggleTimer() {
      if (isRunning.value) {
        clearInterval(interval.value);
        console.log('timer stops');
      } else {
        interval.value = setInterval(incrementTime, 1000);
      }
      isRunning.value = !isRunning.value
};

function incrementTime() {
      time.value = parseInt(time.value) + 1;
      if (playerHealth.value[0].points[2] - 100 <= playerHealth.value[0].points[0] ) {
        playerHealth.value[0].points[2] = playerHealth.value[0].points[0]
        message.value = "Xou died"
        renderAgain();
        toggleTimer();
        
      } else {
        playerHealth.value[0].points[2] = playerHealth.value[0].points[2] - 100;
      }

      for (let index = 0; index < enemyStalker.value.length; index++) {
        enemyStalker.value[index].x = returnRandomNumberBasedOnWindowSize(definedSize.width-50),
        enemyStalker.value[index].y = returnRandomNumberBasedOnWindowSize(definedSize.height-50)
        enemyHealth.value[index].points = getCircleOrigo(enemyStalker.value[index]);
        //getCircleOrigo
        
      }
      renderAgain();
      
};

const time = ref(0);
const isRunning = ref(false);
const interval = ref(null);
const message = ref("");

const startGame = () => {
    enemyMaker(4);
    toggleTimer();
    time.value = 0;
}
</script>

<template>
    <div v-if="isThePlayerFighting" class="popup">
        <div class="popup-inner">
            <button @click="toggleTimer()">Stop game</button>
                <button @click="startGame">Start game</button>
                <p class="timer">{{ time }}</p>
                <p v-if="message.length !== 0" class="end">{{ message }}</p>
                <div :key="rerender">
                    <v-stage :config="configKonva">
                        <v-layer>
                            <v-path 
                                v-for="stalker in enemyStalker"
                                :key="stalker.id"
                                :config="stalker"
                                @click="szia(stalker)">
                            </v-path>

                            <v-line v-for="line in enemyHealth"
                                :key="line.id"
                                :config="line">
                            </v-line>
                            
                            <v-line v-for="player in playerHealth"
                                :key="player.key"
                                :config="player">
                            </v-line>
                        </v-layer>
                </v-stage>
                </div>
        </div>
    </div>
    
</template>

<style>
.timer {
    text-align: center;
    margin-top: 2em;
    font-size: 4em;
}

.end {
    text-align: center;
    margin-top: 0em;
    font-size: 6em;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}
.popup-inner {
        background: #fff;
        padding: 32px;
}
</style>