<script setup>
import { computed, ref, onMounted } from 'vue';
import itemStore from '../../stores/itemStore';
import Card from 'primevue/card';
import playerStore from '../../stores/playerStore';

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

const props = defineProps({
    playerMoney: Number,
    addMoney: Function,
    subMoney: Function
});

const addMoneyToPlayer = (item) => {
    props.addMoney(item);
};

const subMoneyToPlayer = (item) => {
    props.subMoney(item);
};
</script>

<template>
    <div class="invertoryAndItems">
        <div class="inventory">
            <Card v-for="item in playerItems" style=" max-height: 100%;">
                <template #header>
                    <img :src="items.returnSRC(item)" />
                </template>

                <template #title>
                    {{ item.Name }}
                </template>
                <template #content>
                    <p class="m-0">
                        {{ item.Description }}
                    </p>
                </template>
                <template #footer>
                    <button @click="addMoneyToPlayer(item)">Remove</button>
                </template>
            </Card>
        </div>
        <div class="items">
            <Card v-for="item in startItems" style=" max-height: 100%;">
                <template #header>
                    <img :src="items.returnSRC(item)" />
                </template>

                <template #title>
                    {{ item.Name }}
                </template>
                <template #content>
                    <p class="m-0">
                        {{ item.Description }}
                    </p>
                    <p>Cost: {{ item.Cost }}</p>
                </template>
                <template #footer>
                    <button @click="subMoneyToPlayer(item)">Add</button>
                </template>
            </Card>
        </div>
    </div>
</template>

<style>
.invertoryAndItems {
    display: grid;
    grid-template-columns: 40% 40%;
    width: 100%;
    height: 100%;
}

.items {
    display: flex;
    width: 100%;
    overflow-y: scroll;
    height: 100%;
    flex-wrap: wrap;
    gap: 2em;
    align-content: flex-start;
}

.inventory {
    display: flex;
    width: 100%;
    overflow-y: scroll;
    height: 100%;
    flex-wrap: wrap;
    gap: 2em;
    align-content: flex-start;
}

img {
    min-width: 100px;
    max-width: 100px;
}
</style>