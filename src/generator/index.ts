import * as BABYLON from 'babylonjs';
import World from '../world/World';
import requestJSON from '../tools/requestJSON';
//import Brick from '../world/Brick';

export default class WorldGenerator{
    constructor(
        private world:World
    ){}

    async generateWorld(){
        this.world;



        const {status, data} = await requestJSON('/api/location.json',{});//todo send data



        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.world.scene);
        groundMaterial.backFaceCulling = false;
        groundMaterial.diffuseColor = BABYLON.Color3.FromHexString('#ffffff');
        //groundMaterial.alpha = 0.7;
        groundMaterial.alpha = 1;


        for(const tile of data.tiles){


            console.log(tile);
            const groundMesh = BABYLON.Mesh.CreateGroundFromHeightMap("groundTile", tile.url,
                200, 200,
                100,//subdivs
                -30, 10,
                this.world.scene, false);
            groundMesh.material = groundMaterial;


            //console.log(groundMesh);
            //console.log(groundMesh.getHeightAtCoordinates(0,0));


        }

    }
}