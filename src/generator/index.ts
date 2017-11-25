import * as BABYLON from 'babylonjs';
import World from '../world/World';
import GeoLabel from '../world/GeoLabel';
import requestJSON from '../tools/requestJSON';
//import UIDataModel from '../ui/UIDataModel';
//import Brick from '../world/Brick';
import GeoPoint from './GeoPoint';

export default class WorldGenerator {
    constructor(private world: World) {
    }

    async generateWorld() {
        this.world;


        const {status, data} = await requestJSON('/api/location.json', {});//todo send data


        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.world.scene);
        //groundMaterial.backFaceCulling = false;
        groundMaterial.diffuseColor = BABYLON.Color3.FromHexString('#d9ff46');
        //groundMaterial.alpha = 0.7;
        groundMaterial.alpha = 1;
        groundMaterial.freeze();

        for (const tile of data.tiles) {

            //console.log(tile);
            const minPoint = GeoPoint.fromJSON(tile.boundingBox.min);
            const maxPoint = GeoPoint.fromJSON(tile.boundingBox.max);


            var options = {
                width: 200,
                height: 200,
                subdivisions: 256,
                minHeight: -30,
                maxHeight: 10,
                onReady: (groundMesh: BABYLON.GroundMesh) => {

                    //console.log(groundMesh);
                    //console.log(groundMesh.getHeightAtCoordinates(0,0));

                    for (const poi of data.poi) {

                        //console.log(poi);
                        const point = GeoPoint.fromJSON(poi.geometry);
                        const normalizedPoint = point.normalizeInCage(minPoint,maxPoint);


                        const
                            x = (normalizedPoint.longitude - .5) * 200,
                            z = (normalizedPoint.latitude - .5) * 200;

                        console.log(x,z);

                        const geoLabel = new GeoLabel(
                            this.world,
                            poi.name,
                            poi.type,
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


        const bigGroundFlatTile = BABYLON.Mesh.CreateGround("ground", 100000, 100000, 2, this.world.scene);
        bigGroundFlatTile.position = new BABYLON.Vector3(0,-30,0);
        bigGroundFlatTile.material = groundMaterial;

    }
}