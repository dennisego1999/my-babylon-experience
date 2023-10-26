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
  <div id="loader" class="fixed h-screen w-screen bg-white flex justify-center items-center">
    <div class="relative flex justify-center items-center gap-2 w-fit h-fit">
      <div class="w-4 h-20 m-auto rounded bg-global-blue-100 animate-loader-bar-1"></div>
      <div class="w-4 h-20 m-auto rounded bg-global-blue-100 animate-loader-bar-2"></div>
      <div class="w-4 h-20 m-auto rounded bg-global-blue-100 animate-loader-bar-3"></div>
    </div>
  </div>

  <canvas id="game-canvas" class="h-screen w-screen"></canvas>
</template>