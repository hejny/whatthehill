import * as BABYLON from 'babylonjs';
import World from './World';
import { IGeoLabelData } from '../ui/UIDataModel';


export default class GeoLabel {
    public mesh: BABYLON.AbstractMesh;

    constructor(private _world: World,
                public title: string,
                private _position: BABYLON.Vector3,) {
        this.createBabylonMesh();
        this._world.geoLabels.push(this);
        this.mesh.position = this._position;
    }

    get position(): BABYLON.Vector3 {
        return this._position;
    }

    createBabylonMesh() {
        this.mesh = BABYLON.Mesh.CreateSphere("GeoLabel", 16, 2, this._world.scene);
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

        if(
            position.x>0 &&
            position.y>0 &&
            position.x<this._world.canvasElement.width &&
            position.y<this._world.canvasElement.height
        ){

            const pickInfo = this._world.scene.pick(position.x, position.y, (mesh) => true);
            visible = (pickInfo.pickedMesh === this.mesh);
        }else{
            visible = false;
        }


        return {
            title: this.title,
            onScreen:{position, visible}
        };
    }


}