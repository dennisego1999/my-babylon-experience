import * as BABYLON from "babylonjs";

export class GameScene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = null;
        this.scene = null;
        this.camera = null;
        this.light = null;

        //Setup scene
        this.setupScene();

        //Set up render loop
        this.setupRenderLoop();
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
    }

    setupRenderLoop() {
        this.engine.runRenderLoop(() => {
            //Render the scene
            this.scene.render();
        });
    }

    resize() {
        console.log('resizing');
        this.engine.resize();
    }
}