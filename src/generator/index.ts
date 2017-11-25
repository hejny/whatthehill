import * as BABYLON from 'babylonjs';
import World from '../world/World';
import GeoLabel from '../world/GeoLabel';
import requestJSON from '../tools/requestJSON';
//import Brick from '../world/Brick';

export default class WorldGenerator {
    constructor(private world: World) {
    }

    async generateWorld() {
        this.world;


        const {status, data} = await requestJSON('/api/location.json', {});//todo send data


        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.world.scene);
        groundMaterial.backFaceCulling = false;
        groundMaterial.diffuseColor = BABYLON.Color3.FromHexString('#ffffff');
        //groundMaterial.alpha = 0.7;
        groundMaterial.alpha = 1;
        groundMaterial.freeze();


        for (const tile of data.tiles) {
            console.log(tile);

            var options = {
                width: 200,
                height: 200,
                subdivisions: 200,
                minHeight: -30,
                maxHeight: 10,
                onReady: (groundMesh: BABYLON.GroundMesh) => {

                    //console.log(groundMesh);
                    //console.log(groundMesh.getHeightAtCoordinates(0,0));

                    for (let i = 0; i < 100; i++) {

                        const
                            x = (Math.random() - .5) * 200,
                            z = (Math.random() - .5) * 200;


                        new GeoLabel(
                            this.world,
                            new BABYLON.Vector3(
                                x,
                                groundMesh.getHeightAtCoordinates(x, z),
                                z
                            ));
                    }


                }
            };
            const groundMesh = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", tile.url, options, this.world.scene);
            /*const groundMesh = BABYLON.Mesh.CreateGroundFromHeightMap("groundTile", tile.url,
             200, 200,
             512,//subdivs
             -30, 10,
             this.world.scene, false);*/
            groundMesh.material = groundMaterial;

        }


    }
}