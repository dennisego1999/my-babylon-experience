import * as BABYLON from 'babylonjs';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = null;
        this.scene = null;
        this.camera = null;
        this.light = null;

        //Init
        this.init();
    }

    init() {
        //Set up the scene
        this.setupScene();

        //Setup rendering
        this.setupRendering();
    }

    setupScene() {
        //Create engine
        this.engine = new BABYLON.Engine(this.canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true
        });

        //Create scene
        this.scene = new BABYLON.Scene(this.engine);

        //Create camera
        this.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), this.scene);

        //Set target of camera => scene origin
        this.camera.setTarget(BABYLON.Vector3.Zero());

        //Attach camera to canvas
        this.camera.attachControl(this.canvas, true);

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

    setupRendering() {
        this.engine.runRenderLoop(() => {
            //Render the scene
            this.scene.render();
        });
    }
}