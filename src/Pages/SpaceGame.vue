<script setup>
import {nextTick, onBeforeUnmount} from "vue";
import {SpaceGame} from "@/Classes/SpaceGame.js";

//Define variables
let game;

nextTick(() => {
  //Create game instance
  game = new SpaceGame('game-canvas');

  //Add event listener
  window.addEventListener('resize', () => game.resize());
});

onBeforeUnmount(() => {
  //Remove event listeners
  window.removeEventListener('resize', () => game.resize());
});
</script>

<template>
  <canvas id="game-canvas" class="h-screen w-screen"></canvas>
</template>