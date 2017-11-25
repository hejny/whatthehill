import * as BABYLON from 'babylonjs';
import MaterialFactory from "../MaterialFactory";
import WorldGenerator from "../../generator";
import Player from '../Player';
import GeoLabel from '../GeoLabel';
import createScene from './createScene';
import createLights from './createLights';
import createSkyboxMesh from './createSkyboxMesh';

export default class World{
    public engine:BABYLON.Engine;
    public scene:BABYLON.Scene;
    public materialFactory:MaterialFactory;
    public worldGenerator:WorldGenerator;
    public lights:BABYLON.Light[];
    public player:Player;
    public geoLabels:GeoLabel[];
    public groundMesh:BABYLON.AbstractMesh;
    public skyboxMesh:BABYLON.AbstractMesh;

    constructor(
        public canvasElement: HTMLCanvasElement,
    ){
    }

    run(){
        this.geoLabels=[];
        this.engine = new BABYLON.Engine(this.canvasElement, true);

        this.engine.runRenderLoop(()=>{
            this.scene.render();
        });

        window.addEventListener("resize", ()=>{
            this.engine.resize();
        });

        console.log('world',this);

        this.scene = createScene(this.engine);
        this.lights = createLights(this.scene);
        this.materialFactory = new MaterialFactory(this.scene);
        this.player = new Player(this);
        this.skyboxMesh = createSkyboxMesh(this.scene);

        this.worldGenerator = new WorldGenerator(this);
        this.worldGenerator.generateWorld();
    }

    pick(left:number=.5,top:number=.5):BABYLON.PickingInfo {
        return this.scene.pick(this.canvasElement.width * left, this.canvasElement.height * top, (mesh) => {
            return mesh !== this.player.mesh && 'physicsImpostor' in mesh;
        });
    }
}

