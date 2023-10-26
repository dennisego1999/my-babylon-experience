import "babylonjs-loaders";
import * as BABYLON from "babylonjs";
import {Scene} from "@/Classes/Scene.js";
import {gsap} from "gsap";

export class SpaceGame extends Scene {
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
        //Create skybox
        const skybox = BABYLON.MeshBuilder.CreateBox('skybox', {size: 1000}, this.scene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/assets/images/skybox/skybox', this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        //Import model
        this.model = BABYLON.SceneLoader.ImportMesh(
            '',
            '/assets/models/',
            'earth.glb',
            this.scene,
            meshes => {
                //Set default scaling
                meshes.forEach(mesh => mesh.scaling = new BABYLON.Vector3(0, 0, 0));

                const timeline = gsap.timeline();
                timeline
                    .to('#loader > div', {
                        scale: 0,
                        duration: 1,
                        ease: 'expo.inOut'
                    }, '0')
                    .to('#loader', {
                        yPercent: -100,
                        duration: 1,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            //Remove loader from dom
                            document.getElementById('loader').remove();

                            //Tween scaling of meshes
                            meshes.forEach(mesh => {
                                gsap.to(mesh.scaling, {
                                    x: 1.8,
                                    y: 1.8,
                                    z: 1.8,
                                    duration: 1,
                                    ease: 'power2.inOut'
                                });
                            });
                        }
                    }, '0.7');
            },
            () => {},
            error => {}
        );
    }
}