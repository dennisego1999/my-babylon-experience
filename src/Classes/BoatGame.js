import * as BABYLON from "babylonjs";
import {GameScene} from "@/Classes/GameScene.js";

export class BoatGame extends GameScene {
    constructor(canvasId) {
        super(canvasId);

        //Set up game
        this.setupGame();
    }

    setupGame() {
        //Create a light for the scene
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.7;

        //Create a basic shape
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
            diameter: 2,
            segments: 32
        }, this.scene);
        sphere.position.y = 1;

        //Create ground
        const ground = BABYLON.MeshBuilder.CreateGround('ground', {
            width: 6,
            height: 6,
        });
    }
}