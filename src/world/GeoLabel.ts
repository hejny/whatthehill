import * as BABYLON from 'babylonjs';
import World from './World';
import { IGeoLabelData } from '../ui/UIDataModel';


export default class GeoLabel {
    public mesh: BABYLON.AbstractMesh;
    public sprite: BABYLON.Sprite;
    public spriteManager: BABYLON.SpriteManager;

    constructor(private _world: World,
                public title: string,
                public type: string,
                private _position: BABYLON.Vector3,) {
        this.createBabylonMesh();
        this._world.geoLabels.push(this);
    }

    get position(): BABYLON.Vector3 {
        return this._position;
    }

    createBabylonMesh() {

        //this.spriteManager = new BABYLON.SpriteManager("GeoLabelSpriteManager", "/assets/sprites/poi.png", 1, 630, this._world.scene);

        //this.spriteManager.isPickable = true;
        //this.sprite = new BABYLON.Sprite("GeoLabel", this.spriteManager);
        //this.sprite.size = 5;
        //this.sprite.position = this._position.add(new BABYLON.Vector3(0,10,0));
        //this.sprite.isPickable = true;


        let geoLabelMaterial = new BABYLON.StandardMaterial("geoLabelMaterial", this._world.scene);
        geoLabelMaterial.specularTexture = new BABYLON.Texture('/assets/textures/black.jpg', this._world.scene);
        geoLabelMaterial.emissiveColor = BABYLON.Color3.FromHexString('#ff1d4e');
        //geoLabelMaterial.alpha = 0.3;
        //geoLabelMaterial.wireframe = true;
        geoLabelMaterial.freeze();

        console.log(geoLabelMaterial);

        this.mesh = BABYLON.Mesh.CreateSphere("GeoLabel", 16, 3, this._world.scene);
        //this.mesh.isVisible = false;
        this.mesh.material = geoLabelMaterial;
        this.mesh.position = this._position.add(new BABYLON.Vector3(0,5,0));

        //(name: string, height: number, diameterTop: number, diameterBottom: number, tessellation: number, subdivisions: any, scene?: Scene, updatable?: any, sideOrientation?: number)
        const cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 1, 1, 1, 6, 1, this._world.scene, false);
        cylinder.material = geoLabelMaterial;
        cylinder.position = this._position.add(new BABYLON.Vector3(0,2.5,0));
        cylinder.scaling = new BABYLON.Vector3(.3,5,.3);
    }


    getData():IGeoLabelData {

        const position = BABYLON.Vector3.Project(
            this.mesh.position,
            BABYLON.Matrix.Identity(),
            this._world.scene.getTransformMatrix(),
            this._world.player.camera.viewport.toGlobal(
                this._world.canvasElement.width,
                this._world.canvasElement.height,
            ));

        let visible:boolean;

        /*if(
            position.x>0 &&
            position.y>0 &&
            position.x<this._world.canvasElement.width &&
            position.y<this._world.canvasElement.height
        ){

            const pickInfo = this._world.scene.pick(position.x, position.y, (mesh) => true);
            visible = (pickInfo.pickedMesh === this.mesh);
        }else{
            visible = false;
        }*/
        visible = true;


        return {
            title: this.title,
            type: this.type,
            onScreen:{position, visible}
        };
    }


}