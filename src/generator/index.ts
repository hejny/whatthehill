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


        const tile = data.tiles[0];
        console.log(tile);

        this.world.player.mesh.position.y += 100;


        const groundMesh = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/public/api/tiles/worldHeightMap.jpg", 200, 200, 250, 0, 10, this.world.scene, false);
        return groundMesh;









    }
}