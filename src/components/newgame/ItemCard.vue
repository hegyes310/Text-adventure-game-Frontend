<script setup>
import { computed, ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';

const props = defineProps({
    itemObject: Object,
    addItemToPlayerEquipment: Function,
    itemPicture: String,
    subItem: Function,
    addOrSub: Boolean
});

const item = computed(() => {
    return props.itemObject;
});
</script>

<template>
    <Card class="asd">
        <template #header >
            <img alt="user header" :src="props.itemPicture" class="center"/>
        </template>
        <template #title>{{ item.Name }}</template>
        <template #subtitle>{{ item.Cost }} gold</template>
        <template #content>
            <p class="m-0" v-for="(value, name, index) in item.Statistics">
                {{ name }}: {{ value }}
            </p>
        </template>
        <template #footer>
            <div class="flex gap-3 mt-1">
                <Button v-if="addOrSub" label="Add item"  class="w-full" @click="addItemToPlayerEquipment(props.itemObject)"/>
                <Button v-else label="Remove item" severity="danger" class="w-full" @click="subItem(props.itemObject)"/>
            </div>
        </template>
    </Card>
</template>

<style>
.center {
    margin-top: 10px;
    max-height: 100px;
    max-width: 100px;
    
}

.p-card-header {
    text-align: center;
}

.asd {
    border: 1px solid gray;
    text-align: center;
    max-width: 100%;

}
</style>