<script setup>
import {BoatGame} from "@/Classes/BoatGame.js";
import {nextTick} from "vue";

nextTick(() => {
  //Create game instance
  new BoatGame('game-canvas');
});
</script>

<template>
  <canvas id="game-canvas" class="h-screen w-screen"></canvas>
</template>