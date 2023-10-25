<script setup>
import {Game} from "@/Classes/Game.js";
import {nextTick} from "vue";

nextTick(() => {
  //Create game instance
  new Game('game-canvas');
});
</script>

<template>
  <canvas id="game-canvas" class="h-screen w-screen"></canvas>
</template>