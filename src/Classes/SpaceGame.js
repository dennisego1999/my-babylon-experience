import "babylonjs-loaders";
import * as BABYLON from "babylonjs";
import {Scene} from "@/Classes/Scene.js";
import {gsap} from "gsap";

export class SpaceGame extends Scene {
    constructor(canvasId) {
        super(canvasId);

        this.earth = null;
        this.isDragging = false;

        //Set up game
        this.setupGame();

        //Set up game settings
        this.setupGameSettings();
    }

    setupGame() {
        //Create a light for the scene
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.7;

        //Create game objects
        this.createGameObjects();
    }

    setupGameSettings() {
        //Config camera controls
        this.camera.inputs.attached.mouse.detachControl();
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

        //Define asset task names
        const earthTaskName = 'import earth model';

        //Define loading tasks here
        this.assetsManager.addMeshTask(
            earthTaskName,
            '',
            '/assets/models/earth/',
            'scene.gltf'
        );

        //Load all tasks
        this.assetsManager.load();

        //Handle assets success
        this.assetsManager.onFinish = tasks => {
            tasks.forEach(task => {
                if(task.name === earthTaskName) {
                    //Set variable
                    this.earth = new BABYLON.Mesh('earth-parent', this.scene);

                    task.loadedMeshes.forEach(mesh => {
                        //Set scaling of meshes
                        mesh.scaling.x = 0.0005;
                        mesh.scaling.y = 0.0005;
                        mesh.scaling.z = 0.0005;

                        //Set the parent on the mesh
                        mesh.parent = this.earth;
                    });

                    //Set initial scaling
                    this.earth.scaling = new BABYLON.Vector3(0, 0, 0);

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
                                const loader = document.getElementById('loader');
                                if(loader) loader.remove();

                                //Tween scaling of the mesh
                                gsap.to(this.earth.scaling, {
                                    x: 1,
                                    y: 1,
                                    z: 1,
                                    duration: 1,
                                    ease: 'power2.inOut',
                                    onComplete: () => {
                                        //Dispatch event
                                        document.dispatchEvent(new Event('openSpaceModal'));
                                    }
                                });
                            }
                        }, '0.7');
                }
            });
        };
    }

    onPointerDown() {
        //Set boolean
        this.isDragging = true;

        //Update the cursor
        this.updateCursor();
    }

    onPointerUp() {
        //Set boolean
        this.isDragging = false;

        //Update the cursor
        this.updateCursor();
    }

    onPointerMove(event) {
        if (this.isDragging) {
            // Calculate the change in pointer position
            const deltaX = event.movementX || event.mozMovementX || 0;
            const deltaY = event.movementY || event.mozMovementY || 0;

            //Adjust sensitivity based on your preferences
            const sensitivity = 0.005;

            //Update the Earth model's rotation based on pointer movement
            this.earth.rotation.x -= deltaY * sensitivity;
            this.earth.rotation.y -= deltaX * sensitivity;
        }
    }

    updateCursor() {
        if(this.canvas.classList.contains('cursor-grab')) {
            this.canvas.classList.remove('cursor-grab');
            this.canvas.classList.add('cursor-grabbing');

            return;
        }

        this.canvas.classList.remove('cursor-grabbing');
        this.canvas.classList.add('cursor-grab');
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('pointermove', event => this.onPointerMove.call(this, event));
        document.addEventListener('pointerup', () => this.onPointerUp.call(this));
        document.addEventListener('pointerdown', () => this.onPointerDown.call(this));
    }

    removeEventListeners() {
        window.removeEventListener('resize', () => this.resize());
        document.removeEventListener('pointermove', event => this.onPointerMove.call(this, event));
        document.removeEventListener('pointerup', () => this.onPointerUp.call(this));
        document.removeEventListener('pointerdown', () => this.onPointerDown.call(this));
    }
}