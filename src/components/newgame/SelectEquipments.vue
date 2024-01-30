<script setup>
import { computed, ref, onMounted } from 'vue';
import itemStore from '../../stores/itemStore';
import playerStore from '../../stores/playerStore';
import ItemCard from './ItemCard.vue';

const items = itemStore();
const player = playerStore();

onMounted(async () => {
    await items.getEquipments();
});

const startItems = computed(() => {
    return items.equpments;
});

const playerItems = computed(() => {
    return player.playerEquipments;
});

/*
const props = defineProps({
    playerMoney: Number,
    addMoney: Function,
    subMoney: Function
});
*/

const addMoneyToPlayer = (item) => {
    //props.addMoney(item);
    player.addMoney(item);
};

const subMoneyToPlayer = (item) => {
    //props.subMoney(item);
    player.subMoney(item);
};

console.log("items: ", items.equpments);

</script>

<template>
    <div class="EquipmentLists">
        <div class="startItemTitle">
            <p>Select items:</p>
        </div>
        <div class="startItemsList">
            <div class="item" v-for="item in startItems">
                <ItemCard :itemObject="item" :addItemToPlayerEquipment="subMoneyToPlayer" :itemPicture="items.returnSRC(item)" :subItem="addMoneyToPlayer" :addOrSub="true">

                </ItemCard>
            </div>
            
        </div>

        <div class="moveEquipment">
            <p>Your items and your gold: {{ player.playerMoney }}</p>
        </div>

        <div class="playerItemsList">
            <div class="item" v-for="item in playerItems">
                <ItemCard :itemObject="item" :addItemToPlayerEquipment="subMoneyToPlayer" :itemPicture="items.returnSRC(item)" :subItem="addMoneyToPlayer" :addOrSub="false">

                </ItemCard>
            </div>
           
        </div>
    </div>
</template>

<style>

.EquipmentLists {
    display: grid;
    min-width: 92%;
    grid-template-rows: 5% 45% 5% 45%;
    overflow: hidden;
    max-height: 92%;
    align-items: center;
}

.startItemsList {
    grid-row: 2;
    overflow-x: hidden;
    max-height: 100%;
}

.moveEquipment {
    
}

.startItemTitle {
    grid-row: 1;
}

.playerItemsList {
    grid-row: 4;
    overflow-x: hidden;
    max-height: 100%;
}

.item {
    
}
</style>