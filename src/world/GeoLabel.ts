import * as BABYLON from 'babylonjs';
import World from './World';


export default class GeoLabel{
    public mesh:BABYLON.AbstractMesh;

    constructor(
        private _world:World,
        public label:string,
        private _position:BABYLON.Vector3,
    ){
        this.createBabylonMesh();
        this._world.geoLabels.push(this);
        this.mesh.position = this._position;
    }
    get position():BABYLON.Vector3{
        return this._position;
    }

    createBabylonMesh(){
        this.mesh = BABYLON.Mesh.CreateSphere("GeoLabel", 16, 2, this._world.scene);
    }
}