import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import {GameScene} from "@/Classes/GameScene.js";

export class SpaceGame extends GameScene {
    constructor(canvasId) {
        super(canvasId);

        this.model = null;

        //Set up game
        this.setupGame();
    }

    setupGame() {
        //Create a light for the scene
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.7;

        //Create game objects
        this.createGameObjects();
    }

    createGameObjects() {
        //Import model
        this.model = BABYLON.SceneLoader.ImportMesh(
            '',
            '/assets/models/',
            'earth.glb',
            this.scene,
            meshes => {
                //Adjust scaling of meshes
                meshes.forEach(mesh => {
                    mesh.scaling = new BABYLON.Vector3(2, 2, 2);
                });
            },
            () => {},
            error => {}
        );
    }
}