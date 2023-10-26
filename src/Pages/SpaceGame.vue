<script setup>
import {nextTick, onBeforeUnmount, ref} from "vue";
import {SpaceGame} from "@/Classes/SpaceGame.js";
import Modal from "@/Components/Modal.vue";
import CustomButton from "@/Components/CustomButton.vue";

//Define variables
let game;
const isModalOpen = ref(false);

//Define functions
function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

nextTick(() => {
  //Create game instance
  game = new SpaceGame('game-canvas');

  //Add event listener
  game.addEventListeners();
  document.addEventListener('openSpaceModal', openModal);

});

onBeforeUnmount(() => {
  //Remove event listeners
  game.removeEventListeners();
  document.removeEventListener('openSpaceModal', openModal);
});
</script>

<template>
  <div id="loader" class="fixed h-screen w-screen bg-white flex justify-center items-center">
    <div class="relative flex justify-center items-center gap-2 w-fit h-fit">
      <div class="w-4 h-20 m-auto rounded bg-global-blue-100 animate-loader-bar-1"></div>
      <div class="w-4 h-20 m-auto rounded bg-global-blue-100 animate-loader-bar-2"></div>
      <div class="w-4 h-20 m-auto rounded bg-global-blue-100 animate-loader-bar-3"></div>
    </div>
  </div>

  <modal
      :show="isModalOpen"
      @close="closeModal"
  >
    <p class="">Welcome to the experience verse</p>

    <custom-button
      @click="closeModal"
    >
      Close
    </custom-button>
  </modal>

  <canvas id="game-canvas" class="cursor-grab h-screen w-screen"></canvas>
</template>