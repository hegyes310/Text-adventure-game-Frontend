<script setup>
import { computed, ref, onMounted } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
    playerPortrait: String,
    setPlayerPortraitProp: Function,
    allPortraits: Object
});

const selectPortrait = () => {
    
}

const setPlayerPortrait = (portrait) => {
    console.log("pf")
    props.setPlayerPortraitProp(portrait);
}

</script>



<template>
    <div class="playerProfilePictureGrid">
        
        <div class="imgwithbutton">
            <p class="pfpText">Current profile picture:</p>
            <img :src="props.playerPortrait" style="height: 100px; margin-bottom: 15px;"/>
        </div>
        <div class="portraitsInfo">
            <div class="portraitsPicture" v-for="portrait in props.allPortraits">
                <img :src="portrait" style="height: 100px; margin-bottom: 15px;" @click="setPlayerPortrait(portrait)"/>
            </div>
        </div>
    </div>
</template>

<style>
.pfpText {
    font-size: 20px;
    color: black;
    font-weight: 600;
}
.playerProfilePictureGrid {
    display: grid;
    min-width: 100%;
    min-height: 100%;
    grid-template-rows: 20% 60%;
    grid-gap: 4em;
    img {
        max-height: 100px;
        max-width: 100px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        /*
        margin-bottom: 15px;
        */
    }
}

.portraitsInfo {
    grid-row: 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-height: 100%;
    overflow-y: auto;
}

.imgwithbutton {
    grid-row: 1;
}
</style>