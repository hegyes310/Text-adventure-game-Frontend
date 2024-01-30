<script setup>
import useAdventureStore from '../stores/adventureStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import { computed, ref } from 'vue';

const adventureStore = useAdventureStore();

const shop = computed(() => {
    return adventureStore.probaLista;
});


function valam() {
    adventureStore.atir();
    adventureStore.shopComponent = true;
}

</script>

<template>
<DataTable v-if="adventureStore.shopComponent" :value="shop" tableStyle="min-width: 50rem" >
    <Column field="Name" header="Name" class="nameColumn"></Column>
    <Column field="Description" header="Description" class="descriptionColumn"></Column>
    <Column field="Cost" header="Cost" class="costColumn"></Column>
    <Column field="Statistics" header="Statistics"></Column>
</DataTable>
<button v-if="adventureStore.shopComponent" @click="valam()">Buy</button>
</template>

<style>
.nameColumn {
    min-width: 9em !important;
}

.costColumn {
    min-width: 5em !important;
    margin-left: 5em !important;
}

.descriptionColumn {
    min-width: 5em !important;
}
</style>