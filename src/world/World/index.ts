import * as BABYLON from 'babylonjs';
import WorldGenerator from "../../generator";
import UIDataModel from '../../ui/UIDataModel';
import GeoLabel from '../GeoLabel';
import Player from '../Player';
import createLights from './createLights';
import createScene from './createScene';
import createSkyboxMesh from './createSkyboxMesh';

export default class World{
    public engine:BABYLON.Engine;
    public scene:BABYLON.Scene;
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

    run(uiDataModel: UIDataModel){
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
        this.player = new Player(this);
        this.lights = createLights(this.scene,this.player);
        this.skyboxMesh = createSkyboxMesh(this.scene);

        this.worldGenerator = new WorldGenerator(this);
        this.worldGenerator.generateWorld();


        this.scene.onPointerMove = (event)=>{
            const pickResult = this.scene.pick(event.clientX,event.clientY,(mesh)=>mesh.name==='GeoLabel');
            //console.log(event,pickResult);
            if (pickResult.hit) {
                if(uiDataModel.geoLabelsData.length===0) {
                    //console.log('hoover');

                    const pickedGeoLabel = this.geoLabels.find((geoLabel) => geoLabel.mesh === pickResult.pickedMesh);

                    if (typeof pickedGeoLabel !== 'undefined') {
                        uiDataModel.geoLabelsData = [pickedGeoLabel.getData()]
                    }
                    //this.geoLabels.map((geoLabel)=>geoLabel.getData());

                }
            }else{
                if(uiDataModel.geoLabelsData.length!==0){
                    //console.log('unhoover');
                    uiDataModel.geoLabelsData = [];
                }

            }
        };
        this.scene.onPointerUp = this.scene.onPointerMove;/*(event,pickInfo)=>{

            const pickResult = this.scene.pick(event.clientX,event.clientY,(mesh)=>mesh.name==='ground');
            if (pickResult.hit) {

                const geoLabel = new GeoLabel(
                    this,
                    'aa',
                    'aa',
                    pickResult.pickedPoint
                );
                var animationBox = new BABYLON.Animation("tutoAnimation", "position.x", pickResult.pickedPoint.x, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                this.player.camera.animations.push(animationBox);

            }else{
                this.scene.onPointerMove(event,pickInfo);
            }
        }*/







        /*setInterval(()=>{

            uiDataModel.geoLabelsData = this.geoLabels.map((geoLabel)=>geoLabel.getData());

        },100);*/
    }

    pick(left:number=.5,top:number=.5):BABYLON.PickingInfo {
        return this.scene.pick(this.canvasElement.width * left, this.canvasElement.height * top, (mesh) => {
            return mesh !== this.player.mesh && 'physicsImpostor' in mesh;
        });
    }
}

